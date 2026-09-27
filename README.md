# Nexa Connect

Marketing site for an IT/telecom services company - PBX solutions, maintenance & support, custom software, and web design. Built for B2B lead generation: every page routes toward an enquiry.

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · lucide-react.

---

## Getting started

```bash
npm install
```

```bash
npm run dev
```

Then open http://localhost:3000.

Other scripts: `npm run build`, `npm run start`, `npm run lint`.

## Products and enterprise solutions

Hardware enquiries now cover networking, Dell/HPE servers, cameras and surveillance, and computer components at `/products`. The catalogue offers searchable requirements and detail pages, without inventing stocked models or prices. `/solutions` expands the portfolio with Avaya Enterprise, Verint WFM/WFO and call accounting offerings. Quote links prefill the contact form and preserve the selected offering in the submitted enquiry.

See [the catalogue maintenance guide](docs/catalogue.md) for adding products, verifying model specifications, maintaining solution sources and lifecycle information, and testing quotations. Exact inventory and product photos remain business inputs; the spelling “Softix” needs confirmation before it is published as a vendor name.

Run `node scripts/verify-catalogue.cjs` for functional checks with a fake email transport. With a local server running, add `--base-url http://localhost:3000` to verify public routes and sitemap entries.

---

## ⚠️ Before you launch

Nothing on this site invents a statistic, client name, testimonial, certification or partnership. Content is filled in; these items still need attention:

| What | Where | Notes |
| --- | --- | --- |
| Production domain | `src/lib/site.ts` → `site.url` | Still `nexaconnect.vercel.com`. Feeds `metadataBase`, `sitemap.xml` and `robots.txt`. |
| Contact form key | `.env.local` | See below - without `RESEND_API_KEY`, enquiries are not delivered in production. |
| Portfolio projects | `src/lib/projects.ts` | Sector-described examples across Avaya, Mitel, Zoom Phone and Genesys. Keep them in line with delivered work; client names and logos need written permission. |
| SLA response times | `src/app/services/maintenance/page.tsx` → `tiers` | 8 business hours / 4 hours / 30 minutes. Only publish times you'll commit to contractually. |
| Testimonials | `src/components/TestimonialCard.tsx` | Section removed from the home page. Re-add with approved quotes only, and remove the card's "Placeholder" chip at the same time. |
| Team | `src/app/about/page.tsx` | Section removed. Re-add only with people who have agreed to appear. |
| Partner badges & certifications | `src/app/page.tsx`, `src/app/about/page.tsx` | Platform names only for now. **Do not list a partner tier you can't evidence.** |
| Photos | `src/lib/projects.ts`, `public/portfolio/` | Unsplash stock (no attribution needed) plus one CC BY 4.0 Avaya photo credited at the bottom of `/portfolio` - keep that credit while the photo is used. Swap in photos of your own installs when available. |

### The contact form needs one API key

