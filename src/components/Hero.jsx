import React from "react";
import Navbar from "./Navbar";
import BgVideo from "../assets/hero-bg-vid.webm";
import BlurText from "./BlurText";

const Hero = () => {
  return (
    <div className="relative h-[90vh] md:h-screen w-full overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-[100vh] object-cover grayscale brightness-75"
        src={BgVideo}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        title="Background abstract video"
      />

      {/* Dark Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-900/40 via-black/40 to-black"></div>

      {/* Content */}
      <div className="relative h-full w-full ">
        <Navbar />

        <div className="flex flex-col items-center justify-center h-full text-white text-center px-1">
          <div className="flex items-center justify-around gap-2 mb-6 font-sans-medium text-[12px] md:text-[16px] rounded-xl px-2 py-2 bg-white/8 backdrop-blur-lg border border-white/20 text-white/80">
            <div className="bg-[#3B82F6] rounded-sm text-[10px] md:text-[12px] flex items-center justify-center">
              <p className="px-2 py-1 font-sans-bold text-center">NO. 1</p>
            </div>
            <p className="font-sans-regular">AI-Powered Web Agency</p>
          </div>

          <h1 className="text-[40px] md:text-[85px] leading-tight px-3 md:w-4/5 font-sans-medium mb-4">
            Run Your Business on Autopilot with AI That Works 24/7
          </h1>
          <BlurText
            text=" From answering calls to automating daily tasks, we help your business run smoothly with custom AI systems and websites that convert, helping you save time, cut costs, and grow faster."
            delay={50}
            animateBy="words"
            direction="top"
            className="text-md md:text-lg text-white/70  w-4/5 md:w-2/5 mb-8 text-center mx-auto"
          />
          {/* <p className="text-sm md:text-lg text-white/70 w-4/5 md:w-2/5 mb-8">
            Boosting your business growth with intelligent websites and AI
            automations that maximize efficiency and profitability.
          </p> */}

          <div className="flex gap-4 md:gap-5 text-sm md:text-md z-30">
            <a
              href="https://cal.com/pradeep-srinivasan/free-strategy-call"
              className="bg-white hover:opacity-75 transition-all duration-700 cursor-pointer text-black font-sans-medium px-6 py-3 rounded-lg shadow-lg"
            >
              Get Started
            </a>
            <a
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById("works");
                if (el) {
                  const y =
                    el.getBoundingClientRect().top + window.pageYOffset - 100;
                  window.scrollTo({ top: y, behavior: "smooth" });
                }
              }}
              className="bg-white/30 hover:opacity-75 transition-all duration-700 cursor-pointer text-white px-6 py-3 rounded-lg shadow-lg"
            >
              View Works
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Fade Effect */}
      <div className="absolute bottom-[-10px] left-0 w-full h-64 bg-gradient-to-b from-transparent to-black pointer-events-none z-20"></div>
    </div>
  );
};

export default Hero;
