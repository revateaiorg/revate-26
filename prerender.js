/**
 * prerender.js — Vite SSG Pre-rendering Script for Revate AI
 *
 * Run this after `vite build` to inject pre-rendered HTML into dist/index.html.
 * Usage: node prerender.js
 *
 * The script:
 * 1. Builds a server-side Vite bundle of entry-server.jsx
 * 2. Calls render() which uses renderToString to produce HTML
 * 3. Injects the HTML into dist/index.html, replacing <!--app-html-->
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function prerender() {
  console.log("🔨 Building server-side bundle for pre-rendering...");

  // Step 1: Build the SSR bundle
  await build({
    plugins: [react(), tailwindcss()],
    build: {
      ssr: true,
      outDir: "dist-ssr",
      rollupOptions: {
        input: "./src/entry-server.jsx",
        external: [
          // Externalize React so there's only ONE instance (prevents useContext null error)
          "react",
          "react-dom",
          "react-dom/server",
          "react/jsx-runtime",
          // Externalize animation and embed libs that may have browser-only sub-modules
          "framer-motion",
          "@calcom/embed-react",
          "lucide-react",
          "@emailjs/browser",
          "react-select",
        ],
        output: {
          format: "esm",
        },
      },
    },
    logLevel: "warn",
  });

  console.log("⚙️  Running renderToString...");

  // Step 2: Import and run the render function
  // Mock minimal browser globals needed by framer-motion / react before importing
  // Node 24 has read-only getters for navigator/window — must use defineProperty
  const defineGlobal = (name, value) => {
    try {
      Object.defineProperty(globalThis, name, {
        value,
        writable: true,
        configurable: true,
      });
    } catch {
      // Already writable or identical value
    }
  };

  defineGlobal("window", {
    addEventListener: () => {},
    removeEventListener: () => {},
    matchMedia: () => ({ matches: false, addListener: () => {}, removeListener: () => {} }),
    getComputedStyle: () => ({}),
    innerWidth: 1200,
    innerHeight: 800,
    pageYOffset: 0,
    scrollTo: () => {},
    location: { href: "https://revateai.com/", pathname: "/" },
    history: { replaceState: () => {}, pushState: () => {} },
    requestAnimationFrame: (fn) => setTimeout(fn, 16),
    cancelAnimationFrame: clearTimeout,
    performance: { now: () => Date.now() },
  });
  defineGlobal("document", {
    getElementById: () => null,
    querySelector: () => null,
    querySelectorAll: () => [],
    createElement: () => ({
      style: {},
      setAttribute: () => {},
      appendChild: () => {},
    }),
    createElementNS: () => ({
      style: {},
      setAttribute: () => {},
    }),
    body: { style: {} },
    head: { appendChild: () => {} },
    documentElement: { style: {} },
  });
  defineGlobal("navigator", { userAgent: "node" });
  defineGlobal("MutationObserver", class {
    observe() {}
    disconnect() {}
  });
  defineGlobal("IntersectionObserver", class {
    observe() {}
    unobserve() {}
    disconnect() {}
  });
  defineGlobal("ResizeObserver", class {
    observe() {}
    unobserve() {}
    disconnect() {}
  });
  defineGlobal("HTMLElement", class {});
  defineGlobal("SVGElement", class {});
  defineGlobal("Event", class {
    constructor() { this.bubbles = false; }
  });

  // Dynamically import the SSR bundle
  // On Windows, ESM dynamic import needs a file:// URL, not a raw path
  const { pathToFileURL } = await import("node:url");
  const serverBundlePath = path.resolve(
    __dirname,
    "dist-ssr",
    "entry-server.js"
  );
  const serverBundleUrl = pathToFileURL(serverBundlePath).href + `?t=${Date.now()}`;
  const { render } = await import(serverBundleUrl);

  const appHtml = render();

  // Step 3: Read the client build template and inject pre-rendered HTML
  const templatePath = path.resolve(__dirname, "dist", "index.html");
  const template = fs.readFileSync(templatePath, "utf-8");

  const finalHtml = template.replace("<!--app-html-->", appHtml);

  fs.writeFileSync(templatePath, finalHtml, "utf-8");

  // Clean up the SSR build directory
  fs.rmSync(path.resolve(__dirname, "dist-ssr"), { recursive: true, force: true });

  console.log("✅ Pre-rendering complete! dist/index.html now contains full HTML.");
  console.log(
    `   Injected ~${Math.round(appHtml.length / 1024)}KB of pre-rendered content.`
  );
}

prerender().catch((err) => {
  console.error("❌ Pre-rendering failed:", err);
  process.exit(1);
});
