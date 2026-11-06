# React + Vite

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
