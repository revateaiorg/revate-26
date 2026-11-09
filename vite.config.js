import { defineConfig, loadEnv } from "vite";
import process from "node:process";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import contactHandler from "./api/contact.mjs";
import { seoHead } from "./scripts/seo.mjs";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "DISCORD_");
  const contactApi = {
    name: "contact-api",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url?.split("?")[0] === "/api/contact") {
          return contactHandler(req, res, { webhookUrl: env.DISCORD_WEBHOOK_URL });
        }
        next();
      });
    },
  };
  const seo = {
    name: "site-seo",
    transformIndexHtml(html) {
      return html.replace(/<!--seo-head:start-->[\s\S]*?<!--seo-head:end-->/, `<!--seo-head:start-->\n  ${seoHead({ preview: process.env.VERCEL_ENV === "preview" })}\n  <!--seo-head:end-->`);
    },
  };
  return { plugins: [react(), tailwindcss(), contactApi, seo] };
});
