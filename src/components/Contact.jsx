import React, { useRef, useState } from "react";
import SectionHeading from "./SectionHeading";
import { ArrowUpRight, Check, Mail, Phone } from "lucide-react";
import Globe from "./Globe";
import PhoneInput from "./PhoneInput";
import { site } from "../data/site";
import { splitInternationalPhone } from "../lib/phone";
import { contactFields, normalizeField, validateField, validateContact } from "../lib/contact";

const Contact = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [messageLength, setMessageLength] = useState(0);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const submitting = useRef(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSuccess(false);
    setSubmitError("");
    setTouched((prev) => ({ ...prev, [name]: true }));
    if (name === "message") setMessageLength(value.length);
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleBlur = (e) => {
    e.target.value = normalizeField(e.target.name, e.target.value);
    handleInputChange(e);
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData("text");
    e.preventDefault();
    const input = e.currentTarget;
    const start = input.selectionStart ?? 0;
    const end = input.selectionEnd ?? input.value.length;
    input.value = normalizeField(input.name, input.value.slice(0, start) + pasted + input.value.slice(end));
    handleInputChange({ target: input });
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (submitting.current) return;
    setSuccess(false);
    setSubmitError("");
    const data = new FormData(form.current);
    const internationalPhone = splitInternationalPhone(data.get("phone_no"));
    if (internationalPhone) {
      data.set("country_code", internationalPhone.countryCode);
      data.set("phone_no", internationalPhone.number);
    }
    const values = Object.fromEntries(contactFields.map((name) => {
      const value = normalizeField(name, data.get(name));
      form.current.elements.namedItem(name).value = value;
      return [name, value];
    }));
    setMessageLength(values.message.length);
    const newErrors = validateContact(values);
    setErrors(newErrors);
    setTouched(Object.fromEntries(contactFields.map((name) => [name, true])));
    if (Object.keys(newErrors).length) {
      form.current.elements.namedItem(Object.keys(newErrors)[0]).focus();
      return;
    }
    submitting.current = true;
    setLoading(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
        signal: AbortSignal.timeout(20000),
      });
      if (!response.ok) throw new Error("Unable to send your message. Please try again shortly.");
      setSuccess(true);
      form.current.reset();
      setErrors({});
      setTouched({});
      setMessageLength(0);
    } catch {
      setSubmitError("Unable to send your message. Please try again shortly or contact us by email.");
    } finally {
      submitting.current = false;
      setLoading(false);
    }
  };

  // Helper function to get input class names
  const getInputClassName = (fieldName) => {
    const baseClass =
      "contact-input border bg-white/4 p-4 w-full min-w-0 rounded-md transition-colors duration-200";
    const hasError = errors[fieldName] && touched[fieldName];
    return hasError
      ? `${baseClass} border-red-500 focus:border-red-500`
      : `${baseClass} border-white/10 focus:border-blue-500/50`;
  };

  const contactLinks = [
    {
      key: "phone",
      href: `tel:${site.phone}`,
      label: site.phoneLabel,
      icon: Phone,
    },
    {
      key: "email",
      href: "https://mail.google.com/mail/?view=cm&fs=1&to=revateai.org@gmail.com",
      label: "revateai.org@gmail.com",
      icon: Mail,
      external: true,
    },
  ];

  const fieldRows = [
    [
      { name: "from_name", label: "First name", placeholder: "John", autoComplete: "given-name", maxLength: 80 },
      { name: "last_name", label: "Last name", placeholder: "Doe", autoComplete: "family-name", maxLength: 80 },
    ],
    [
      { name: "email_id", label: "Your email", placeholder: "you@example.com", type: "email", autoComplete: "email", maxLength: 254 },
      { name: "phone_no", label: "Mobile number", custom: "phone" },
    ],
  ];

  return (
    <section id="contact" className="font-content text-white pb-20 md:pb-28">
      <div className="mx-auto mt-26 grid w-[calc(100%-40px)] max-w-7xl gap-10 min-[600px]:w-[calc(100%-48px)] min-[900px]:grid-cols-[0.9fr_1.1fr] min-[900px]:items-start min-[900px]:gap-12">
        {/* Left: heading and direct contact details */}
        {/* <div className="w-full h-full p-1 md:p-8 rounded-3xl border border-white/10 bg-[#080808]  sm:p-2"> */}
        <div
          className="relative overflow-hidden min-h-[480px] min-[900px]:min-h-0 w-full h-full p-6 md:p-8 rounded-3xl border border-blue-400/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_30px_80px_-40px_rgba(37,99,235,0.6)] sm:p-5"
          style={{
            background: `
            radial-gradient(70% 45% at 0% 0%, rgba(37,99,235,0.30), transparent 60%),
            radial-gradient(80% 50% at 15% 100%, rgba(37,99,235,0.40), transparent 65%),
            linear-gradient(165deg, #0B1535 0%, #070C1F 50%, #05070F 100%)
          `,
          }}
        >          <div className="relative z-10">
            <SectionHeading dark label="Contact us" title="Let's Start with" accent="your idea next" description="Share your goals, challenges, or ideas with us. Let's explore how we can work together to create meaningful solutions for your business." />

            <div className="mt-7 flex flex-col md:flex-row items-start gap-3">
              {contactLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.key}
                    href={link.href}
                    {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="flex w-fit items-center gap-2.5 rounded-xl border border-white/20 bg-white/8 px-3 py-2 text-sm font-medium text-white/80 backdrop-blur-lg transition-colors hover:border-accent hover:text-white md:text-base"
                  >
                    <span className="grid size-7 shrink-0 place-items-center rounded-md bg-[#3B82F6] text-white">
                      <Icon size={15} aria-hidden="true" />
                    </span>
                    {link.label}
                  </a>
                );
              })}
            </div>
          </div>
          <div className="absolute -bottom-60 -left-26 md:-bottom-40 md:-left-18">
            <Globe />
          </div>
        </div>

        {/* Right: the enquiry form */}
        <div className="relative w-full rounded-3xl border border-white/10 bg-[#080808] p-1.5 sm:p-2">
          {success && (
            <div role="status" aria-live="polite" className="absolute inset-0 flex flex-col items-start justify-center px-6 py-12 sm:px-10">
              <span className="mb-7 grid size-12 place-items-center rounded-full border border-blue-400/20 bg-blue-400/10 text-blue-400">
                <Check size={24} strokeWidth={1.8} aria-hidden="true" />
              </span>
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-blue-400">Message received</p>
              <h3 className="max-w-sm text-3xl font-medium tracking-tight text-white">Thanks for reaching out.</h3>
              <p className="mt-4 max-w-sm text-sm leading-7 text-white/55">We've received your message. Our team will be in touch soon to talk about your idea.</p>
              <button type="button" onClick={() => setSuccess(false)} className="mt-8 inline-flex cursor-pointer items-center gap-2 border-b border-white/20 pb-2 text-sm font-medium text-white/80 transition-colors hover:border-blue-400 hover:text-blue-400">
                Send another message <ArrowUpRight size={16} aria-hidden="true" />
              </button>
            </div>
          )}
          {/* Preserve the form's responsive height while showing confirmation. */}
          <form
            key={success ? "sent" : "editing"}
            ref={form}
            onSubmit={sendMessage}
            noValidate
            inert={success}
            aria-hidden={success}
            className={`flex flex-col space-y-6 p-4 md:p-8 ${success ? "invisible" : ""}`}
          >
            {fieldRows.map((row) => (
              <div key={row.map((f) => f.name).join("-")} className="grid grid-cols-1 gap-5 min-[600px]:grid-cols-2 min-[900px]:grid-cols-1 min-[1100px]:grid-cols-2">
                {row.map((field) => (
                  <div key={field.name} className="flex min-w-0 w-full flex-col space-y-2">
                    <label htmlFor={`contact-${field.name}`}>
                      {field.label} <span className="text-red-500">*</span>
                    </label>
                    {field.custom === "phone" ? (
                      <PhoneInput
                        disabled={loading}
                        errors={errors}
                        touched={touched}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                      />
                    ) : (
                    <input
                      id={`contact-${field.name}`}
                      type={field.type || "text"}
                      name={field.name}
                      placeholder={field.placeholder}
                      autoComplete={field.autoComplete}
                      defaultValue={field.defaultValue}
                      maxLength={field.maxLength}
                      required
                      disabled={loading}
                      aria-invalid={Boolean(errors[field.name] && touched[field.name])}
                      aria-describedby={errors[field.name] ? `error-${field.name}` : undefined}
                      className={getInputClassName(field.name)}
                      onChange={handleInputChange}
                      onPaste={handlePaste}
                      onBlur={handleBlur}
                    />
                    )}
                    {field.custom === "phone" && errors.country_code && touched.country_code && (
                      <p id="error-country_code" className="text-sm text-red-400">{errors.country_code}</p>
                    )}

                    {errors[field.name] && touched[field.name] && (
                      <p id={`error-${field.name}`} className="text-sm text-red-400">{errors[field.name]}</p>
                    )}
                  </div>
                ))}
              </div>
            ))}

            <div className="flex flex-col space-y-2">
              <label htmlFor="contact-message">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                disabled={loading}
                aria-invalid={Boolean(errors.message && touched.message)}
                aria-describedby="contact-message-help"
                onPaste={handlePaste}
                placeholder="Type your message here..."
                className={`${getInputClassName("message")} h-50 resize-none`}
                onChange={handleInputChange}
                onBlur={handleBlur}
              />
              <div id="contact-message-help" className="flex items-center justify-between gap-3">
                {errors.message && touched.message ? (
                  <p className="text-sm text-red-400">{errors.message}</p>
                ) : null}
                <p className="ml-auto text-sm text-white/50">{messageLength}/1000</p>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#3B82F6] px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#2563EB] focus-visible:outline-blue-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send message"}
              {!loading && <ArrowUpRight size={17} aria-hidden="true" />}
            </button>

            {submitError && (
              <p role="alert" className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-400">{submitError}</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
