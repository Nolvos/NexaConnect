# Maintaining products and enterprise solutions

## Product catalogue

Edit `src/lib/products.ts`. The four `productCategories` drive category pages, homepage cards and footer links. Every published entry in `products` receives a page at `/products/{category}/{slug}` and is included in the sitemap. Keep slugs stable because quotations carry these identifiers.

The initial catalogue contains **enquiry offerings**, not an inventory of stocked models. These explain purchasing requirements and use `kind: 'enquiry'`. Specification rows are a procurement checklist; they do not promise hardware capabilities. Dell and HPE identify the requested manufacturer, not a reseller authorisation or availability guarantee. Prices, stock, warranty terms and exact configurations must be confirmed in the quotation.

To add an offering:

1. Choose its existing category and a unique lowercase, hyphenated slug.
2. Supply its name, brand (or `Brand to be selected`), product type, summary, overview, key facts, specification rows, use cases and filterable requirements.
3. Use consistent `productType` and `features` values; these populate filters. Camera tiers must use `Budget-friendly`, `Business` or `Premium`. Do not apply a camera tier to unrelated accessories just to fill a filter.
4. Add the slug to the relevant `photoGroups` set or supply its own approved `image`. Every published enquiry guide should have a local image, with alt text identifying it as illustrative. Do not imply that a generic image depicts an exact model. See `docs/generated-images.md` for the current assets and prompts.
5. Check the page, filters and quote link before publishing.

For an approved, specific model, use `kind: 'model'` and provide `model`, a non-empty `sources` array of official manufacturer URLs with `checkedOn` dates, `specificationScope`, and `configurationNote`. The scope must be `Model-supported options` or `Quoted configuration`. Do not combine mutually exclusive vendor options as if they are installed in a single server. Obtain business approval of the offered inventory and verify every model-specific claim, warranty and compatibility detail. Keep unpublished drafts out of the public `products` array.

## Enterprise solutions

Edit `src/lib/solutions.ts`. Each item receives `/solutions/{slug}` and a sitemap entry. Keep the overview, capabilities, use cases, integration considerations and service scope specific to the offering. Source entries retain official URLs and the date reviewed; recheck lifecycle and compatibility when updating content.

Choose an `icon` and a local `image` that identify the solution topic. Solution cards and detail pages show the image without overlays. Do not replace these with official vendor logo artwork unless Nexa Connect has permission to use it. The imagery does not imply a partnership or certification.

- Avaya CM, System Manager and AES need release and entitlement checks for the customer's environment.
- ACR is officially **Avaya Contact Recorder**. It is presented as legacy, with assessment and migration work rather than an unsupported promise of manufacturer support.
- Verint WFM and WFO describe different capability scopes. Module, deployment, version and licensing dependencies must remain visible.
- **Soft-ex RingMaster** is a verified vendor/product relationship. The requested spelling **“Softix” is still unconfirmed**. Confirm whether this refers to Soft-ex or a separate vendor before adding that name to public copy. Historic interoperability evidence does not establish support for every current release.

These pages describe capabilities, not completed deployments. Existing portfolio examples remain in `src/lib/projects.ts`; the Avaya photograph's attribution is on `/image-credits`. Add a real case study only with accurate deployment facts and approved client information.

## Quote context

Supported links are:

```text
/contact?category=servers
/contact?category=servers&product=dell-rack-servers
/contact?solution=avaya-communication-manager
```

The contact page resolves known identifiers through `src/lib/enquiry.ts` and prefills the enquiry type and editable message. A visible selection panel explains what is attached and lets the visitor remove it. The POST body sends the separate `context` identifiers, so editing the message does not lose the selected offering. The API resolves them again from the catalogue; it rejects unknown, mixed or mismatched identifiers. Canonical selection details appear in the email subject, plain text and HTML. Existing service enquiries remain supported.

Use only one selection per enquiry: a category (optionally a product in it), or a solution. The enquiry type remains editable, for example when requesting maintenance for a selected offering.

## Validation

```bash
npm ci
npm run lint
npm run build
node scripts/verify-catalogue.cjs
```

The verification script uses a fake mail transport and cannot send live email. It checks catalogue integrity, quote context and the contact endpoint's validation and delivery handling. Start the website locally for route checks, then run:

```bash
node scripts/verify-catalogue.cjs --base-url http://localhost:3000
```

Also check search/filter combinations, empty results and reset, keyboard focus, mobile navigation, narrow specification tables, related offerings and the visible quote prefill in a browser. Test contact submissions only in a development process without `RESEND_API_KEY`: this logs the enquiry locally and the UI explicitly reports that no email was sent. Production without the key returns an error.

Before deployment, supply the actual production domain in `src/lib/site.ts` and configure Resend and the verified sender as described in the README. Publishing and live email delivery are separate from local verification.
