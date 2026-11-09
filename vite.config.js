import { defineConfig, loadEnv } from "vite";
import process from "node:process";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import contactHandler from "./api/contact.mjs";

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
  return { plugins: [react(), tailwindcss(), contactApi] };
});
