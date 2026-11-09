import { parsePhoneNumberFromString } from "libphonenumber-js/min";
export { callingCountries } from "../data/calling-countries.js";

// Some browsers autofill a full international number into tel-national.
export function splitInternationalPhone(value) {
  const text = String(value ?? "").trim();
  if (!text.startsWith("+")) return null;
  const phone = parsePhoneNumberFromString(text);
  if (!phone || !phone.isPossible()) return null;
  return { countryCode: `+${phone.countryCallingCode}`, number: phone.nationalNumber };
}
