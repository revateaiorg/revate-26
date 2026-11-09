import test from "node:test";
import assert from "node:assert/strict";
import { Readable } from "node:stream";
import contactHandler from "../api/contact.mjs";
import { normalizeField, validateContact } from "../src/lib/contact.js";
import { callingCountries, splitInternationalPhone } from "../src/lib/phone.js";

const valid = {
  from_name: "  Zoë  ", last_name: "O’Neil", email_id: " zoe@example.com\u00a0",
  country_code: " 91 ", phone_no: "98765 43210", message: "  Please help with our new website.  ",
};

async function submit(body, fetchImpl, options = {}) {
  const req = Readable.from([typeof body === "string" ? body : JSON.stringify(body)]);
  req.method = options.method || "POST";
  req.headers = { "content-type": "application/json", ...options.headers };
  if (options.parsed) req.body = body;
  const res = {
    setHeader() {},
    writeHead(status) { this.status = status; },
    end(body) { this.body = JSON.parse(body); },
  };
  await contactHandler(req, res, { webhookUrl: "https://discord.com/api/webhooks/test/token", fetchImpl });
  return res;
}

test("normalizes autofill and pasted whitespace while retaining message structure", () => {
  assert.equal(normalizeField("email_id", " \u200Bzoe@example.com\u00a0"), "zoe@example.com");
  assert.equal(normalizeField("phone_no", "(98765) 432-10"), "9876543210");
  assert.equal(normalizeField("from_name", "  Mary   Jane  "), "Mary Jane");
  assert.equal(normalizeField("message", "  First line\nSecond line  "), "First line\nSecond line");
  assert.deepEqual(validateContact(valid), {});
});

test("requires all requested fields and limits international phone length", () => {
  assert.equal(Object.keys(validateContact({})).length, 6);
  assert.ok(validateContact({ ...valid, country_code: "+123", phone_no: "1234567890123" }).phone_no);
  assert.ok(validateContact({ ...valid, message: "          " }).message);
  assert.ok(validateContact({ ...valid, email_id: "invalid" }).email_id);
});

test("provides country choices and separates full international autofill values", () => {
  assert.ok(callingCountries.length > 200);
  assert.ok(callingCountries.some(({ country, code }) => country === "IN" && code === "+91"));
  assert.ok(callingCountries.some(({ country, code }) => country === "US" && code === "+1"));
  assert.deepEqual(splitInternationalPhone(" +44 7911 123456 "), { countryCode: "+44", number: "7911123456" });
  assert.deepEqual(splitInternationalPhone("+91 98765 43210"), { countryCode: "+91", number: "9876543210" });
  assert.equal(splitInternationalPhone("9876543210"), null);
  assert.equal(splitInternationalPhone("+4"), null);
});

test("posts normalized fields, disables mentions, and waits for Discord confirmation", async () => {
  let calls = 0;
  const result = await submit(valid, async (url, options) => {
    calls++;
    assert.equal(url.searchParams.get("wait"), "true");
    assert.equal(options.method, "POST");
    const payload = JSON.parse(options.body);
    assert.deepEqual(payload.allowed_mentions, { parse: [] });
    assert.deepEqual(payload.embeds[0].fields.map(({ value }) => value), ["Zoë", "O’Neil", "zoe@example.com", "+91 9876543210", "Please help with our new website."]);
    return { ok: true };
  });
  assert.equal(calls, 1);
  assert.equal(result.status, 200);
});

test("rejects invalid input before contacting Discord", async () => {
  const result = await submit({ ...valid, phone_no: "bad" }, () => assert.fail("Must not post invalid input"));
  assert.equal(result.status, 400);
  assert.ok(result.body.errors.phone_no);
});

test("accepts Vercel's pre-parsed JSON request body", async () => {
  const result = await submit(valid, async () => ({ ok: true }), { parsed: true });
  assert.equal(result.status, 200);
  assert.equal(result.body.success, true);
});

test("handles malformed JSON, oversized bodies, and cross-site requests", async () => {
  const noPost = () => assert.fail("Must not post");
  assert.equal((await submit("{", noPost)).status, 400);
  assert.equal((await submit(" ".repeat(17000), noPost)).status, 413);
  assert.equal((await submit(valid, noPost, { headers: { "sec-fetch-site": "cross-site" } })).status, 403);
  assert.equal((await submit(valid, noPost, { method: "GET" })).status, 405);
});

test("reports Discord delivery errors instead of success", async () => {
  for (const status of [400, 429, 500]) {
    const result = await submit(valid, async () => ({ ok: false, status }));
    assert.equal(result.status, status === 429 ? 429 : 502);
    assert.equal(result.body.success, undefined);
  }
  assert.equal((await submit(valid, async () => { throw new Error("Network down"); })).status, 502);
});
