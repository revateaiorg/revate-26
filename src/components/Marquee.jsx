import React from "react";
import Tbtp from "../assets/tbtp.webp";
import interior from "../assets/interior.webp";
import Travista from "../assets/travista.webp";
import Kisi from "../assets/kisi.webp";
import Zocor from "../assets/zocor.webp";
import Pkm from "../assets/pkm.webp";
import Tksm from "../assets/tksm.webp";

const images = [
  { src: Tbtp, alt: "The Bunny Teeth Photography portfolio" },
  { src: interior, alt: "Interior design website" },
  { src: Kisi, alt: "KISI Fitness Studio website" },
  { src: Zocor, alt: "Zocor project" },
  { src: Travista, alt: "Travista travel platform" },
  { src: Pkm, alt: "PKM Catering Services website" },
  { src: Tksm, alt: "TKSM Charitable Trust website" },
];

const IMAGE_OUTLINE = {
  outline: "1px solid rgba(0,0,0,0.08)",
  outlineOffset: "-1px",
};

const Marquee = () => {
  const renderSet = (setKey) => (
    <div key={setKey} className="flex shrink-0 gap-4 pr-4 md:gap-6 md:pr-6">
      {images.map((image, index) => (
        <div
          key={`${setKey}-${index}`}
          className="group relative h-52 w-52 shrink-0 overflow-hidden rounded-2xl bg-neutral-100 shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_2px_6px_-1px_rgba(0,0,0,0.08),0_12px_24px_-8px_rgba(0,0,0,0.12)] md:h-72 md:w-72"
        >
          <img
            src={image.src}
            alt={image.alt}
            loading="lazy"
            style={IMAGE_OUTLINE}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </div>
      ))}
    </div>
  );

  return (
    <div className="relative mt-12 overflow-hidden md:mt-16">
      <div className="flex w-max animate-marquee motion-reduce:animate-none">
        {renderSet("set-a")}
        {renderSet("set-b")}
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent md:w-40" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent md:w-40" />
    </div>
  );
};

export default Marquee;