Enquiries are emailed via [Resend](https://resend.com). The code is done; it only needs a key:

1. Sign up free at resend.com using the inbox that should receive enquiries.
2. Create a key at https://resend.com/api-keys.
3. `cp .env.example .env.local`, paste the key into `RESEND_API_KEY`, restart `npm run dev`.

**Without the key:** in development the enquiry is printed to the terminal and the form states that no email was sent, so the UI is testable. In production the request returns 500 rather than pretending a lead was delivered.

Resend's default sender (`onboarding@resend.dev`) needs no domain but can **only** deliver to the address that owns the Resend account. To mail anywhere else, verify a domain at https://resend.com/domains and set `CONTACT_FROM_EMAIL`.

Anti-spam on `src/app/api/contact/route.ts`:

| Layer | Behaviour |
| --- | --- |
| Rate limit | Per IP: 3 enquiries / 10 min, 10 / 24 h. Over the limit returns `429` with `Retry-After`. |
| Honeypot | Hidden `website` field. Filled = bot; discarded silently, returns a fake success. |
| Field caps | Message capped at 5 000 chars, other fields shorter. |
| Header hygiene | CRLF stripped from subject and reply-to; HTML-escaped body. |

The limiter (`src/lib/rateLimit.ts`) holds counts **in process memory**, so each serverless instance counts separately and restarts reset it. That's enough to keep an inbox clean; swap in Upstash Redis or Vercel KV if you ever need a real distributed limit.

---

## Design system

Tokens live in `tailwind.config.ts`. Use the token names, not raw hex, in components.

### Colour

| Token | Hex | Used for |
| --- | --- | --- |
| `pine` | `#1B4332` | Primary buttons, footer, dark surfaces |
| `pine-deep` | `#0E2A1D` | Hero fields, footer base |
| `pine-soft` | `#285C43` | Primary button hover |
| `signal` | `#3FA679` | The motif, accents and borders on dark surfaces |
| `signal-deep` | `#257357` | Text and icons on light surfaces |
| `signal-soft` | `#5CBE92` | Hover state on dark surfaces |
| `paper` | `#FAFAF8` | Page background |
| `ink` | `#12211B` | Primary text |
| `ink-soft` | `#4A5C53` | Secondary text |
| `mist` | `#EAF1EC` | Alternating sections, card fills |
| `line` | `#D8E3DC` | Hairline borders |

One hue family only. `pine` and `signal` are the same green at different depths - the `deep`/`soft` steps exist so text hits WCAG AA on both light and dark surfaces, **not** as extra accents. Don't introduce a second accent colour.

Contrast was measured on the rendered pages; the tightest pairing is the 11px eyebrow on `mist` at **4.99:1**. `signal-deep` is tuned against `mist` specifically, since it's the darker of the two light surfaces.

### Typography

Loaded via `next/font` in `src/app/layout.tsx`, exposed as CSS variables.

- **Display** - Space Grotesk (`font-display`): headings, nav, buttons. 600-700 weight, tight tracking.
- **Body** - Inter (`font-body`): paragraphs and form fields. 400 weight, 1.65 line height.
- **Utility** - IBM Plex Mono (`font-mono`): phone numbers, stat labels, eyebrows, table row headers. Used sparingly for a "systems" feel.

Hero sizes use `text-display-lg/md/sm`, which are `clamp()`-based and scale without breakpoints.

### Motion

Shared vocabulary in `src/lib/motion.ts`: one easing curve (`EASE_OUT`) and two duration bands - 200-400ms for micro-interactions, 400-700ms for section reveals.

- `<Reveal>` wraps anything that should fade + rise on scroll (`whileInView`, fires once).
- Hover lifts and button scales are plain CSS, so those components stay server components.
- **Reduced motion** is handled twice over: a global `@media (prefers-reduced-motion: reduce)` rule in `globals.css` collapses all animation, and every Framer component additionally checks `useReducedMotion()` so it renders its final state rather than an interrupted one.

---

## The signal motif

The site's one bold idea, in two places:

- **`src/components/SignalMotif.tsx`** - the hero backdrop. A nine-node routing topology where each link carries a pulse of light on a slow loop. The pulse is a single dash chased along each path: `pathLength` + `pathSpacing` sum to exactly `1`, so the dash pattern tiles the path once and animating `pathOffset` 0 → 1 loops with no seam. Geometry and timing are derived from index, never random, so server and client markup match.
- **`src/components/ServiceConnector.tsx`** - a faint echo above the four service cards: one rail, four nodes, one pulse travelling left to right. Node positions are computed from the grid's column width and gutter, so they land on each card's exact centre at any container width (verified at 0px offset). The sweep is a CSS `background-position` animation, so this stays a server component.

Everything else on the site is deliberately quiet around these two.

---

## Structure

```
src/
  app/
    layout.tsx              root layout, fonts, skip link
    page.tsx                home
    about/  portfolio/  contact/
    services/{pbx,maintenance,software,web-design}/
    api/contact/route.ts    form endpoint - validates, rate limits, emails via Resend
    sitemap.ts  robots.ts  not-found.tsx
  components/               shared UI
  lib/
    site.ts                 nav, services, contact details
    projects.ts             portfolio entries (placeholders)
    motion.ts               easing + variants
```

`Icon.tsx` maps string keys to lucide components, so icon choices can live in plain data and still cross the server/client boundary.

---

## Accessibility

Verified in-browser during the build:

- Skip link is the first focusable element and becomes visible on focus.
- Single `<h1>` per page; `<main>` and labelled `<nav>` landmarks.
- All text meets WCAG AA (minimum measured 4.99:1).
- Visible 2px `signal` focus ring on keyboard focus throughout.
- Touch targets ≥44px; the mobile nav locks body scroll and restores it on close.
- Tabs follow the WAI-ARIA pattern - roving tabindex, arrow/Home/End keys, `aria-controls` resolving to a live element.
- Form: visible labels, `aria-invalid`, errors as `role="alert"` below their field with an icon (never colour alone), focus moves to the first invalid field on submit, validation on blur rather than per keystroke.
- Portfolio filter announces its result count via `aria-live`.
- No horizontal scroll at 375px; the wide comparison table scrolls inside its own container.

---

## Deploying to Vercel

Push to a Git repo and import it - no configuration needed. Before going live, set `site.url` in `src/lib/site.ts` to the production domain so metadata, sitemap and robots resolve correctly.
