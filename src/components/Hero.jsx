import React from "react";
import BlurText from "./BlurText";
import ShaderBackground from "./ShaderBackground";

const GRAIN_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncR type='linear' slope='1.8' intercept='-0.4'/%3E%3CfeFuncG type='linear' slope='1.8' intercept='-0.4'/%3E%3CfeFuncB type='linear' slope='1.8' intercept='-0.4'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const Hero = () => {
  return (
    <div className="relative h-[90vh] md:h-screen w-full overflow-hidden bg-black">
      {/* Grain animation styles */}
      <style>{`
        @keyframes grain-shift {
          0%, 100% { background-position: 0 0; }
          20% { background-position: -40px 30px; }
          40% { background-position: 60px -50px; }
          60% { background-position: -70px -20px; }
          80% { background-position: 30px 60px; }
        }
        .hero-grain { animation: grain-shift 0.8s steps(1) infinite; }
        @media (prefers-reduced-motion: reduce) {
          .hero-grain { animation: none; }
        }
      `}</style>

      {/* Shader background */}
      <ShaderBackground className="absolute inset-0 h-full w-full" />

      {/* Dark overlay: dims the shader so the text stays readable */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-black/35"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.35)_0%,transparent_70%)]"
      />

      {/* Grain overlay */}
      <div
        aria-hidden="true"
        className="hero-grain pointer-events-none absolute -inset-20 opacity-[0.6] mix-blend-overlay"
        style={{
          backgroundImage: GRAIN_SVG,
          backgroundSize: "220px 220px",
        }}
      />

      {/* Content */}
      <div className="relative h-full w-full ">
        <div className="flex flex-col items-center justify-center h-full text-white text-center px-1">
          {/* Badge */}
          <div className="mb-6 rounded-full p-px bg-gradient-to-r backdrop-blur-xl from-blue-500/70 via-white/20 to-cyan-400/60 shadow-[0_0_30px_-6px_rgba(59,130,246,0.6)]">
            <div className="flex items-center gap-3 rounded-full bg-black/60  pl-3 pr-5 py-1.5 text-[12px] md:text-[14px]">
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
                  const y =
                    el.getBoundingClientRect().top + window.pageYOffset - 100;
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