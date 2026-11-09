# React + Vite

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
