# Revate AI

## Contact form

The form sends first name, last name, email, country code, mobile number, and message to `POST /api/contact`. The server validates and normalizes values, then posts an embed to Discord with mentions disabled and waits for delivery confirmation.

- Set `DISCORD_WEBHOOK_URL` in `.env.local` for development (`.env.example` shows the format). The supplied webhook is configured locally; `.env.local` is ignored by Git.
- Run `npm run dev` for the website and contact endpoint together.
- Deploy this repository to Vercel using the **Vite** framework preset, `npm run build` as the build command, and `dist` as the output directory. Vercel automatically deploys `api/contact.mjs` as a function at `/api/contact`; no separate backend or server process is needed.
- In Vercel → Project Settings → Environment Variables, add **`DISCORD_WEBHOOK_URL`** with your complete Discord webhook URL. Enable it for Production (and Preview if needed), then redeploy so the function receives it. Keep this variable server-only; do not add a `VITE_` prefix.
- The browser makes a simple JSON POST to `/api/contact`; the Vercel function forwards it to Discord. `npm run dev` also runs the endpoint locally. `vite preview` only previews the static build.
- Run `npm run test:contact` to check normalization, validation, and Discord success/failure handling using a mocked webhook.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Editing styles

- Edit section layout, spacing, typography, breakpoints, and hover states directly in each component’s Tailwind `className` attributes under `src/components/`.
- Shared headings live in `SectionHeading.jsx`; use its `compact`, `dark`, and `align` props for variants.
- Change shared colours in `src/index.css`. Tailwind exposes them as `bg-surface`, `bg-surface-soft`, `text-ink`, `text-ink-muted`, `text-accent`, `border-line`, and `border-connection`.
- Fonts use `font-content` for the page sections and `font-sans` for the existing hero.
- Keep custom CSS limited to theme tokens, reusable animation keyframes, and browser defaults. GSAP scroll behaviour stays in `Process.jsx`.

## Search, AI discovery, and social sharing

- `src/data/site.js` is the source for the company name **Revate AI**, canonical production URL `https://www.revateai.com/`, description, contact details, and social profiles. The existing live domain redirects to `www`, so canonical URLs, social metadata, schema, and the sitemap use that hostname consistently.
- Title, description, keywords, Open Graph, Twitter cards, geographic tags, and linked JSON-LD are present directly in source `index.html`. Run `npm run seo:sync` after editing the shared business data; the production build also runs this automatically. Vite refreshes this block from `scripts/seo.mjs` and applies noindex to Preview builds. Services and FAQ answers share their data with the visible page. Do not add unverified addresses, reviews, awards, prices, or business facts to schema.
- `npm run build` pre-renders the page, then automatically runs `npm run check:seo`. The check verifies metadata, one H1, linked schema, visible service/FAQ content, public image files, and crawler files. Vercel must continue using `npm run build`, not `build:csr`.
- `public/social-preview.png` is the **1200 × 630** image used for Open Graph and large X cards. Its editable vector source is `scripts/social-preview.svg`; export source changes back to a PNG at the same dimensions. The existing PNG is committed and needs no image generation service at deployment.
- Vercel Preview builds receive `noindex, nofollow` metadata. Production remains indexable. `robots.txt` permits page crawling and excludes `/api/`. `llms.txt` is an optional factual directory, not a ranking factor or an indexing requirement.
- The confirmed business location is Chennai, Tamil Nadu, India. It appears in visible content, FAQs, geographic metadata, the Organization city-level PostalAddress, llms.txt, and public/business-profile.xml. No street address, postcode, or precise business coordinates have been invented. The XML profile is an optional factual export; sitemap.xml remains a standards-compliant URL sitemap. Meta keywords and geographic meta tags are informational and do not guarantee rankings.

After deploying:

1. Verify the domain in [Google Search Console](https://search.google.com/search-console) and submit `https://www.revateai.com/sitemap.xml`. Inspect the homepage URL and request indexing. Check the Search generative AI inclusion setting in Search Console as well. Site ownership verification must be completed through your account; no verification tokens have been fabricated or added.
2. Test the public URL in [Google Rich Results Test](https://search.google.com/test/rich-results) and [Schema.org Validator](https://validator.schema.org/). Organization and Service markup help describe the business; not every valid schema type produces a Google rich result. Google retired FAQ rich results in May 2026; the FAQ schema remains a factual description for other consumers, not a promise of a Google result enhancement.
3. Refresh sharing caches with [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) and [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/). Confirm the deployed `https://www.revateai.com/social-preview.png` returns an image, then share the canonical homepage URL.
4. Use Search Console to monitor indexing and real search queries. Search engines choose titles, snippets, rankings, and whether to cite a page in AI results; metadata and structured data cannot guarantee inclusion. Google documents that AI search features use the same SEO foundations, with no special AI-only schema requirement.
