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
    link: "https://21gramfilms.com/",
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

function ProjectCard({ p }) {
  return (
    // opaque base so cards behind don't show through the translucent card
    <div className="w-full rounded-3xl bg-black">
      <div
        className={`w-full backdrop-blur-xl border border-gray-900 bg-white/5 rounded-3xl flex flex-col md:flex-row justify-between items-center ${p.tight ? "px-2 py-4 md:px-4 md:py-5" : "px-4 py-5"
          } space-y-4 md:space-y-0 md:space-x-4`}
      >
        {/* Image Section */}
        <div
          className="rounded-3xl w-full md:w-2/5 h-48 md:h-[55vh] border border-gray-900 bg-cover bg-center"
          style={{ backgroundImage: `url(${p.image})` }}
        ></div>

        {/* Content Section */}
        <div
          className={`relative w-full md:w-3/5 border border-gray-900 bg-white/5 rounded-3xl ${p.tight ? "p-4 md:p-5" : "p-5"
            } flex flex-col justify-between h-auto md:h-[55vh]`}
        >
          <div className="space-y-4">
            <div className="rounded-lg px-3 py-1 bg-[#3B82F6] backdrop-blur-lg border border-blue-500/20 w-fit">
              <h1 className="text-sm md:text-md font-medium">{p.year}</h1>
            </div>

            <h1 className="text-2xl md:text-4xl font-semibold">{p.title}</h1>

            <p className="text-sm md:text-md xl:text-lg text-white/70">
              {p.desc}
            </p>

            {p.link && (
              <div>
                <a
                  href={p.link}
                  className="w-fit px-3 py-1 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition-all duration-300 flex items-center gap-1"
                >
                  Visit Site <ArrowUpRight className="inline" />
                </a>
              </div>
            )}
          </div>

          {p.audio && (
            <div className="h-12 w-full my-5 md:my-0 rounded-xl ">
              <AudioPlayer audioSrc={p.audio} />
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-3 mt-4">
            {p.tags.map((t) => (
              <div
                key={t}
                className="rounded-lg px-3 py-1 backdrop-blur-lg border border-gray-800 w-fit"
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
            start: "top top",
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

          // new card slides up from the bottom of the screen
          tl.fromTo(
            card,
            { y: () => window.innerHeight },
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
        <div className="rounded-lg px-4 py-1 bg-white/8 backdrop-blur-lg border border-blue-500/20 w-fit flex items-center justify-center mx-auto mt-10">
          <h2 className="text-md text-center font-medium">Our Works</h2>
        </div>
        <div>
          <BlurText
            text="Work That Speaks for Itself."
            delay={50}
            animateBy="words"
            direction="top"
            className="text-center text-2xl md:text-5xl text-white px-5 md:w-4/5 leading-tight pt-5 mx-auto mt-5"
          />
          <BlurText
            text="Backed by strategy. Driven by outcomes."
            delay={50}
            animateBy="words"
            direction="top"
            className="text-center text-2xl md:text-5xl text-white/70 px-5 md:w-4/5 leading-tight pb-5 mx-auto "
          />
        </div>

        {/* This whole block is what gets pinned on desktop (full screen, below the navbar) */}
        <div
          ref={stackRef}
          className="px-3 md:px-20 lg:px-32 mt-10 md:mt-0 md:h-screen md:pt-28 md:overflow-hidden"
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