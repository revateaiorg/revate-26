import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { site } from "../src/data/site.js";
import { services } from "../src/data/services.js";
import { seoHead } from "./seo.mjs";

const index = fileURLToPath(new URL("../index.html", import.meta.url));
const html = await fs.readFile(index, "utf8");
const block = `<!--seo-head:start-->\n  ${seoHead()}\n  <!--seo-head:end-->`;
const pattern = /<!--seo-head:start-->[\s\S]*?<!--seo-head:end-->|<!--seo-head-->/;
if (!pattern.test(html)) throw new Error("The index.html SEO block is missing");
await fs.writeFile(index, html.replace(pattern, block));

const xml = (value) => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&apos;");
const profile = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Factual business data for XML consumers. This is not a search-engine sitemap or a ranking directive. -->
<businessProfile xml:lang="en-IN">
  <name>${xml(site.name)}</name>
  <website>${xml(site.url)}</website>
  <description>${xml(site.description)}</description>
  <location>
    <city>${xml(site.location.city)}</city>
    <region code="${site.location.regionCode}">${xml(site.location.region)}</region>
    <country code="${site.location.countryCode}">${xml(site.location.country)}</country>
  </location>
  <contact><email>${xml(site.email)}</email><telephone>${xml(site.phone)}</telephone></contact>
  <services>
${services.map((service) => `    <service><name>${xml(service.title)}</name><url>${xml(`${site.url}#${service.id}`)}</url></service>`).join("\n")}
  </services>
  <socialPreview width="1200" height="630">${xml(new URL(site.image, site.url).href)}</socialPreview>
  <sitemap>${xml(`${site.url}sitemap.xml`)}</sitemap>
</businessProfile>
`;
await fs.writeFile(new URL("../public/business-profile.xml", import.meta.url), profile);
console.log("Synced index.html SEO metadata and Chennai business-profile.xml.");
