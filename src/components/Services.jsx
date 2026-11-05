import React from "react";
import WebDev from "../assets/web-dev.png";
import UiUx from "../assets/uiux.webp";
import ChatBot from "../assets/chat-bot.webp";
import VoiceAi from "../assets/voice-ai.png";
import Automation from "../assets/automation.jpg";
import BlurText from "./BlurText";
import SpotlightCard from "./SpotlightCard";

const IMAGE_OUTLINE = {
  outline: "1px solid rgba(0,0,0,0.08)",
  outlineOffset: "-1px",
};

const services = [
  {
    title: "AI Voice Receptionist & Appointment Booking Agent",
    body: "Missed calls mean missed revenue. Our AI voice receptionists answer in real time, respond to FAQs, schedule or manage appointments, and transfer important calls to your team. Available 24/7, they help you save time, cut costs, and turn more callers into paying customers.",
    image: VoiceAi,
    alt: "AI voice receptionist answering business calls 24/7",
    featured: true,
  },
  {
    title: "Web Development",
    body: "We build modern, responsive websites that look great and drive results, helping your business stand out and grow online.",
    image: WebDev,
    alt: "Custom web development and high-converting website design",
  },
  {
    title: "UI/UX Design",
    body: "We specialize in providing top-notch UI/UX design services aimed at creating intuitive and engaging user experiences.",
    image: UiUx,
    alt: "UI/UX design services for intuitive digital experiences",
  },
  {
    title: "AI Chatbots",
    body: "Boost engagement with AI-powered chatbots that deliver fast, personalized responses 24/7. They handle FAQs, guide visitors to the right services, and capture leads, turning every conversation into a conversion.",
    image: ChatBot,
    alt: "AI chatbot for business lead capture and customer engagement",
  },
  {
    title: "AI Workflow Automation",
    body: "Streamline your operations with n8n workflow automation that saves time, reduces costs, and boosts efficiency. From repetitive tasks to smart workflows, our solutions help your business run smoothly and scale faster.",
    image: Automation,
    alt: "n8n workflow automation for small business operations",
  },
];

const Services = () => {
  return (
    <section id="services" className="px-4 pb-20 md:pb-28">
      <div className="max-w-7xl mx-auto text-neutral-900">
        <div className="rounded-full px-4 py-1.5 bg-black/5 border border-black/10 w-fit flex items-center justify-center mx-auto mt-16 md:mt-24">
          <p className="text-sm text-center font-medium">Our Services</p>
        </div>

        <div className="mt-6">
          <BlurText
            text=" We Don't Just Build Websites."
            delay={50}
            animateBy="words"
            direction="top"
            className="text-center text-3xl md:text-5xl text-neutral-900 px-5 leading-tight pt-5 mx-auto mt-5"
          />
          <BlurText
            text="We build AI systems that drive your growth."
            delay={50}
            animateBy="words"
            direction="top"
            className="text-center text-3xl md:text-5xl text-neutral-500 px-5 leading-tight pb-5 mx-auto"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mt-12 md:mt-16 items-stretch">
          {services.map((service) => (
            <SpotlightCard
              key={service.title}
              className={`flex flex-col ${service.featured ? "md:col-span-2" : ""}`}
              spotlightColor="rgba(59, 130, 246, 0.14)"
            >
              <div
                className={`relative w-full overflow-hidden rounded-2xl bg-neutral-100 ${
                  service.featured ? "min-h-[240px] lg:min-h-[300px]" : "min-h-[200px]"
                } flex-1`}
              >
                <img
                  src={service.image}
                  alt={service.alt}
                  loading="lazy"
                  style={IMAGE_OUTLINE}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
              </div>
              <h3
                className={`mt-5 font-semibold text-neutral-900 ${
                  service.featured ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"
                }`}
              >
                {service.title}
              </h3>
              <p className="mt-2 text-sm md:text-base leading-relaxed text-neutral-600">
                {service.body}
              </p>
              {service.featured && (
                <div className="mt-6">
                  <a
                    href="https://cal.com/pradeep-srinivasan/free-strategy-call"
                    className="inline-flex items-center justify-center rounded-lg bg-[#3B82F6] px-6 py-3 text-sm md:text-base font-medium text-white transition-colors hover:bg-[#2563EB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6]"
                  >
                    Book an appointment
                  </a>
                </div>
              )}
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
