import React from "react";
import BgVideo from "../assets/hero-bg-vid.webm";
import BlurText from "./BlurText";

const Hero = () => {
  return (
    <div className="relative h-[90vh] md:h-screen w-full overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-[100vh] object-cover brightness-100"
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
      {/* <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-900/40 via-black/40 to-black"></div> */}

      {/* Content */}
      <div className="relative h-full w-full ">
        <div className="flex flex-col items-center justify-center h-full text-white text-center px-1">
          {/* <div className="flex items-center justify-around gap-2 mb-6 font-sans-medium text-[12px] md:text-[16px] rounded-xl px-2 py-2 bg-white/8 backdrop-blur-lg border border-white/20 text-white/80">
            <div className="bg-[#3B82F6] rounded-sm text-[10px] md:text-[12px] flex items-center justify-center">
              <p className="px-2 py-1 font-sans-bold text-center">NO. 1</p>
            </div>
            <p className="font-sans-regular">AI-Powered Web Agency</p>
          </div> */}
          {/* Badge */}
          <div className="mb-6 rounded-full p-px bg-gradient-to-r from-blue-500/70 via-white/20 to-cyan-400/60 shadow-[0_0_30px_-6px_rgba(59,130,246,0.6)]">
            <div className="flex items-center gap-3 rounded-full bg-[#080b18]/80 backdrop-blur-xl pl-3 pr-5 py-1.5 text-[12px] md:text-[14px]">
              {/* Pulsing dot */}
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
              </span>

              <span className="font-sans-regular tracking-wide text-white/80">
                AI-Powered Web Agency
              </span>

            </div>
          </div>
          <BlurText
            text="Run Your Business on Autopilot with AI That Works 24/7"
            delay={50}
            animateBy="words"
            direction="top"
            className="text-[40px] md:text-[85px] leading-tight px-3 md:w-4/5 font-sans-medium mb-4"
          />
          <BlurText
            text=" From answering calls to automating daily tasks, we help your business run smoothly with custom AI systems and websites that convert, helping you save time, cut costs, and grow faster."
            delay={55}
            animateBy="words"
            direction="top"
            className="text-md md:text-lg text-white/70  w-4/5 md:w-2/5 mb-8 md:mb-12 text-center mx-auto"
          />

          {/* <div className="flex gap-4 md:gap-5 text-sm md:text-md z-30">
            <div className="relative inline-flex  group">
              <div className="absolute  -inset-px bg-[#3b83f6b6] rounded-xl blur-sm group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>

              <a
                href="https://cal.com/pradeep-srinivasan/free-strategy-call"
                className="z-1 bg-[#3b83f6d8] hover:opacity-75 transition-all duration-700 cursor-pointer text-md md:text-lg text-white font-sans-medium px-6 py-3 rounded-lg shadow-lg"
              >
                Book a 15-min call
              </a>
            </div>
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
              className="bg-white hover:opacity-75 transition-all duration-700 cursor-pointer text-black text-md md:text-lg px-6 py-3 font-sans-medium rounded-lg shadow-lg"
            >
              View Works
            </a>
          </div> */}
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 z-30">
            {/* Primary CTA */}
            <div className="group relative inline-flex">
              {/* Ambient glow */}
              <div className="absolute -inset-1 rounded-full bg-blue-500/40 blur-lg opacity-60 transition-all duration-500 group-hover:opacity-100 group-hover:-inset-1.5" />

              <a
                href="https://cal.com/pradeep-srinivasan/free-strategy-call"
                className="relative inline-flex items-center gap-2 overflow-hidden rounded-2xl px-6 py-3 md:px-7 md:py-3.5 text-sm md:text-lg font-sans-medium text-white
        bg-gradient-to-b from-blue-400 to-blue-600
        shadow-[inset_0_1px_0_0_rgba(255,255,255,0.35),0_8px_24px_-8px_rgba(59,130,246,0.8)]
        transition-all duration-300 ease-out
        hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.45),0_12px_32px_-6px_rgba(59,130,246,0.95)]
        active:translate-y-0 active:scale-95 motion-reduce:transition-none"
              >
                {/* Shimmer sweep */}
                <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />

                <span className="relative">Book a 15-min call</span>
                <svg
                  className="relative h-4 w-4 md:h-5 md:w-5 transition-transform duration-300 group-hover:translate-x-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </div>

            {/* Secondary CTA: glass, fills white on hover */}
            <a
              href="#works"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById("works");
                if (el) {
                  const y = el.getBoundingClientRect().top + window.pageYOffset - 100;
                  window.scrollTo({ top: y, behavior: "smooth" });
                }
              }}
              className="group inline-flex cursor-pointer items-center gap-2 rounded-2xl px-6 py-3 md:px-7 md:py-3.5 text-sm md:text-lg font-sans-medium text-white
      bg-white/10 backdrop-blur-md border border-white/20
      shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)]
      transition-all duration-300 ease-out
      hover:-translate-y-0.5 hover:bg-white hover:text-black hover:border-white
      active:translate-y-0 active:scale-95 motion-reduce:transition-none"
            >
              View Works
              <svg
                className="h-4 w-4 md:h-5 md:w-5 transition-transform duration-300 group-hover:translate-y-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5v14M6 13l6 6 6-6" />
              </svg>
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
