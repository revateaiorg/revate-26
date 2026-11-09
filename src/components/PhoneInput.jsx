import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { callingCountries, splitInternationalPhone } from "../lib/phone";
import { normalizeField } from "../lib/contact";

export default function PhoneInput({ disabled, errors, touched, onChange, onBlur }) {
  const [code, setCode] = useState("+91");
  const selector = useRef(null);
  const invalid = (errors.country_code && touched.country_code) || (errors.phone_no && touched.phone_no);

  const handleCodeChange = (event) => {
    setCode(event.target.value);
    onChange(event);
  };

  const handlePhoneChange = (event) => {
    const international = splitInternationalPhone(event.target.value);
    if (international) {
      event.target.value = international.number;
      selector.current.value = international.countryCode;
      setCode(international.countryCode);
      onChange({ target: { name: "country_code", value: international.countryCode } });
    }
    onChange(event);
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const input = event.currentTarget;
    const start = input.selectionStart ?? 0;
    const end = input.selectionEnd ?? input.value.length;
    input.value = normalizeField("phone_no", input.value.slice(0, start) + event.clipboardData.getData("text") + input.value.slice(end));
    handlePhoneChange({ target: input });
  };

  return (
    <div className={`contact-phone flex h-[58px] min-w-0 items-center overflow-hidden rounded-md border bg-white/4 transition-[border-color,box-shadow] focus-within:ring-2 focus-within:ring-blue-500/15 ${invalid ? "border-red-500 focus-within:border-red-500" : "border-white/10 hover:border-white/20 focus-within:border-blue-500/70"}`}>
      <div className="relative h-full w-[88px] shrink-0">
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center gap-2 text-sm font-medium tabular-nums text-white/90">
          {code} <ChevronDown size={13} className="text-white/45" />
        </span>
        <select
          ref={selector}
          name="country_code"
          aria-label="Country code"
          autoComplete="tel-country-code"
          defaultValue="+91"
          required
          disabled={disabled}
          aria-invalid={Boolean(errors.country_code && touched.country_code)}
          aria-describedby={errors.country_code ? "error-country_code" : undefined}
          onChange={handleCodeChange}
          onInput={handleCodeChange}
          onBlur={handleCodeChange}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0 [color-scheme:dark]"
        >
          {callingCountries.map(({ country, name, code }) => (
            <option key={country} value={code}>{name} ({code})</option>
          ))}
        </select>
      </div>
      <span aria-hidden="true" className="h-5 w-px shrink-0 bg-white/12" />
      <input
        id="contact-phone_no"
        type="tel"
        name="phone_no"
        autoComplete="tel-national"
        inputMode="tel"
        placeholder="Phone number"
        required
        disabled={disabled}
        aria-invalid={Boolean(errors.phone_no && touched.phone_no)}
        aria-describedby={errors.phone_no ? "error-phone_no" : undefined}
        className="contact-input h-full min-w-0 w-full border-0 bg-transparent px-3.5 text-sm text-white outline-none placeholder:text-white/40 focus-visible:outline-none"
        onChange={handlePhoneChange}
        onInput={handlePhoneChange}
        onPaste={handlePaste}
        onBlur={(event) => { handlePhoneChange(event); onBlur(event); }}
      />
    </div>
  );
}
