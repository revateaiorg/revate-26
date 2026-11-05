
import React from "react";
import Automation from "../assets/automation.jpg";

const cards = [
  {
    label: "Intelligent by Design",
    lead: "Smarter Business Starts Here.",
    body: "We bring AI into everyday business operations, helping you work faster, make better decisions, and simplify complex tasks.",
    background: "bg-[#F3EDE6]",
    labelColor: "text-[#79634E]",
  },
  {
    label: "Made for Your Business",
    lead: "Technology That Fits.",
    body: "From custom websites to intelligent systems, every solution is designed around your unique business goals.",
    background: "bg-[#EAE7F0]",
    labelColor: "text-[#6C6080]",
  },
  {
    label: "Automation That Works",
    lead: "Less Manual Work. More Possibilities.",
    body: "From AI voice receptionists to connected workflows, we automate repetitive tasks and keep your business running smoothly.",
    image: Automation,
    span: "md:col-span-2 lg:col-span-2",
    labelColor: "text-white/80",
  },
  {
    label: "Built to Scale",
    lead: "Ready for What's Next.",
    body: "We build scalable digital experiences and automation systems that grow alongside your business.",
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
      className="pt-36 pb-24 md:pt-44 md:pb-32 lg:pt-48"
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
            <h2 className="
              max-w-md
              text-4xl md:text-5xl lg:text-6xl
              font-semibold tracking-tight
              leading-[1.05]
              text-[#292522]
            ">
              Why choose Revate{" "}
              <span className="text-[#3B82F6]">
                AI?
              </span>
            </h2>

            <p className="
              mt-6 max-w-sm
              text-base leading-relaxed
              text-[#716A64]
            ">
              We combine intelligent automation and
              thoughtful technology to make your
              business faster, smarter, and simpler.
            </p>
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