/*
 * Run with: node scripts/verify-catalogue.cjs
 * Optional route checks: node scripts/verify-catalogue.cjs --base-url http://localhost:3000
 *
 * Uses the project's existing TypeScript compiler. The contact route runs in an
 * isolated module graph with a fake Resend transport; it cannot send email.
 * HTTP checks are GET-only and restricted to a local development server.
 */
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

const root = path.resolve(__dirname, '..');
let assertions = 0;
function verify(condition, message) {
  assert.ok(condition, message);
  assertions += 1;
}

function modules(env = {}) {
  const cache = new Map();
  const messages = [];
  const logs = [];
  const transport = { error: null, throws: false };
  class FakeResend {
    emails = {
      send: async (message) => {
        messages.push(message);
        if (transport.throws) throw new Error('Simulated transport outage');
        return { error: transport.error };
      },
    };
  }
  const mocks = {
    'next/server': { NextResponse: { json: (body, init) => Response.json(body, init) } },
    resend: { Resend: FakeResend },
  };
  function load(relative) {
    const file = path.isAbsolute(relative) ? relative : path.join(root, relative);
    const resolved = path.extname(file) ? file : `${file}.ts`;
    if (cache.has(resolved)) return cache.get(resolved).exports;
    const mod = { exports: {} };
    cache.set(resolved, mod);
    const compiled = ts.transpileModule(fs.readFileSync(resolved, 'utf8'), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
      fileName: resolved,
    }).outputText;
    const localRequire = (specifier) => {
      if (Object.hasOwn(mocks, specifier)) return mocks[specifier];
      if (specifier.startsWith('@/')) return load(path.join(root, 'src', specifier.slice(2)));
      if (specifier.startsWith('.')) return load(path.resolve(path.dirname(resolved), specifier));
      throw new Error(`Unmocked dependency ${specifier}: no external transport is allowed in this verification.`);
    };
    const run = vm.runInNewContext(`(function(require, module, exports) {${compiled}\n})`, {
      process: { env }, URL, URLSearchParams, Request, Response, Headers,
      console: { log: (...args) => logs.push(args), warn: (...args) => logs.push(args), error: (...args) => logs.push(args) },
    }, { filename: resolved });
    run(localRequire, mod, mod.exports);
    return mod.exports;
  }
  return { load, messages, logs, transport };
}

function unique(values, description) {
  verify(values.length === new Set(values).size, `${description} must be unique`);
}

