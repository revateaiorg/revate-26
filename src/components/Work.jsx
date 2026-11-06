import React, { useLayoutEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LotFerox from "../assets/LotFerox.png";
import Quickidz from "../assets/quickidz.webp";
import TwentyOneGram from "../assets/21gram.webp";
import BlurText from "./BlurText";
import SilverStream from "../assets/SSP.png";
import { AudioPlayer } from "./AudioPlayer";
import SSPA from "../assets/audio/recording.wav";
import SectionHeading from "./SectionHeading";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    year: "2026",
    title: "Quickidz",
    image: Quickidz,
    link: "https://www.quickidz.in/",
    desc: "Designed and developed a conversion-focused landing page that uses storytelling to connect with parents, highlight key challenges in children's physical development, and guide visitors toward booking a free demo class. Beyond the website, built a custom management system to streamline lead bookings, client management, revenue tracking, staff management, and real-time business insights through a centralized dashboard.",
    tags: ["Web Development", "CMS"],
  },
  {
    year: "2026",
    title: "LotFerox Nuts",
    image: LotFerox,
    link: "https://lotferoxnuts.com/",
    desc: "Designed and developed a premium, visually immersive website for LotFerox Nuts, showcasing its range of flavoured makhana and fox nut products. Built an engaging storytelling experience that takes visitors through the brand's product flavours, health benefits, sourcing, and production process, combining rich product imagery, elegant typography, interactive elements, and a distinctive black-and-gold aesthetic to create a memorable brand experience.",
    tags: ["Web Development", "CMS"],
  },
  {
    year: "2026",
    title: "21 Gram Films",
    image: TwentyOneGram,
    link: "https://21-gram-films.vercel.app/",
    desc: "Designed and developed a visually immersive, interactive landing page that showcases 21 Gram Films' short-form video production, reel shoots, and marketing services. Featuring bold visual storytelling, engaging media, and a premium dark aesthetic with vibrant green accents, the website highlights the agency's creative portfolio while making its services easy to explore and its contact journey seamless.",
    tags: ["Landing Page", "CMS"],
  },
  {
    year: "2025",
    title: "Silver Stream Plumbing",
    image: SilverStream,
    audio: SSPA,
    tight: true,
    desc: "A custom AI Voice Receptionist for Silver Stream Plumbing answers calls 24/7, handles FAQs, manages bookings, and forwards inquiries instantly to the owner. It also detects emergencies, logs key details, and connects callers to staff immediately. With no missed calls and every lead captured, the company saved labor costs and saw a clear increase in revenue and ROI.",
    tags: ["AI Voice Receptionist", "AI Automation"],
  },
];

// How far (px) each stacked card peeks out below the one in front of it
const OFFSET = 30;
// Height of one card on desktop: 55vh image/content + card padding/border
const CARD_H = "calc(55vh + 42px)";
// Space (px) between the top of the screen and the pinned card (navbar clearance).
// Increase if the card touches your navbar when pinned, decrease for less space.
const PIN_TOP = 120;

const grain = `url("data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>`
)}")`;

