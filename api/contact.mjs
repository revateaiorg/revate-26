import { contactFields, normalizeField, validateContact } from "../src/lib/contact.js";

// Vercel automatically serves this function at /api/contact.
export default async function contactHandler(req, res, { webhookUrl = process.env.DISCORD_WEBHOOK_URL, fetchImpl = fetch } = {}) {
  const reply = (status, body) => {
    res.writeHead(status, { "Content-Type": "application/json", "Cache-Control": "no-store" });
    res.end(JSON.stringify(body));
  };
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return reply(405, { error: "Method not allowed" });
  }
  if (!req.headers["content-type"]?.startsWith("application/json")) return reply(415, { error: "Expected JSON" });
  if (req.headers["sec-fetch-site"] === "cross-site") return reply(403, { error: "Cross-site submission is not allowed" });
  try {
    let body = req.body;
    if (body === undefined) {
      const chunks = [];
      let size = 0;
      for await (const chunk of req) {
        size += Buffer.byteLength(chunk);
        if (size > 16384) return reply(413, { error: "Submission is too large" });
        chunks.push(Buffer.from(chunk));
      }
      body = JSON.parse(Buffer.concat(chunks).toString());
    } else if (typeof body === "string") {
      body = JSON.parse(body);
    }
    if (!body || typeof body !== "object" || Array.isArray(body)) return reply(400, { error: "Invalid submission" });
    const values = Object.fromEntries(contactFields.map((field) => [field, normalizeField(field, body[field])]));
    const errors = validateContact(values);
    if (Object.keys(errors).length) return reply(400, { errors });
    if (!webhookUrl) return reply(503, { error: "Contact service is unavailable" });

    const url = new URL(webhookUrl.trim());
    url.searchParams.set("wait", "true");
    const response = await fetchImpl(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        allowed_mentions: { parse: [] },
        embeds: [{
          title: "New website enquiry",
          color: 0x3b82f6,
          fields: [
            { name: "First name", value: values.from_name, inline: true },
            { name: "Last name", value: values.last_name, inline: true },
            { name: "Email", value: values.email_id },
            { name: "Mobile number", value: `${values.country_code} ${values.phone_no}` },
            { name: "Message", value: values.message },
          ],
        }],
      }),
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) return reply(response.status === 429 ? 429 : 502, { error: "Unable to deliver message. Please try again shortly." });
    return reply(200, { success: true });
  } catch (error) {
    return reply(error instanceof SyntaxError ? 400 : 502, { error: "Unable to process submission" });
  }
}
