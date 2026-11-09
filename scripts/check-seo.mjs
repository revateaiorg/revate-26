import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { site } from "../src/data/site.js";
import { seoHead } from "./seo.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../dist");
const html = await fs.readFile(path.join(root, "index.html"), "utf8");
const canonical = new URL(site.url);
const getMeta = (name) => html.match(new RegExp(`<meta (?:name|property)="${name}" content="([^"]+)"`))?.[1];

assert.equal((html.match(/<title>/g) || []).length, 1, "Exactly one title is required");
assert.ok(html.includes(`<link rel="canonical" href="${site.url}"`));
assert.equal(getMeta("og:url"), site.url);
assert.equal(getMeta("og:site_name"), "Revate AI");
assert.equal(getMeta("twitter:card"), "summary_large_image");
assert.equal(getMeta("og:image"), getMeta("twitter:image"));
assert.equal(getMeta("og:image:width"), "1200");
assert.equal(getMeta("og:image:height"), "630");
assert.ok(getMeta("description")?.length >= 100);
assert.ok(getMeta("keywords")?.includes("Chennai"));
assert.equal(getMeta("geo.region"), "IN-TN");
assert.equal(getMeta("geo.placename"), "Chennai, Tamil Nadu, India");
const sourceHtml = await fs.readFile(new URL("../index.html", import.meta.url), "utf8");
for (const tag of ["description", "keywords", "og:title", "og:image", "twitter:card", "twitter:image"]) {
  assert.ok(new RegExp(`<meta (?:name|property)="${tag}" content="[^"]+"`).test(sourceHtml), `${tag} must be written directly in source index.html`);
}
assert.ok(sourceHtml.includes(`<title>${site.title.replaceAll("&", "&amp;")}</title>`));
assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, "One main H1 is required");
assert.ok(!html.includes("<!--app-html-->"), "The page must be pre-rendered");
assert.ok(!html.includes("<!--seo-head-->"), "Metadata must be emitted into HTML");
assert.ok(html.includes("[data-preloader] { display: none !important; }"), "The no-JavaScript fallback must remove the loading screen");

const graphs = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
assert.equal(graphs.length, 1, "Use one linked structured-data graph");
const nodes = graphs[0]["@graph"];
const nodeIds = nodes.map((node) => node["@id"]);
assert.equal(new Set(nodeIds).size, nodes.length, "Schema IDs must be unique");
assert.ok(nodes.find((node) => node["@type"] === "Organization" && node.name === "Revate AI"));
const address = nodes.find((node) => node["@type"] === "Organization").address;
assert.equal(address.addressLocality, "Chennai");
assert.equal(address.addressRegion, "Tamil Nadu");
assert.equal(address.addressCountry, "IN");
assert.equal(nodes.filter((node) => node["@type"] === "Service").length, 5);
const types = ["WebSite", "WebPage", "FAQPage", "ImageObject"];
for (const type of types) assert.ok(nodes.some((node) => node["@type"] === type), `Missing ${type}`);

function verifyReferences(value) {
  if (!value || typeof value !== "object") return;
  if (value["@id"]) assert.ok(nodeIds.includes(value["@id"]), `Unresolved schema reference: ${value["@id"]}`);
  for (const child of Object.values(value)) verifyReferences(child);
}
verifyReferences(graphs[0]);
for (const node of nodes.filter((node) => node["@type"] === "Service")) {
  assert.ok(html.includes(`id="${new URL(node.url).hash.slice(1)}"`), `Service link missing from page: ${node.url}`);
}
// Match every FAQ answer to the text served to visitors, not invented schema copy.
for (const question of nodes.find((node) => node["@type"] === "FAQPage").mainEntity) {
  const encoded = question.acceptedAnswer.text.replaceAll("&", "&amp;").replaceAll("'", "&#x27;").replaceAll('"', "&quot;");
  assert.ok(html.includes(encoded), `FAQ answer missing from HTML: ${question.name}`);
}

for (const key of ["og:image", "twitter:image"]) {
  const imageUrl = new URL(getMeta(key));
  assert.equal(imageUrl.origin, canonical.origin);
  const image = await fs.readFile(path.join(root, imageUrl.pathname));
  assert.equal(image.toString("hex", 0, 8), "89504e470d0a1a0a", "Social image must be a valid PNG");
  assert.equal(image.readUInt32BE(16), 1200);
  assert.equal(image.readUInt32BE(20), 630);
}
for (const file of ["favicon-32.png", "icon-192.png", "brand-icon.png", "apple-touch-icon.png", "site.webmanifest", "llms.txt"]) await fs.access(path.join(root, file));
const robots = await fs.readFile(path.join(root, "robots.txt"), "utf8");
const sitemap = await fs.readFile(path.join(root, "sitemap.xml"), "utf8");
const businessProfile = await fs.readFile(path.join(root, "business-profile.xml"), "utf8");
assert.ok(businessProfile.includes("<city>Chennai</city>"));
assert.ok(businessProfile.includes('<region code="IN-TN">Tamil Nadu</region>'));
assert.ok(robots.includes(`Sitemap: ${site.url}sitemap.xml`));
assert.ok(sitemap.includes(`<loc>${site.url}</loc>`));
assert.ok(seoHead({ preview: true }).includes('content="noindex, nofollow"'));
assert.ok(!html.includes("discord.com/api/webhooks/"), "Private webhook must stay out of the page");
console.log("SEO checks passed: pre-rendered content, metadata, schema references, service/FAQ content, crawler files, preview noindex, and 1200×630 social image.");
