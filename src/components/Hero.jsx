
import React from "react";
import {
  motion as Motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

import BlurText from "./BlurText";
import ShaderBackground from "./ShaderBackground";

const GRAIN_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncR type='linear' slope='1.8' intercept='-0.4'/%3E%3CfeFuncG type='linear' slope='1.8' intercept='-0.4'/%3E%3CfeFuncB type='linear' slope='1.8' intercept='-0.4'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const Hero = () => {
  const shouldReduceMotion = useReducedMotion();

  // Scroll animations
  const { scrollY } = useScroll();

  // Background zoom effect
  const backgroundScale = useTransform(
    scrollY,
    [0, 700],
    [1, 1.08]
  );

  // Content movement
  const contentY = useTransform(
    scrollY,
    [0, 600],
    [0, 90]
  );

  // Content fade effect
  const contentOpacity = useTransform(
    scrollY,
    [0, 500],
    [1, 0.35]
  );

  return (
    <section className="relative isolate h-[90vh] md:h-screen w-full overflow-hidden bg-black">

      {/* Grain animation styles */}
      <style>{`
        @keyframes grain-shift {
          0%, 100% { background-position: 0 0; }
          20% { background-position: -40px 30px; }
          40% { background-position: 60px -50px; }
          60% { background-position: -70px -20px; }
          80% { background-position: 30px 60px; }
        }

        .hero-grain {
          animation: grain-shift 0.8s steps(1) infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-grain {
            animation: none;
          }
        }
      `}</style>

      {/* Shader Background with Scroll Zoom */}
      <Motion.div
        style={
          shouldReduceMotion
            ? undefined
            : { scale: backgroundScale }
        }
        className="absolute inset-0 -z-20"
      >
        <ShaderBackground className="absolute inset-0 h-full w-full" />
      </Motion.div>

      {/* Dark Overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-black/35"
      />

      {/* Radial Overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.35)_0%,transparent_70%)]"
      />

      {/* Grain Overlay */}
      <div
        aria-hidden="true"
        className="hero-grain pointer-events-none absolute -inset-20 -z-10 opacity-[0.6] mix-blend-overlay"
        style={{
          backgroundImage: GRAIN_SVG,
          backgroundSize: "220px 220px",
        }}
      />

      {/* Main Content with Scroll Animation */}
      <Motion.div
        style={
          shouldReduceMotion
            ? undefined
            : {
                y: contentY,
                opacity: contentOpacity,
              }
        }
        className="relative h-full w-full"
      >
        <div className="flex h-full flex-col items-center justify-center px-1 text-center text-white">

          {/* Badge */}
          <div className="mb-6 rounded-full bg-gradient-to-r from-blue-500/70 via-white/20 to-cyan-400/60 p-px shadow-[0_0_30px_-6px_rgba(59,130,246,0.6)] backdrop-blur-xl">
            <div className="flex items-center gap-3 rounded-full bg-black/60 py-1.5 pl-3 pr-5 text-[12px] md:text-[14px]">

              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
              </span>

              <span className="font-sans-regular tracking-wide text-white/80">
                AI-Powered Web Agency
              </span>
            </div>
          </div>

          {/* Heading */}
          <BlurText
            text="Run Your Business on Autopilot with AI That Works 24/7"
            delay={50}
            animateBy="words"
            direction="top"
            className="mb-4 px-3 text-[40px] font-sans-medium leading-tight md:w-4/5 md:text-[85px]"
          />

          {/* Description */}
          <BlurText
            text="From answering calls to automating daily tasks, we help your business run smoothly with custom AI systems and websites that convert, helping you save time, cut costs, and grow faster."
            delay={55}
            animateBy="words"
            direction="top"
            className="mx-auto mb-8 w-4/5 text-center text-md text-white/70 md:mb-12 md:w-2/5 md:text-lg"
          />

          {/* CTA Buttons */}
          <div className="z-30 flex flex-wrap items-center justify-center gap-3 text-sm md:gap-4 md:text-lg">

            {/* Primary CTA */}
            <div className="group relative inline-flex">

              {/* Ambient Glow */}
              <div className="absolute -inset-1 rounded-full bg-blue-500/40 opacity-60 blur-lg transition-all duration-500 group-hover:-inset-1.5 group-hover:opacity-100" />

              <a
                href="https://cal.com/pradeep-srinivasan/free-strategy-call"
                target="_blank"
                rel="noreferrer"
                className="relative inline-flex items-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-b from-blue-400 to-blue-600 px-6 py-3 font-sans-medium text-sm text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.35),0_8px_24px_-8px_rgba(59,130,246,0.8)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.45),0_12px_32px_-6px_rgba(59,130,246,0.95)] active:translate-y-0 active:scale-95 motion-reduce:transition-none md:px-7 md:py-3.5 md:text-lg"
              >

                {/* Shimmer Sweep */}
                <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />

                <span className="relative">
                  Book a 15-min call
                </span>

                <svg
                  className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 md:h-5 md:w-5"
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

            {/* Secondary CTA */}
            <a
              href="#works"
              onClick={(e) => {
                e.preventDefault();

                const el = document.getElementById("works");

                if (el) {
                  const y =
                    el.getBoundingClientRect().top +
                    window.pageYOffset -
                    100;

                  window.scrollTo({
                    top: y,
                    behavior: "smooth",
                  });
                }
              }}
              className="group inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-6 py-3 font-sans-medium text-sm text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-black active:translate-y-0 active:scale-95 motion-reduce:transition-none md:px-7 md:py-3.5 md:text-lg"
            >
              View Works

              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1 md:h-5 md:w-5"
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
      </Motion.div>

      {/* Bottom Fade Effect */}
      <div className="pointer-events-none absolute bottom-[-10px] left-0 z-20 h-64 w-full bg-gradient-to-b from-transparent to-black" />

    </section>
  );
};

export default Hero;