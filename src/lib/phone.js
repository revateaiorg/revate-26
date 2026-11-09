import { getCountries, getCountryCallingCode, parsePhoneNumberFromString } from "libphonenumber-js/min";

const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
export const callingCountries = getCountries().map((country) => ({
  country,
  name: regionNames.of(country),
  code: `+${getCountryCallingCode(country)}`,
})).sort((a, b) => a.name.localeCompare(b.name, "en"));

// Some browsers autofill a full international number into tel-national.
export function splitInternationalPhone(value) {
  const text = String(value ?? "").trim();
  if (!text.startsWith("+")) return null;
  const phone = parsePhoneNumberFromString(text);
  if (!phone || !phone.isPossible()) return null;
  return { countryCode: `+${phone.countryCallingCode}`, number: phone.nationalNumber };
}
