import React from "react";
import Tbtp from "../assets/tbtp.webp";
import interior from "../assets/interior.webp";
import Travista from "../assets/travista.webp";
import Kisi from "../assets/kisi.webp";
import Zocor from "../assets/zocor.webp";
import Pkm from "../assets/pkm.webp";
import Tksm from "../assets/tksm.webp";

const Marquee = () => {
  // Sample images - replace with your actual image URLs
  const images = [Tbtp, interior, Kisi, Zocor, Travista, Pkm, Tksm];
  const imageLabels = [
    "The Bunny Teeth Photography portfolio",
    "Interior design website",
    "KISI Fitness Studio website",
    "Zocor project",
    "Travista travel platform",
    "PKM Catering Services website",
    "TKSM Charitable Trust website",
  ];

  return (
    <div className="pt-8 overflow-hidden mt-10">
      <div className="flex whitespace-nowrap marquee-scroll">
        {/* First set of images */}
        <div className="flex gap-6 md:gap-8 flex-shrink-0">
          {images.map((img, index) => (
            <div
              key={`first-${index}`}
              className="w-60 h-60 md:w-80 md:h-80 bg-white rounded-lg shadow-lg flex-shrink-0 overflow-hidden border-2 border-gray-800 hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={img}
                alt={imageLabels[index]}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
            </div>
          ))}
        </div>

        {/* Duplicate set for seamless loop */}
        <div className="flex gap-6 ml-6 flex-shrink-0">
          {images.map((img, index) => (
            <div
              key={`second-${index}`}
              className="w-80 h-80 bg-white rounded-lg shadow-lg flex-shrink-0 overflow-hidden border-2 border-gray-800 hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={img}
                alt={imageLabels[index]}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
            </div>
          ))}
        </div>

        {/* Third set for extra smoothness */}
        <div className="flex gap-6 ml-6 flex-shrink-0">
          {images.map((img, index) => (
            <div
              key={`third-${index}`}
              className="w-80 h-80 bg-white rounded-lg shadow-lg flex-shrink-0 overflow-hidden border-2 border-gray-800 hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={img}
                alt={imageLabels[index]}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marquee;
