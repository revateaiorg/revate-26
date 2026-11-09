import React, { useRef, useState } from "react";
import SectionHeading from "./SectionHeading";
import CountrySelector from "./CountrySelector";
import { Mail, Phone } from "lucide-react";
import emailjs from "@emailjs/browser";
import CurrencySelector from "./CurrencySelector";
import Globe from "./Globe";

const Contact = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState("");
  const [currency, setCurrency] = useState("₹");
  const [success, setSuccess] = useState(false);
  const [messageLength, setMessageLength] = useState(0);

  // Form validation state
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Validation rules
  const validateField = (name, value) => {
    switch (name) {
      case "from_name":
        if (!value.trim()) return "First name is required";
        if (value.length < 2) return "First name must be at least 2 characters";
        if (!/^[a-zA-Z\s]+$/.test(value))
          return "First name can only contain letters";
        return "";

      case "last_name":
        if (!value.trim()) return "Last name is required";
        if (value.length < 2) return "Last name must be at least 2 characters";
        if (!/^[a-zA-Z\s]+$/.test(value))
          return "Last name can only contain letters";
        return "";

      case "email_id": {
        if (!value.trim()) return "Email is required";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value))
          return "Please enter a valid email address";
        return "";
      }

      case "phone_no":
        // Phone is optional — only validate format if user typed something
        if (value.trim()) {
          const phoneRegex = /^[0-9]{7,15}$/;
          if (!phoneRegex.test(value.replace(/\s/g, "")))
            return "Please enter a valid mobile number (7-15 digits)";
        }
        return "";

      case "budget":
        // Budget is optional, only validate if value is provided
        if (value.trim() && (isNaN(value) || parseFloat(value) <= 0))
          return "Please enter a valid budget amount";
        return "";

      case "message":
        if (!value.trim()) return "Message is required";
        if (value.length < 10) return "Message must be at least 10 characters";
        if (value.length > 1000)
          return "Message must be less than 1000 characters";
        return "";

      case "country":
        // Country is optional, no validation needed
        return "";

      //   case "currency":
      //     if (!currency) return "Please select currency";
      //     return "";

      default:
        return "";
    }
  };

  // Handle input change with validation
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update touched state
    setTouched((prev) => ({ ...prev, [name]: true }));

    if (name === "message") {
      setMessageLength(value.length);
    }

    // Validate field
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // Handle blur event
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // Handle country selection
  const handleCountryChange = (selectedCountry) => {
    setCountry(selectedCountry);
    setTouched((prev) => ({ ...prev, country: true }));
    const error = validateField("country", selectedCountry);
    setErrors((prev) => ({ ...prev, country: error }));
  };

  // Handle currency selection
  const handleCurrencyChange = (selectedCurrency) => {
    setCurrency(selectedCurrency);
    setTouched((prev) => ({ ...prev, currency: true }));
    const error = validateField("currency", selectedCurrency);
    setErrors((prev) => ({ ...prev, currency: error }));
  };

  // Validate entire form
  const validateForm = () => {
    const formData = new FormData(form.current);
    const newErrors = {};
    let isValid = true;

    // Validate all fields
    const fields = [
      "from_name",
      "last_name",
      "email_id",
      "phone_no",
      "budget",
      "message",
    ];
    fields.forEach((field) => {
      const value = formData.get(field) || "";
      const error = validateField(field, value);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    // Country and currency are optional, no validation needed

    setErrors(newErrors);

    // Mark all fields as touched
    const touchedFields = {};
    fields.forEach((field) => (touchedFields[field] = true));
    touchedFields.country = true;
    touchedFields.currency = true;
    setTouched(touchedFields);

    return isValid;
  };

  const sendEmail = (e) => {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    // Gather form data explicitly so we control exactly what EmailJS receives
    const formData = new FormData(form.current);
    const userEmail = formData.get("email_id") || "";
    const templateParams = {
      from_name: formData.get("from_name") || "",
      last_name: formData.get("last_name") || "",
      email_id: userEmail,
      email: userEmail,
      reply_to: userEmail,
      to_email: userEmail,
      phone_no: formData.get("phone_no") || "Not provided",
      country: formData.get("country") || "Not provided",
      currency: formData.get("currency") || "",
      budget: formData.get("budget") || "Not provided",
      message: formData.get("message") || "",
    };

    const emailjsOptions = { publicKey: "urpLnZFdquq6gQnnm" };

    // Send auto-reply "thank you" to the lead
    // TODO: Add second emailjs.send() for owner notification once template is created
    emailjs.send("service_vnxnr9n", "template_4f39rse", templateParams, emailjsOptions)
      .then(
        () => {
          setLoading(false);
          setSuccess(true);
          form.current.reset();
          setCountry("");
          setCurrency("");
          setErrors({});
          setTouched({});
          setMessageLength(0);
        },
        (error) => {
          console.log("EmailJS error:", error);
          setLoading(false);
          alert("Something went wrong. Try again!");
        }
      );
  };

  // Helper function to get input class names
  const getInputClassName = (fieldName) => {
    const baseClass =
      "border bg-white/4 p-4 w-full rounded-md transition-colors duration-200";
    const hasError = errors[fieldName] && touched[fieldName];
    return hasError
      ? `${baseClass} border-red-500 focus:border-red-500`
      : `${baseClass} border-white/10 focus:border-blue-500/50`;
  };

  const contactLinks = [
    {
      key: "phone",
      href: "tel:+919344240280",
      label: "+91 9962713368",
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
      { name: "from_name", label: "First name", placeholder: "John", required: true },
      { name: "last_name", label: "Last name", placeholder: "Doe", required: true },
    ],
    [
      { name: "email_id", label: "Your email", placeholder: "johndoe@gmail.com", type: "email", required: true },
      { name: "country", label: "Where are you from?", custom: "country" },
    ],
    [
      { name: "phone_no", label: "Mobile Number", placeholder: "Enter mobile number (without country code)" },
      { name: "budget", label: "What's your budget?", placeholder: "Enter your budget", custom: "currency" },
    ],
  ];

  return (
    <section id="contact" className="font-content text-white">
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
        <div className="w-full rounded-3xl border border-white/10 bg-[#080808] p-1.5 sm:p-2">
          <form
            ref={form}
            onSubmit={sendEmail}
            noValidate
            className="flex flex-col space-y-6 p-4 md:p-8"
          >
            {fieldRows.map((row) => (
              <div key={row.map((f) => f.name).join("-")} className="flex flex-col gap-6 min-[1100px]:flex-row">
                {row.map((field) => (
                  <div key={field.name} className="flex w-full flex-col space-y-2">
                    {field.custom ? (
                      <span>
                        {field.label}
                        {field.required ? <span className="text-red-500"> *</span> : null}
                      </span>
                    ) : (
                      <label htmlFor={`contact-${field.name}`}>
                        {field.label} {field.required && <span className="text-red-500">*</span>}
                      </label>
                    )}

                    {field.custom === "country" ? (
                      <CountrySelector value={country} onChange={handleCountryChange} />
                    ) : field.custom === "currency" ? (
                      <div className="relative flex">
                        <CurrencySelector value={currency} onChange={handleCurrencyChange} />
                        <input
                          id={`contact-${field.name}`}
                          type="text"
                          name={field.name}
                          placeholder={field.placeholder}
                          className={getInputClassName(field.name)}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                        />
                      </div>
                    ) : (
                      <input
                        id={`contact-${field.name}`}
                        type={field.type || "text"}
                        name={field.name}
                        placeholder={field.placeholder}
                        className={getInputClassName(field.name)}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                      />
                    )}

                    {errors[field.name] && touched[field.name] && (
                      <p className="text-sm text-red-400">{errors[field.name]}</p>
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
                placeholder="Type your message here..."
                className={`${getInputClassName("message")} h-32 resize-none`}
                onChange={handleInputChange}
                onBlur={handleBlur}
              />
              <div className="flex items-center justify-between gap-3">
                {errors.message && touched.message ? (
                  <p className="text-sm text-red-400">{errors.message}</p>
                ) : null}
                <p className="ml-auto text-sm text-white/50">{messageLength}/1000</p>
              </div>
            </div>

            <div className="relative w-full group">
              <div className="absolute -inset-0 rounded-xl bg-[#3B82F6] blur-sm transition-all group-hover:-inset-1 group-hover:duration-200"></div>
              <button
                type="submit"
                disabled={loading}
                className="relative inline-flex w-full cursor-pointer items-center justify-center rounded-lg bg-[#3B82F6] px-8 py-3 text-white transition-all duration-200 hover:bg-[#2563EB] focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Sending..." : "Submit"}
              </button>
            </div>

            {success && (
              <div className="rounded-lg border border-green-500/30 bg-green-500/20 p-4">
                <p className="text-center font-medium text-green-400">
                  Message Sent Successfully! We'll get back to you soon.
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
