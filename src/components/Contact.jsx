import React, { useRef, useState } from "react";
import BlurText from "./BlurText";
import CountrySelector from "./CountrySelector";
import { Mail, Phone } from "lucide-react";
import emailjs from "@emailjs/browser";
import CurrencySelector from "./CurrencySelector";

const Contact = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState("");
  const [currency, setCurrency] = useState("₹");
  const [success, setSuccess] = useState(false);

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

      case "email_id":
        if (!value.trim()) return "Email is required";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value))
          return "Please enter a valid email address";
        return "";

      case "phone_no":
        if (!value.trim()) return "Mobile number is required";
        const phoneRegex = /^[0-9]{7,15}$/;
        if (!phoneRegex.test(value.replace(/\s/g, "")))
          return "Please enter a valid mobile number (7-15 digits)";
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

    emailjs
      .sendForm(
        "service_4e5gui8", // Replace with your EmailJS service ID
        "template_hp3js8j", // Replace with your EmailJS template ID
        form.current,
        "JGnbr0aqmeyL7Oese" // Replace with your EmailJS Public key
      )
      .then(
        (result) => {
          console.log(result.text);
          setLoading(false);
          setSuccess(true);
          form.current.reset();
          setCountry("");
          setCurrency("");
          setErrors({});
          setTouched({});
        },
        (error) => {
          console.log(error.text);
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

  return (
    <section id="contact">
      <div className="h-full text-white mt-26 w-full px-4">
        {/* Contact Us Button */}
        <div className="rounded-lg px-4 py-1 bg-white/8 backdrop-blur-lg border border-blue-500/20 w-fit flex items-center justify-center mx-auto mt-10">
          <h1 className="text-md text-center font-medium">Contact Us</h1>
        </div>
        <BlurText
          text="Have Any Doubts?"
          delay={50}
          animateBy="words"
          direction="top"
          className="text-center text-2xl md:text-5xl text-white px-5 md:w-4/5 leading-tight pt-5 mx-auto mt-5"
        />
        <BlurText
          text="We are Ready to Help."
          delay={50}
          animateBy="words"
          direction="top"
          className="text-center text-2xl md:text-5xl text-white/70 px-5 md:w-4/5 leading-tight pb-5 mx-auto "
        />

        {/* Heading */}

        {/* Contact Info */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-4">
          <a
            href="tel:+919344240280"
            className="cursor-pointer w-fit flex items-center justify-around gap-2 mb-2 font-sans-medium text-[12px] md:text-[16px] rounded-xl px-3 py-2 bg-white/8 backdrop-blur-lg border border-white/20 text-white/80"
          >
            <div className="bg-[#3B82F6] rounded-sm text-[10px] md:text-[12px] flex items-center justify-center">
              <p className="px-1 py-1 font-sans-bold text-center text-white">
                <Phone className="inline p-1" />
              </p>
            </div>
            <p className="font-sans-regular text-sm md:text-lg">
              +91 9962713368
            </p>
          </a>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=revateaiorg@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer w-fit flex items-center justify-around gap-2 mb-2 font-sans-medium text-[12px] md:text-[16px] rounded-xl px-3 py-2 bg-white/8 backdrop-blur-lg border border-white/20 text-white/80"
          >
            <div className="bg-[#3B82F6] rounded-sm text-[10px] md:text-[12px] flex items-center justify-center">
              <p className="px-1 py-1 font-sans-bold text-center text-white">
                <Mail className="inline p-1" />
              </p>
            </div>
            <p className="font-sans-regular text-sm md:text-lg">
              revateaiorg@gmail.com
            </p>
          </a>
        </div>

        {/* Form Section */}
        <div className="w-full flex items-start justify-center mx-auto mt-5">
          <div className="w-full md:w-4/5 lg:w-3/5 h-full bg-cover rounded-4xl border bg-[#080808] border-white/10 mx-auto relative backdrop:blur-2xl p-2">
            <div className="w-full h-full bg-cover rounded-3xl border bg-[#080808] border-white/10 mx-auto relative backdrop:blur-2xl">
              <form
                ref={form}
                onSubmit={sendEmail}
                className="flex flex-col space-y-6 p-4 md:p-10"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full flex flex-col space-y-2">
                    <h3>
                      First name <span className="text-red-500">*</span>
                    </h3>
                    <input
                      type="text"
                      name="from_name"
                      placeholder="John"
                      className={getInputClassName("from_name")}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                    />
                    {errors.from_name && touched.from_name && (
                      <p className="text-red-400 text-sm">{errors.from_name}</p>
                    )}
                  </div>
                  <div className="w-full flex flex-col space-y-2">
                    <h3>
                      Last name <span className="text-red-500">*</span>
                    </h3>
                    <input
                      type="text"
                      name="last_name"
                      placeholder="Doe"
                      className={getInputClassName("last_name")}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                    />
                    {errors.last_name && touched.last_name && (
                      <p className="text-red-400 text-sm">{errors.last_name}</p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full flex flex-col space-y-2">
                    <h3>
                      Your email <span className="text-red-500">*</span>
                    </h3>
                    <input
                      type="email"
                      name="email_id"
                      placeholder="johndoe@gmail.com"
                      className={getInputClassName("email_id")}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                    />
                    {errors.email_id && touched.email_id && (
                      <p className="text-red-400 text-sm">{errors.email_id}</p>
                    )}
                  </div>
                  <div className="w-full flex flex-col space-y-2">
                    <h3>Where are you from?</h3>
                    <CountrySelector
                      value={country}
                      onChange={handleCountryChange}
                    />
                    {errors.country && touched.country && (
                      <p className="text-red-400 text-sm">{errors.country}</p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full flex flex-col space-y-2">
                    <h3>
                      Mobile Number <span className="text-red-500">*</span>
                    </h3>
                    <input
                      type="text"
                      name="phone_no"
                      placeholder="Enter mobile number (without country code)"
                      className={getInputClassName("phone_no")}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                    />
                    {errors.phone_no && touched.phone_no && (
                      <p className="text-red-400 text-sm">{errors.phone_no}</p>
                    )}
                  </div>
                  <div className="w-full flex flex-col space-y-2">
                    <h3>What's your budget?</h3>
                    <div className="relative flex">
                      <CurrencySelector
                        value={currency}
                        onChange={handleCurrencyChange}
                      />
                      <input
                        type="text"
                        name="budget"
                        placeholder="Enter your budget"
                        className={getInputClassName("budget")}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    {(errors.currency && touched.currency) ||
                      (errors.budget && touched.budget) ? (
                      <p className="text-red-400 text-sm">
                        {(touched.currency && errors.currency) ||
                          (touched.budget && errors.budget)}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="flex flex-col space-y-2">
                  <h3>
                    Message <span className="text-red-500">*</span>
                  </h3>
                  <textarea
                    name="message"
                    placeholder="Type your message here..."
                    className={`${getInputClassName(
                      "message"
                    )} h-32 resize-none`}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                  />
                  <div className="flex justify-between items-center">
                    {errors.message && touched.message && (
                      <p className="text-red-400 text-sm">{errors.message}</p>
                    )}
                    <p className="text-white/50 text-sm ml-auto">
                      {form.current?.message?.value?.length || 0}/1000
                    </p>
                  </div>
                </div>

                <div className="relative w-full mx-auto group">
                  <div className="absolute -inset-0 bg-[#3B82F6] rounded-xl blur-sm group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="cursor-pointer relative w-full inline-flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 duration-200 bg-[#3B82F6] hover:bg-[#2563EB] disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg"
                  >
                    {loading ? "Sending..." : "Submit"}
                  </button>
                </div>

                {success && (
                  <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                    <p className="text-green-400 text-center font-medium">
                      Message Sent Successfully! We'll get back to you soon.
                    </p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
