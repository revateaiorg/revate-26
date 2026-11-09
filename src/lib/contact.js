export const contactFields = ["from_name", "last_name", "email_id", "country_code", "phone_no", "message"];

export function normalizeField(name, value) {
  const text = String(value ?? "").replace(/[\u200B-\u200D\uFEFF]/g, "");
  if (name === "email_id") return text.replace(/\s/g, "");
  if (name === "phone_no") return text.replace(/[\s().-]/g, "");
  if (name === "country_code") {
    const code = text.replace(/\s/g, "");
    return /^\d+$/.test(code) ? `+${code}` : code;
  }
  if (name === "message") return text.trim();
  return text.trim().replace(/\s+/g, " ");
}

export function validateField(name, rawValue) {
  const value = normalizeField(name, rawValue);
  switch (name) {
    case "from_name":
    case "last_name": {
      const label = name === "from_name" ? "First name" : "Last name";
      if (!value) return `${label} is required`;
      if (value.length > 80) return `${label} must be at most 80 characters`;
      if (!/^[\p{L}\p{M} '’-]+$/u.test(value)) return `${label} can only contain letters, spaces, apostrophes, or hyphens`;
      return "";
    }
    case "email_id":
      if (!value) return "Email is required";
      return value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "" : "Please enter a valid email address";
    case "country_code":
      return /^\+[1-9]\d{0,2}$/.test(value) ? "" : "Enter a country code such as +91";
    case "phone_no":
      return /^[0-9]{7,14}$/.test(value) ? "" : "Enter a mobile number with 7–14 digits, without the country code";
    case "message":
      if (value.length < 10) return "Message must be at least 10 characters";
      return value.length <= 1000 ? "" : "Message must be at most 1000 characters";
    default:
      return "";
  }
}

export function validateContact(values) {
  const errors = Object.fromEntries(contactFields.map((field) => [field, validateField(field, values[field])]).filter(([, error]) => error));
  if (!errors.country_code && !errors.phone_no && `${normalizeField("country_code", values.country_code).slice(1)}${normalizeField("phone_no", values.phone_no)}`.length > 15) {
    errors.phone_no = "Mobile number including country code must be at most 15 digits";
  }
  return errors;
}
