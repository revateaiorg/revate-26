import { site } from "../src/data/site.js";
import { services } from "../src/data/services.js";
import { questions } from "../src/data/faqs.js";

const absolute = (path) => new URL(path, site.url).href;
const id = (fragment) => `${site.url}#${fragment}`;
const escape = (value) => String(value).replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

export function structuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization", "@id": id("organization"),
        name: site.name, alternateName: site.alternateName, url: site.url,
        description: site.description, email: site.email, telephone: site.phone,
        address: { "@type": "PostalAddress", addressLocality: site.location.city, addressRegion: site.location.region, addressCountry: site.location.countryCode },
        location: { "@type": "Place", name: "Chennai, Tamil Nadu, India" },
        areaServed: [{ "@type": "City", name: site.location.city }, { "@type": "State", name: site.location.region }],
        logo: { "@id": id("logo") }, image: { "@id": id("social-image") },
        sameAs: site.sameAs,
        contactPoint: [{ "@type": "ContactPoint", contactType: "sales", telephone: site.phone, email: site.email, url: site.bookingUrl, availableLanguage: ["English"] }],
        hasOfferCatalog: {
          "@type": "OfferCatalog", name: "AI automation and web development services",
          itemListElement: services.map((service) => ({ "@type": "Offer", itemOffered: { "@id": id(service.id) } })),
        },
      },
      { "@type": "ImageObject", "@id": id("logo"), url: absolute("brand-icon.png"), contentUrl: absolute("brand-icon.png"), width: 512, height: 512, caption: site.name },
      { "@type": "ImageObject", "@id": id("social-image"), url: absolute(site.image), contentUrl: absolute(site.image), width: 1200, height: 630, caption: site.imageAlt },
      { "@type": "WebSite", "@id": id("website"), name: site.name, alternateName: site.alternateName, url: site.url, publisher: { "@id": id("organization") }, inLanguage: "en" },
      {
        "@type": "WebPage", "@id": id("webpage"), url: site.url, name: site.title,
        description: site.description, inLanguage: "en", isPartOf: { "@id": id("website") },
        about: { "@id": id("organization") }, primaryImageOfPage: { "@id": id("social-image") },
        hasPart: [{ "@id": id("faq") }],
      },
      ...services.map((service) => ({ "@type": "Service", "@id": id(service.id), url: id(service.id), name: service.title, serviceType: service.title, description: service.body, provider: { "@id": id("organization") } })),
      {
        "@type": "FAQPage", "@id": id("faq"), url: id("faq"), isPartOf: { "@id": id("webpage") },
        mainEntity: questions.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })),
      },
    ],
  };
}

export function seoHead({ preview = false } = {}) {
  const meta = (key, value, property = false) => `<meta ${property ? "property" : "name"}="${key}" content="${escape(value)}" />`;
  return [
    `<title>${escape(site.title)}</title>`,
    meta("description", site.description), meta("keywords", site.keywords.join(", ")),
    meta("author", site.name), meta("publisher", site.name),
    meta("geo.region", site.location.regionCode), meta("geo.placename", `${site.location.city}, ${site.location.region}, ${site.location.country}`),
    meta("robots", preview ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"),
    `<link rel="canonical" href="${site.url}" />`,
    `<link rel="alternate" type="application/xml" title="Revate AI business profile" href="/business-profile.xml" />`,
    `<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />`,
    `<link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />`,
    `<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />`,
    `<link rel="manifest" href="/site.webmanifest" />`,
    meta("theme-color", "#080c13"),
    meta("og:type", "website", true), meta("og:site_name", site.name, true),
    meta("og:locale", "en_IN", true), meta("og:url", site.url, true),
    meta("og:title", site.title, true), meta("og:description", site.description, true),
    meta("og:image", absolute(site.image), true), meta("og:image:secure_url", absolute(site.image), true),
    meta("og:image:type", "image/png", true), meta("og:image:width", "1200", true), meta("og:image:height", "630", true), meta("og:image:alt", site.imageAlt, true),
    meta("twitter:card", "summary_large_image"), meta("twitter:site", "@revate"),
    meta("twitter:title", site.title), meta("twitter:description", site.description),
    meta("twitter:image", absolute(site.image)), meta("twitter:image:alt", site.imageAlt),
    `<script type="application/ld+json">\n${JSON.stringify(structuredData(), null, 2).replaceAll("<", "\\u003c")}\n  </script>`,
  ].join("\n  ");
}