function checkCatalogue(data) {
  const { products, productCategories, getProductCategory, getProduct, productHref, productQuoteHref, filterProducts } = data;
  verify(productCategories.length === 4, 'The catalogue must expose all four requested categories');
  unique(productCategories.map((category) => category.slug), 'Category slugs');
  unique(products.map(productHref), 'Product routes');
  for (const category of productCategories) {
    verify(getProductCategory(category.slug)?.title === category.title, `Category ${category.slug} must be resolvable`);
    verify(products.some((product) => product.category === category.slug), `Category ${category.slug} must offer enquiry paths`);
    verify(Boolean(category.image?.src && category.image?.alt?.startsWith('Illustrative') && fs.existsSync(path.join(root, 'public', category.image.src.replace(/^\//, '')))), `${category.slug} needs a local category image`);
  }
  for (const product of products) {
    verify(Boolean(getProductCategory(product.category)), `${product.slug} needs a valid category`);
    verify(/^[a-z0-9-]+$/.test(product.slug), `${product.slug} needs a route-safe slug`);
    verify(getProduct(product.category, product.slug)?.name === product.name, `${product.slug} must resolve`);
    verify(product.keyFacts.length > 0 && product.specifications.length > 0 && product.useCases.length > 0, `${product.slug} needs facts, specifications and use cases`);
    verify(Boolean(product.image?.src && product.image?.alt?.startsWith('Illustrative image') && fs.existsSync(path.join(root, 'public', product.image.src.replace(/^\//, '')))), `${product.slug} needs a local, accurately labelled illustration`);
    verify(product.specifications.every((row) => row.label?.trim() && row.value?.trim()), `${product.slug} must not contain blank specifications`);
    unique(product.specifications.map((row) => row.label), `${product.slug} specification labels`);
    const quote = new URL(productQuoteHref(product), 'http://localhost');
    verify(quote.pathname === '/contact' && quote.searchParams.get('category') === product.category && quote.searchParams.get('product') === product.slug, `${product.slug} quote link must preserve both identifiers`);
    if (product.kind === 'model') {
      verify(Boolean(product.model && product.sources?.length && product.specificationScope && product.configurationNote), `${product.slug} model claims require sources and configuration scope`);
      verify(product.sources.every((source) => source.url.startsWith('https://') && source.checkedOn), `${product.slug} sources require HTTPS URLs and verification dates`);
    } else {
      verify(product.kind === 'enquiry', `${product.slug} needs an explicit content classification`);
    }
  }
  verify(!getProductCategory('missing') && !getProduct('networking', 'missing'), 'Unknown catalogue identifiers must not resolve');
  verify(filterProducts(products, {}).length === products.length, 'Reset filters must restore all records');
  const dell = filterProducts(products, { search: '  dElL  ' });
  verify(dell.length >= 2 && dell.every((product) => product.brand === 'Dell'), 'Search must ignore case and outer whitespace');
  const rack = filterProducts(products, { category: 'servers', brand: 'HPE', productType: 'Rack servers' });
  verify(rack.length === 1 && rack[0].slug === 'hpe-rack-servers', 'Category, brand and product-type filters must intersect');
  const poe = filterProducts(products, { category: 'networking', feature: 'PoE' });
  verify(poe.length >= 3 && poe.every((product) => product.features.includes('PoE')), 'PoE filter must include switches and access points requiring PoE planning');
  const premium = filterProducts(products, { category: 'surveillance', cameraTier: 'Premium' });
  verify(premium.length >= 2 && premium.every((product) => product.cameraTier === 'Premium'), 'Camera budget filter must limit results to the selected tier');
  const premiumOutdoor = filterProducts(products, { category: 'surveillance', cameraTier: 'Premium', feature: 'Outdoor' });
  verify(premiumOutdoor.some((product) => product.slug === 'premium-ptz-cameras') && premiumOutdoor.some((product) => product.slug === 'premium-fixed-cameras'), 'Outdoor planning must include all applicable premium camera guides');
  verify(filterProducts(products, { category: 'networking', brand: 'Dell' }).length === 0, 'Conflicting filters must produce an empty result');
  verify(filterProducts(products, { search: 'no-such-product-927491' }).length === 0, 'Unmatched search must produce an empty result');
  console.log(`Catalogue: ${products.length} entries, ${productCategories.length} categories, and combined filters passed.`);
}

function checkEnquirySelections(data, enquiry) {
  const { productCategories, products } = data;
  const { parseEnquirySelection, resolveEnquiry } = enquiry;
  for (const invalid of [null, undefined, '', [], {}, { category: 7 }, { category: ['networking'] }, { category: 'x'.repeat(101) }, { category: '<script>' }, { category: 'networking', label: 'Forged title' }]) {
    verify(parseEnquirySelection(invalid) === null, `Invalid enquiry selection must be rejected: ${JSON.stringify(invalid)}`);
  }
  for (const category of productCategories) {
    const context = resolveEnquiry({ category: category.slug });
    verify(context?.label === category.title, `Category ${category.slug} must resolve to its canonical title`);
    verify(context?.service === 'products', 'Category quotes must select hardware enquiries');
    verify(context?.href === category.href, 'Category quotes must link to their category');
  }
  for (const product of products) {
    const context = resolveEnquiry({ category: product.category, product: product.slug });
    verify(context?.label.includes(product.name), `Product ${product.slug} must preserve its canonical name`);
    verify(context?.message.includes(product.name), `Product ${product.slug} must prefill the message`);
    verify(context?.href === data.productHref(product), `Product ${product.slug} must resolve to its detail page`);
    const otherCategory = productCategories.find((category) => category.slug !== product.category);
    verify(resolveEnquiry({ category: otherCategory.slug, product: product.slug }) === null, 'A product cannot resolve within the wrong category');
  }
  for (const invalid of [{}, { product: products[0].slug }, { category: 'unknown' }, { category: products[0].category, product: 'unknown' }, { solution: 'unknown' }, { category: products[0].category, solution: 'unknown' }]) {
    verify(resolveEnquiry(invalid) === null, `Unknown or conflicting enquiry context must be rejected: ${JSON.stringify(invalid)}`);
  }
}

function checkSolutions(data, enquiry) {
  const { solutions, getSolution, solutionContentReview } = data;
  unique(solutions.map((solution) => solution.slug), 'Solution slugs');
  verify(solutions.length === 7, 'All seven requested enterprise offerings must have entries');
  for (const solution of solutions) {
    verify(getSolution(solution.slug)?.name === solution.name, `${solution.slug} must resolve`);
    verify(solution.capabilities.length > 0 && solution.useCases.length > 0 && solution.integration.length > 0 && solution.serviceScope.length > 0, `${solution.slug} needs capabilities, uses, integration requirements and service scope`);
    verify(Boolean(solution.lifecycle.label && solution.lifecycle.detail), `${solution.slug} requires lifecycle qualification`);
    verify(Boolean(solution.image?.src && solution.image?.alt?.startsWith('Illustrative') && fs.existsSync(path.join(root, 'public', solution.image.src.replace(/^\//, '')))), `${solution.slug} needs a local, accurately labelled illustration`);
    verify(solution.sources.length > 0 && solution.sources.every((source) => source.url.startsWith('https://') && /^\d{4}-\d{2}-\d{2}$/.test(source.checkedOn)), `${solution.slug} requires retained source URLs and check dates`);
    const context = enquiry.resolveEnquiry({ solution: solution.slug });
    verify(context?.label === solution.name && context?.service === 'enterprise', `${solution.slug} must prefill a canonical enterprise enquiry`);
    verify(context?.href === `/solutions/${solution.slug}` && context.message.includes(solution.name), `${solution.slug} enquiry must retain page and name`);
  }
  verify(getSolution('avaya-contact-recorder')?.lifecycle.legacy === true, 'ACR must remain clearly classified as a legacy product');
  verify(solutionContentReview.status === 'needs-owner-confirmation', 'The unconfirmed Softix name must remain an editorial follow-up');
  verify(!solutions.some((solution) => /softix/i.test(solution.name)), 'The unconfirmed Softix spelling must not become a published vendor claim');
  verify(!getSolution('missing'), 'Unknown solutions must not resolve');
  console.log(`Solutions: ${solutions.length} offerings, source records, legacy status and naming follow-up passed.`);
}

function checkImageUniqueness(categories, products, solutions) {
  const images = [...categories, ...products, ...solutions].map((entry) => entry.image.src);
  unique(images, 'Category, product and solution image paths');
  const hashes = images.map((src) => crypto.createHash('sha256')
    .update(fs.readFileSync(path.join(root, 'public', src.replace(/^\//, ''))))
    .digest('hex'));
  unique(hashes, 'Category, product and solution image contents');
  console.log(`Images: ${images.length} distinct category, product and solution visuals passed.`);
}

async function checkContact(data, solutions, enquiry) {
  const app = modules({ NODE_ENV: 'test', RESEND_API_KEY: 'verification-only-fake-key' });
  const { POST } = app.load('src/app/api/contact/route.ts');
  let requestId = 0;
  const valid = { name: 'Verification User', company: 'Example Company', email: 'verification@example.test', phone: '', service: 'products', message: 'Please quote the requested equipment.', website: '' };
  const request = (body, options = {}) => new Request('http://localhost/api/contact', {
    method: 'POST', headers: { 'content-type': 'application/json', 'x-forwarded-for': options.ip ?? `198.51.100.${++requestId}` },
    body: options.raw ? body : JSON.stringify(body),
  });
  async function rejected(body, status, options) {
    const before = app.messages.length;
    const response = await POST(request(body, options));
    verify(response.status === status, `Invalid enquiry should return ${status}, received ${response.status}: ${JSON.stringify(body)}`);
    verify(app.messages.length === before, 'Invalid enquiries must never reach the transport');
  }
  await rejected('{broken', 400, { raw: true });
  for (const body of [null, [], 'text', 123, { ...valid, name: 9 }, { ...valid, website: {} }]) await rejected(body, 400);
  for (const patch of [{ name: '' }, { email: 'bad-address' }, { service: 'unknown' }, { message: 'short' }, { message: 'x'.repeat(5001) }, { name: 'x'.repeat(121) }]) await rejected({ ...valid, ...patch }, 422);
  const first = data.products[0];
  const wrongCategory = data.productCategories.find((category) => category.slug !== first.category).slug;
  for (const context of [null, [], {}, { category: 'unknown' }, { category: first.category, product: 'unknown' }, { category: wrongCategory, product: first.slug }, { category: first.category, label: 'Forged price and stock claim' }, { category: first.category, solution: solutions[0].slug }, { solution: 'unknown' }]) {
    await rejected({ ...valid, context }, 422);
  }

  const selections = [
    ...data.productCategories.map((category) => ({ category: category.slug })),
    ...data.products.map((product) => ({ category: product.category, product: product.slug })),
    ...solutions.map((solution) => ({ solution: solution.slug })),
  ];
  for (const selection of selections) {
    const context = enquiry.resolveEnquiry(selection);
    const response = await POST(request({ ...valid, service: context.service, context: selection }));
    verify(response.status === 200, `Valid enquiry must succeed: ${JSON.stringify(selection)}`);
    verify((await response.json()).delivered === true, 'Mock transport acceptance must report delivered');
    const sent = app.messages.at(-1);
    verify(sent.subject.includes(context.label), 'Email subject must retain the canonical offering');
    verify(sent.text.includes(context.label) && sent.text.includes(context.href), 'Text email must retain offering name and source page');
    verify(sent.text.includes(JSON.stringify(context.selection)), 'Text email must retain canonical selection IDs');
    verify(sent.html.includes(context.href), 'HTML email must retain the selected offering page');
  }

  const maintenance = await POST(request({ ...valid, service: 'maintenance', context: selections[data.productCategories.length] }));
  verify(maintenance.status === 200 && app.messages.at(-1).text.includes('Maintenance'), 'Changing the service must preserve the selected equipment context');
  const beforeTrap = app.messages.length;
  const honeypot = await POST(request({ ...valid, website: 'bot.example.test' }));
  verify(honeypot.status === 200 && app.messages.length === beforeTrap, 'Honeypot must silently discard without sending');

  await POST(request({ ...valid, name: '<script>alert(1)</script>', company: 'Example\r\nBcc: injected@example.test', message: '<script>alert(1)</script> & details "quoted"' }));
  const escaped = app.messages.at(-1);
  verify(!/[\r\n]/.test(escaped.subject), 'Email subject must never contain CR/LF');
  verify(!escaped.html.includes('<script>') && escaped.html.includes('&lt;script&gt;'), 'User markup must be escaped in HTML email');
  verify(escaped.text.includes('<script>'), 'Plain text email must preserve the original message');

  app.transport.error = { message: 'Simulated rejection' };
  verify((await POST(request(valid))).status === 502, 'Provider rejection must return a failure');
  app.transport.error = null;
  app.transport.throws = true;
  verify((await POST(request(valid))).status === 502, 'Provider exception must return a failure');
  app.transport.throws = false;
  for (let index = 0; index < 3; index++) verify((await POST(request(valid, { ip: '203.0.113.200' }))).status === 200, 'First three requests should be accepted');
  const limited = await POST(request(valid, { ip: '203.0.113.200' }));
  verify(limited.status === 429 && Number(limited.headers.get('Retry-After')) > 0, 'Fourth request must be rate limited with a retry interval');

  const development = modules({ NODE_ENV: 'development' });
  const devResponse = await development.load('src/app/api/contact/route.ts').POST(request({ ...valid, context: selections[0] }));
  verify(devResponse.status === 200 && (await devResponse.json()).delivered === false, 'Development without credentials must report logging only');
  verify(development.messages.length === 0 && JSON.stringify(development.logs).includes(data.productCategories[0].title), 'Development logs must preserve quote context without contacting email');
  const production = modules({ NODE_ENV: 'production' });
  verify((await production.load('src/app/api/contact/route.ts').POST(request(valid))).status === 500, 'Production without credentials must report delivery failure');
  verify(production.messages.length === 0, 'Missing credentials must not attempt a transport call');
  console.log(`Contact: ${selections.length} catalogue contexts and delivery/validation failure cases passed with mocked email.`);
}

async function checkHttp(base, routes, contexts) {
  const origin = new URL(base);
  verify(['localhost', '127.0.0.1', '[::1]'].includes(origin.hostname), 'HTTP verification only runs against localhost');
  for (const route of routes) {
    const response = await fetch(new URL(route, origin), { redirect: 'manual' });
    verify(response.status === 200, `${route} should return 200; received ${response.status}`);
    const html = await response.text();
    verify((html.match(/<h1(?:\s|>)/g) ?? []).length === 1, `${route} needs exactly one page heading`);
    verify(/<title>[^<]+<\/title>/.test(html), `${route} needs page metadata`);
  }
  const sitemap = await fetch(new URL('/sitemap.xml', origin));
  verify(sitemap.status === 200, 'Sitemap should be available');
  const xml = await sitemap.text();
  for (const route of routes.filter((route) => !route.includes('?'))) {
    verify(xml.includes(`${route}</loc>`), `Sitemap should contain ${route}`);
  }
  for (const route of ['/products/not-a-category', '/products/networking/not-a-product', '/products/servers/business-routers', '/solutions/not-a-solution']) {
    const response = await fetch(new URL(route, origin), { redirect: 'manual' });
    verify(response.status === 404, `${route} should return 404; received ${response.status}`);
  }
  for (const context of contexts) {
    const response = await fetch(new URL(`/contact?${new URLSearchParams(context.selection)}`, origin));
    verify(response.status === 200, 'Quote-prefilled contact page must load');
    const html = await response.text();
    verify(html.includes('Your enquiry') && html.includes(context.href), 'Quote-prefilled contact page must render the selected offering');
    verify(new RegExp(`<option(?=[^>]*value="${context.service}")(?=[^>]*selected)[^>]*>`).test(html), 'Quote-prefilled contact page must select the relevant service');
    verify(/<textarea[^>]*>[\s\S]*?(?:quote for|like to discuss)[\s\S]*?<\/textarea>/.test(html), 'Quote-prefilled contact page must include the requirements template');
  }
  const invalidQuote = await fetch(new URL('/contact?category=unknown&product=unknown', origin));
  verify(!(await invalidQuote.text()).includes('Your enquiry'), 'Unknown quote identifiers must not be presented as a real selection');
  console.log(`HTTP: ${routes.length} pages, sitemap, missing routes and contact prefilling passed.`);
}

async function main() {
  const app = modules();
  const data = app.load('src/lib/products.ts');
  const enterprise = app.load('src/lib/solutions.ts');
  const enquiry = app.load('src/lib/enquiry.ts');
  const { services } = app.load('src/lib/site.ts');
  checkCatalogue(data);
  checkEnquirySelections(data, enquiry);
  checkSolutions(enterprise, enquiry);
  checkImageUniqueness(data.productCategories, data.products, enterprise.solutions);
  await checkContact(data, enterprise.solutions, enquiry);
  const routes = ['/', '/about', '/contact', '/portfolio', '/products', '/solutions', ...services.map((service) => service.href),
    ...data.productCategories.map((category) => category.href), ...data.products.map(data.productHref),
    ...enterprise.solutions.map((solution) => `/solutions/${solution.slug}`)];
  const sitemap = app.load('src/app/sitemap.ts').default();
  const sitemapPaths = sitemap.map((entry) => new URL(entry.url).pathname);
  unique(sitemapPaths, 'Sitemap routes');
  verify(routes.every((route) => sitemapPaths.includes(route)), 'Sitemap must include every category, detail page and existing public route');
  const baseFlag = process.argv.indexOf('--base-url');
  if (baseFlag >= 0) {
    verify(Boolean(process.argv[baseFlag + 1]), '--base-url needs a local origin');
    await checkHttp(process.argv[baseFlag + 1], routes, [
      enquiry.resolveEnquiry({ category: data.productCategories[0].slug }),
      enquiry.resolveEnquiry({ category: data.products[0].category, product: data.products[0].slug }),
      enquiry.resolveEnquiry({ solution: enterprise.solutions[0].slug }),
    ]);
  }
  console.log(`Passed ${assertions} assertions.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