function ProjectCard({ p }) {
  return (
    <div
      className="bg-black relative isolate w-full overflow-hidden rounded-3xl ring-1 ring-inset ring-blue-400/15"
      style={{
        boxShadow:
          "0 30px 20px -35px rgba(37,99,235,0.55), inset 0 1px 0 rgba(255,255,255,0.10)",
      }}
    >
      {/* film grain */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.10] mix-blend-overlay"
        style={{ backgroundImage: grain }}
      />

      <div
        className={`relative w-full rounded-3xl border border-white/10 flex flex-col md:flex-row justify-between items-center ${p.tight ? "px-2 py-4 md:px-4 md:py-5" : "px-4 py-5"
          } space-y-4 md:space-y-0 md:space-x-4`}
      >
        {/* Image Section */}
        <div
          className="relative w-full md:w-2/5 h-48 md:h-[55vh] overflow-hidden rounded-3xl border border-white/10 bg-cover bg-center shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)]"
          style={{ backgroundImage: `url(${p.image})` }}
        >
          {/* soft blue-black fade at the bottom + glass edge */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#070C1F]/55 via-transparent to-transparent" />
          <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10" />
        </div>

        {/* Content Section */}
        <div
          className={`relative w-full md:w-3/5 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] shadow-[inset_0_1px_0_rgba(255,255,255,0.10)] ${p.tight ? "p-4 md:p-5" : "p-5"
            } flex flex-col justify-between h-auto md:h-[55vh]`}
        >
          {/* blue glow in the corner of the panel */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 size-64 rounded-full bg-blue-500/20 blur-3xl"
          />

          <div className="relative space-y-4">
            <div className="flex w-fit items-center gap-2 rounded-lg border border-blue-300/30 bg-gradient-to-b from-[#3B82F6] to-[#2563EB] px-3 py-1 shadow-[0_0_20px_rgba(59,130,246,0.45)]">
              <span className="size-1.5 rounded-full bg-white/90" />
              <h1 className="text-sm md:text-md font-medium">{p.year}</h1>
            </div>

            <h1 className="bg-gradient-to-b from-white to-blue-100/70 bg-clip-text text-2xl font-semibold text-transparent md:text-4xl">
              {p.title}
            </h1>

            <p className="text-sm md:text-md xl:text-lg text-white/65">
              {p.desc}
            </p>

            {p.link && (
              <div>
                <a
                  href={p.link}
                  target="_blank"
                  className="group/btn relative flex w-fit items-center gap-1.5 rounded-lg bg-[#3B82F6] px-4 py-1.5 font-medium text-white shadow-[0_0_24px_rgba(59,130,246,0.5)] transition-all duration-300 hover:bg-[#2563EB] hover:shadow-[0_0_34px_rgba(59,130,246,0.75)]"
                >
                  Visit Site
                  <ArrowUpRight className="inline transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
                </a>
              </div>
            )}
          </div>

          {p.audio && (
            <div className="relative h-12 w-full my-5 md:my-0 rounded-xl">
              <AudioPlayer audioSrc={p.audio} />
            </div>
          )}

          {/* Tags */}
          <div className="relative mt-4 flex flex-wrap gap-3">
            {p.tags.map((t) => (
              <div
                key={t}
                className="w-fit rounded-lg border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-blue-100/90 backdrop-blur-lg"
              >
                <h1 className="text-sm md:text-md font-medium">{t}</h1>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const Work = () => {
  const rootRef = useRef(null);
  const stackRef = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    // Desktop/tablet only, and only if the visitor hasn't asked for reduced motion.
    // On phones the cards simply stack normally (they're taller than the screen).
    mm.add(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
      () => {
        const wrappers = gsap.utils.toArray(".stack-card", rootRef.current);
        const n = wrappers.length;

        // resting position: each card sits OFFSET px lower than the previous one
        gsap.set(wrappers, {
          y: (i) => i * OFFSET,
          transformOrigin: "center top",
        });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: stackRef.current,
            // Pin once the stack's top reaches PIN_TOP px from the top of the screen,
            // so before that the first card scrolls normally with the page.
            start: `top ${PIN_TOP}px`,
            end: () => `+=${window.innerHeight * (n - 1)}`,
            scrub: true,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        wrappers.forEach((card, i) => {
          if (i === 0) return;
          const at = (i - 1) * 1; // each card gets 1 unit of the timeline

          // new card slides up from the bottom edge of the pinned area
          tl.fromTo(
            card,
            { y: () => stackRef.current.offsetHeight },
            { y: i * OFFSET, duration: 1 },
            at
          );

          // every card already in the stack tilts back and shrinks a bit more
          wrappers.slice(0, i).forEach((prev, j) => {
            tl.to(
              prev,
              { scale: 1 - (i - j) * 0.05, rotationX: -6, duration: 1 },
              at
            );
          });
        });

        // short hold at the end so the last card rests before the page scrolls on
        tl.to({}, { duration: 0.3 });
      },
      rootRef
    );

    return () => mm.revert();
  }, []);

  return (
    <section id="works" ref={rootRef}>
      <div className="h-full text-white mt-26 w-full">
        <div className="mx-auto mb-7 w-[calc(100%-10px)] sm:w-[calc(100%-64px)] min-[1024px]:mb-0">
          <SectionHeading
            label="Our Works"
            dark
            title="Work That Delivers."
            accent="Built with Purpose."
            align="center"
            description="A showcase of digital experiences we've crafted, from modern websites to custom applications and intelligent automation systems, built to turn ideas into impactful results."
          />
        </div>

        {/* Pinned block: no top padding anymore, height = screen minus the pin offset */}
        <div
          ref={stackRef}
          className="px-3 md:px-20 lg:px-32 mt-10 md:mt-6 md:h-[calc(100vh_-_var(--pin-top))] md:overflow-hidden"
          style={{ "--pin-top": `${PIN_TOP}px` }}
        >
          <div
            className="flex flex-col gap-10 md:block md:relative md:h-[var(--stack-h)]"
            style={{
              perspective: 1200,
              "--stack-h": `calc(${CARD_H} + ${OFFSET * (projects.length - 1)}px)`,
            }}
          >
            {projects.map((p) => (
              <div
                key={p.title}
                className="stack-card w-full md:absolute md:inset-x-0 md:top-0"
              >
                <ProjectCard p={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Work;