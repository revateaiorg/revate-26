
import React from "react";
import {
  motion as Motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";

const Hero = () => {
  const shouldReduceMotion = useReducedMotion();

  const { scrollY } = useScroll();
  const videoScale = useTransform(scrollY, [0, 700], [1, 1.08]);
  const contentY = useTransform(scrollY, [0, 600], [0, 90]);
  const contentOpacity = useTransform(scrollY, [0, 500], [1, 0.35]);

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-black text-white">
      {/* Background video */}
      {!shouldReduceMotion && (
        <Motion.div
          style={{ scale: videoScale }}
          className="absolute inset-0 -z-20"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="h-full w-full object-cover opacity-30"
          >
            <source src="/videos/hero-bg.webm" type="video/webm" />
          </video>
        </Motion.div>
      )}

      {/* Background overlays */}
      <div className="absolute inset-0 -z-10 bg-black/70" />

      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.4),rgba(0,0,0,0.92))]" />

      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_45%,rgba(59,130,246,0.16),transparent_55%)]" />

      {/* Main content */}
      <Motion.div
        style={
          shouldReduceMotion
            ? undefined
            : { y: contentY, opacity: contentOpacity }
        }
        className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col items-center justify-center px-6 pb-28 pt-32 text-center sm:px-10 lg:px-16"
      >
        {/* Heading */}
        <h1 className="max-w-5xl text-balance text-[clamp(3.2rem,8vw,7.5rem)] font-semibold leading-[0.98] tracking-[-0.075em]">
          Make your business
          <span className="mt-2 block text-[#3B82F6]">
            work smarter.
          </span>
        </h1>

        {/* Description */}
        <p className="mt-8 max-w-2xl text-pretty text-base leading-8 text-white/60 sm:text-lg">
          We build intelligent digital experiences and automation
          systems that help businesses save time, simplify operations,
          and grow with confidence.
        </p>

        {/* CTA */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="https://cal.com/"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex min-h-14 items-center justify-center gap-5 rounded-full bg-[#3B82F6] px-7 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#2563EB] hover:shadow-[0_8px_40px_rgba(59,130,246,0.25)]"
          >
            Let's talk
            <ArrowUpRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </a>

          <a
            href="#services"
            className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-white/15 px-7 text-sm font-medium text-white/75 transition-all duration-300 hover:border-white/40 hover:text-white"
          >
            Explore services
            <ArrowDown
              size={15}
              className="transition-transform duration-300 group-hover:translate-y-1"
            />
          </a>
        </div>

        {/* Trust points */}
        <div className="mt-20 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-xs font-medium tracking-wide text-white/40 sm:gap-x-12">
          <span>Built around your business</span>
          <span className="hidden h-1 w-1 rounded-full bg-[#3B82F6]/70 sm:block" />
          <span>Designed to scale</span>
          <span className="hidden h-1 w-1 rounded-full bg-[#3B82F6]/70 sm:block" />
          <span>Made for real results</span>
        </div>
      </Motion.div>

      {/* Bottom scroll indicator */}
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-white/35">
        <span className="text-[10px] font-medium uppercase tracking-[0.25em]">
          Scroll to explore
        </span>
        <div className="h-10 w-px overflow-hidden bg-white/10">
          {!shouldReduceMotion && (
            <Motion.div
              animate={{ y: ["-100%", "100%"] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="h-1/2 w-full bg-[#3B82F6]"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;