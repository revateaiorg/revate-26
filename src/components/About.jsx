
import React from "react";
import Automation from "../assets/automation.jpg";
import SectionHeading from "./SectionHeading";

const cards = [
  {
    label: "Clarity from the Start",
    lead: "A clear reason for every build.",
    body: "We map your workflow and agree on priorities before choosing the technology. You know what we are building and why.",
    background: "bg-[#F3EDE6]",
    labelColor: "text-[#79634E]",
  },
  {
    label: "Made for Your Business",
    lead: "Your workflow comes first.",
    body: "Your tools, team, and customer experience shape the solution. We choose integrations around how your business actually works.",
    background: "bg-[#EAE7F0]",
    labelColor: "text-[#6C6080]",
  },
  {
    label: "Tested with Real Scenarios",
    lead: "Confidence before launch.",
    body: "We evaluate responses, workflow behaviour, and handoffs against agreed criteria, so you can review how the system performs.",
    image: Automation,
    span: "md:col-span-2 lg:col-span-2",
    labelColor: "text-white/80",
  },
  {
    label: "People Stay in Control",
    lead: "Automation with a human handoff.",
    body: "We define what the system should handle and when your team should step in. Clear boundaries keep your customers connected to the right help.",
    background: "bg-[#E8E9E8]",
    labelColor: "text-[#626766]",
    span: "md:col-span-2 lg:col-span-1",
  },
];

const WhyChooseCard = ({ card }) => {
  const isImageCard = Boolean(card.image);

  return (
    <div
      className={`
        group relative flex min-h-[300px] flex-col
        overflow-hidden rounded-3xl p-7 md:p-8
        lg:min-h-[340px]
        border border-black/[0.035]
        transition-all duration-500 ease-out
        hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(40,30,20,0.08)]
        ${isImageCard ? "" : card.background}
        ${card.span ?? ""}
      `}
    >
      {isImageCard && (
        <>
          <img
            src={card.image}
            alt="AI automation technology"
            loading="lazy"
            className="
              absolute inset-0 h-full w-full
              object-cover
              transition-transform duration-700
              group-hover:scale-105
            "
          />

          <div className="
            absolute inset-0
            bg-gradient-to-t
            from-[#211D1B]/90 via-[#211D1B]/45 to-[#211D1B]/15
          " />
        </>
      )}

      <div className="relative z-10 flex flex-1 flex-col">

        <p className={`
          text-lg md:text-xl
          font-semibold tracking-tight
          ${card.labelColor}
        `}>
          {card.label}
        </p>

        <div className="mt-auto pt-12">
          <h3 className={`
            max-w-xl
            text-2xl md:text-3xl
            font-semibold tracking-tight leading-tight
            ${isImageCard ? "text-white" : "text-[#292522]"}
          `}>
            {card.lead}
          </h3>

          <p className={`
            mt-3 max-w-lg
            text-sm md:text-base
            leading-relaxed
            ${isImageCard ? "text-white/80" : "text-[#716A64]"}
          `}>
            {card.body}
          </p>
        </div>
      </div>
    </div>
  );
};

const About = () => {
  return (
    <section
      id="about"
      className="pb-14 pt-16 font-content min-[600px]:pt-20 min-[900px]:pt-28"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-6">

        <div className="
          grid grid-cols-1
          items-stretch
          gap-5 md:grid-cols-2 lg:grid-cols-3
          md:gap-6
        ">

          {/* Section heading */}
          <div className="flex flex-col justify-between py-2 md:py-4">
            <SectionHeading compact label="Why choose Revate AI?" title="Built on understanding." accent="Made to earn your trust." description="Useful technology starts with your business. We focus on clear scope, connected tools, and systems your team can actually use." />
          </div>

          {cards.map((card) => (
            <WhyChooseCard
              key={card.label}
              card={card}
            />
          ))}

        </div>
      </div>
    </section>
  );
};

export default About;