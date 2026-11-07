import React from "react";
import SectionHeading from "./SectionHeading";

/* ------------------------------------------------------------------ */
/*  Animation styles (self-contained, no changes needed in index.css)  */
/* ------------------------------------------------------------------ */
const artCss = `
  .wc-ping { transform-box: fill-box; transform-origin: center; opacity: 0; }
  .wc-orbit { transform-box: view-box; transform-origin: 200px 150px; }

  /* Card 1: route draws itself, nodes ping in sequence */
  .wc-draw  { stroke-dasharray: 100; animation: wc-draw 6s ease-in-out infinite; }
  .wc-ping6 { animation: wc-ping 6s ease-out infinite; }

  /* Card 2: orbits */
  .wc-spin-a { animation: wc-spin 22s linear infinite; }
  .wc-spin-b { animation: wc-spin 34s linear infinite reverse; }
  .wc-spin-c { animation: wc-spin 48s linear infinite; }
  .wc-core   { animation: wc-ping 4s ease-out infinite; }

  /* Card 3: sweep line + test ticks */
  .wc-sweep { animation: wc-sweep 6s ease-in-out infinite; }
  .wc-tick  { stroke-dasharray: 1; animation: wc-tick 6s ease-in-out infinite; }

  /* Card 4: handoff */
  .wc-run-a  { opacity: 0; animation: wc-run-a 3s ease-in-out infinite; }
  .wc-run-b  { opacity: 0; animation: wc-run-b 6s ease-in-out infinite; }
  .wc-check  { opacity: 0; animation: wc-check 3s ease-out infinite; }
  .wc-arrive { animation: wc-arrive 6s ease-out infinite; }

  @keyframes wc-draw {
    0%        { stroke-dashoffset: 100; }
    45%, 55%  { stroke-dashoffset: 0; }
    100%      { stroke-dashoffset: -100; }
  }
  @keyframes wc-ping {
    0%        { transform: scale(.6); opacity: .5; }
    30%, 100% { transform: scale(2.2); opacity: 0; }
  }
  @keyframes wc-spin { to { transform: rotate(360deg); } }
  @keyframes wc-sweep {
    0%        { transform: translateX(0); opacity: 0; }
    10%       { opacity: 1; }
    85%       { transform: translateX(620px); opacity: 1; }
    100%      { transform: translateX(620px); opacity: 0; }
  }
  @keyframes wc-tick {
    0%, 12%   { stroke-dashoffset: 1; }
    30%, 80%  { stroke-dashoffset: 0; }
    95%, 100% { stroke-dashoffset: 1; }
  }
  @keyframes wc-run-a {
    0%        { transform: translateX(0); opacity: 0; }
    12%       { opacity: 1; }
    75%       { transform: translateX(116px); opacity: 1; }
    100%      { transform: translateX(116px); opacity: 0; }
  }
  @keyframes wc-run-b {
    0%        { transform: translateX(0); opacity: 0; }
    8%        { opacity: 1; }
    80%       { transform: translateX(216px); opacity: 1; }
    100%      { transform: translateX(216px); opacity: 0; }
  }
  @keyframes wc-check {
    0%, 72%   { opacity: 0; }
    80%, 92%  { opacity: 1; }
    100%      { opacity: 0; }
  }
  @keyframes wc-arrive {
    0%, 78%   { transform: scale(.7); opacity: 0; }
    80%       { transform: scale(.7); opacity: .5; }
    100%      { transform: scale(2); opacity: 0; }
  }

  @media (prefers-reduced-motion: reduce) {
    .wc-art * { animation: none !important; }
    .wc-art .wc-ping { opacity: 0; }
    .wc-art .wc-run-a, .wc-art .wc-run-b { opacity: 1; }
  }
`;

/* Fine film grain, keeps big gradients from looking flat / banded */
// const grain = `url("data:image/svg+xml;utf8,${encodeURIComponent(
//   `<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>`
// )}")`;
const grain = `url("data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.7' numOctaves='3' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/><feComponentTransfer><feFuncR type='linear' slope='1.8' intercept='-0.4'/><feFuncG type='linear' slope='1.8' intercept='-0.4'/><feFuncB type='linear' slope='1.8' intercept='-0.4'/></feComponentTransfer></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`
)}")`;

/* ------------------------------------------------------------------ */
/*  Art region: lives in the card flow (between label and copy), so    */
/*  it can never sit underneath the heading.                           */
/* ------------------------------------------------------------------ */
const ArtFrame = ({ colorClass = "text-white", viewBox = "0 0 400 300", children }) => (
  <div
    aria-hidden="true"
    className={`wc-art pointer-events-none relative my-4 min-h-[130px] flex-1 ${colorClass}`}
  >
    <svg
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid meet"
      className="absolute inset-0 h-full w-full"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  </div>
);

/* 1. Clarity from the Start: a route that draws itself, node by node */
const ClarityArt = ({ colorClass }) => {
  const nodes = [
    { x: 40, y: 200, d: "0.1s" },
    { x: 190, y: 110, d: "1.3s" },
    { x: 360, y: 100, d: "2.6s" },
  ];
  return (
    <ArtFrame colorClass={colorClass}>
      <circle cx="360" cy="100" r="30" opacity=".3" />
      <circle cx="360" cy="100" r="52" opacity=".15" />

      <path
        d="M40 200 C110 200 110 110 190 110 S290 190 360 100"
        opacity=".25"
        strokeDasharray="2 7"
      />
      <path
        className="wc-draw"
        pathLength="100"
        d="M40 200 C110 200 110 110 190 110 S290 190 360 100"
        opacity=".95"
        strokeWidth="2"
      />

      {nodes.map((n) => (
        <g key={n.x}>
          <circle cx={n.x} cy={n.y} r="4.5" fill="currentColor" stroke="none" />
          <circle cx={n.x} cy={n.y} r="9" opacity=".4" />
          <circle
            className="wc-ping wc-ping6"
            cx={n.x}
            cy={n.y}
            r="9"
            style={{ animationDelay: n.d }}
          />
        </g>
      ))}
    </ArtFrame>
  );
};

/* 2. Made for Your Business: tools orbiting around your core workflow */
const OrbitArt = ({ colorClass }) => (
  <ArtFrame colorClass={colorClass}>
    <circle cx="200" cy="150" r="48" opacity=".3" />
    <circle cx="200" cy="150" r="88" opacity=".2" />
    <circle cx="200" cy="150" r="128" opacity=".13" />

    <circle cx="200" cy="150" r="9" fill="currentColor" stroke="none" />
    <circle className="wc-ping wc-core" cx="200" cy="150" r="9" />

    <g className="wc-orbit wc-spin-a">
      <circle cx="248" cy="150" r="5" fill="currentColor" stroke="none" />
    </g>
    <g className="wc-orbit wc-spin-b">
      <rect x="283" y="145" width="10" height="10" rx="2.5" fill="currentColor" stroke="none" opacity=".85" />
      <circle cx="112" cy="150" r="3.5" fill="currentColor" stroke="none" opacity=".7" />
    </g>
    <g className="wc-orbit wc-spin-c">
      <circle cx="200" cy="22" r="5" fill="currentColor" stroke="none" opacity=".9" />
      <rect x="323" y="145" width="10" height="10" rx="2.5" fill="currentColor" stroke="none" opacity=".65" />
    </g>
  </ArtFrame>
);

/* 3. Tested with Real Scenarios: a sweep runs across scenarios, each one passes */
const TestArt = ({ colorClass }) => {
  const rows = [
    { y: 50, len: 440 },
    { y: 120, len: 380 },
    { y: 190, len: 460 },
  ];
  return (
    <ArtFrame colorClass={colorClass} viewBox="0 0 800 240">
      {rows.map((r, i) => (
        <g key={r.y}>
          <circle cx="90" cy={r.y} r="5" fill="currentColor" stroke="none" opacity=".9" />
          <path d={`M110 ${r.y} H${110 + r.len}`} opacity=".25" strokeDasharray="2 7" />
          <path
            className="wc-draw"
            pathLength="100"
            d={`M110 ${r.y} H${110 + r.len}`}
            opacity=".9"
            style={{ animationDelay: `${i * 0.5}s` }}
          />
          <rect x="600" y={r.y - 17} width="100" height="34" rx="17" opacity=".4" />
          <path
            className="wc-tick"
            pathLength="1"
            d={`M641 ${r.y} l7 7 l12 -14`}
            strokeWidth="2.4"
            style={{ animationDelay: `${i * 0.5}s` }}
          />
        </g>
      ))}

      {/* sweep */}
      <g className="wc-sweep" style={{ opacity: 0 }}>
        <rect x="60" y="8" width="36" height="224" fill="currentColor" stroke="none" opacity=".07" />
        <path d="M96 8 V232" opacity=".55" />
      </g>
    </ArtFrame>
  );
};

/* 4. People Stay in Control: routine work is handled, the rest reaches a person */
const HandoffArt = ({ colorClass }) => (
  <ArtFrame colorClass={colorClass}>
    <rect x="44" y="100" width="30" height="100" rx="15" opacity=".6" />
    <circle cx="59" cy="128" r="2.5" fill="currentColor" stroke="none" />
    <circle cx="59" cy="172" r="2.5" fill="currentColor" stroke="none" />

    <path d="M84 128 H200" opacity=".3" strokeDasharray="2 6" />
    <g className="wc-check">
      <circle cx="214" cy="128" r="9" opacity=".9" />
      <path d="M209.5 128.5 l3 3 l6 -7" />
    </g>
    <circle className="wc-run-a" cx="84" cy="128" r="3.5" fill="currentColor" stroke="none" />

    <path d="M84 172 H298" opacity=".3" strokeDasharray="2 6" />
    <circle className="wc-run-b" cx="84" cy="172" r="3.5" fill="currentColor" stroke="none" />

    <circle cx="320" cy="172" r="20" opacity=".65" />
    <circle cx="320" cy="166" r="5.5" />
    <path d="M309 183 a11 8 0 0 1 22 0" />
    <circle className="wc-ping wc-arrive" cx="320" cy="172" r="20" />
  </ArtFrame>
);

/* ------------------------------------------------------------------ */

const cards = [
  {
    label: "Clarity from the Start",
    lead: "A clear reason for every build.",
    body: "We map your workflow and agree on priorities before choosing the technology. You know what we are building and why.",
    // brand blue: the hero card
    base: "linear-gradient(150deg, #1E40AF 0%, #2563EB 55%, #3B82F6 100%)",
    glowA: "rgba(147,197,253,0.65)",
    glowB: "rgba(30,58,138,0.7)",
    shadow: "rgba(37,99,235,0.55)",
    spot: "rgba(255,255,255,0.22)",
    artColor: "text-white",
    Art: ClarityArt,
  },
  {
    label: "Made for Your Business",
    lead: "Your workflow comes first.",
    body: "Your tools, team, and customer experience shape the solution. We choose integrations around how your business actually works.",
    // ink black with a blue glow, matches the dark sections of the site
    base: "linear-gradient(160deg, #04060D 0%, #0A1024 60%, #0F1B3D 100%)",
    glowA: "rgba(59,130,246,0.45)",
    glowB: "rgba(37,99,235,0.3)",
    shadow: "rgba(15,27,61,0.7)",
    spot: "rgba(96,165,250,0.2)",
    artColor: "text-blue-300",
    Art: OrbitArt,
  },
  {
    label: "Tested with Real Scenarios",
    lead: "Confidence before launch.",
    body: "We evaluate responses, workflow behaviour, and handoffs against agreed criteria, so you can review how the system performs.",
    span: "md:col-span-2 lg:col-span-2",
    // midnight sliding into electric blue
    base: "linear-gradient(120deg, #050A1F 0%, #0B1F5C 50%, #1D4ED8 100%)",
    glowA: "rgba(96,165,250,0.55)",
    glowB: "rgba(29,78,216,0.45)",
    shadow: "rgba(29,78,216,0.5)",
    spot: "rgba(147,197,253,0.2)",
    artColor: "text-sky-200",
    Art: TestArt,
  },
  {
    label: "People Stay in Control",
    lead: "Automation with a human handoff.",
    body: "We define what the system should handle and when your team should step in. Clear boundaries keep your customers connected to the right help.",
    span: "md:col-span-2 lg:col-span-1",
    // the white of the site, tinted with blue, for contrast
    light: true,
    base: "linear-gradient(160deg, #FFFFFF 0%, #EEF4FF 55%, #D6E4FF 100%)",
    glowA: "rgba(147,197,253,0.65)",
    glowB: "rgba(191,219,254,0.7)",
    shadow: "rgba(37,99,235,0.3)",
    spot: "rgba(37,99,235,0.12)",
    artColor: "text-blue-600",
    Art: HandoffArt,
  },
];

const WhyChooseCard = ({ card }) => {
  const { Art } = card;

  // cursor-following spotlight
  const handleMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <div
      onMouseMove={handleMove}
      className={`
        group relative flex min-h-[340px] flex-col isolate
        overflow-hidden rounded-3xl p-7 md:p-8
        lg:min-h-[380px]
        ring-1 ring-inset ${card.light ? "ring-blue-900/10" : "ring-white/10"}
        transition-all duration-500 ease-out
        hover:-translate-y-1.5
        ${card.span ?? ""}
      `}
      style={{
        background: `
          radial-gradient(120% 90% at 100% 0%, ${card.glowA} 0%, transparent 55%),
          radial-gradient(90% 80% at 0% 100%, ${card.glowB} 0%, transparent 60%),
          ${card.base}
        `,
        boxShadow: `0 24px 50px -24px ${card.shadow}, inset 0 1px 0 rgba(255,255,255,${card.light ? 0.9 : 0.22})`,
        "--mx": "50%",
        "--my": "0%",
      }}
    >
      {/* film grain */}
      {/* <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay"
        style={{ backgroundImage: grain }}
      /> */}
      {/* film grain */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 ${card.light
            ? "opacity-[0.14] mix-blend-multiply"
            : "opacity-[0.55] mix-blend-overlay"
          }`}
        style={{ backgroundImage: grain, backgroundSize: "220px 220px" }}
      />

      {/* glass sheen along the top edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/[0.10] to-transparent"
      />

      {/* cursor spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            `radial-gradient(420px circle at var(--mx) var(--my), ${card.spot}, transparent 45%)`,
        }}
      />

      <div className="relative z-10 flex flex-1 flex-col">
        <p className={`text-lg font-semibold tracking-tight md:text-xl ${card.light ? "text-slate-600" : "text-white/85"}`}>
          {card.label}
        </p>

        <Art colorClass={card.artColor} />

        <div>
          <h3 className={`max-w-xl text-2xl font-semibold leading-tight tracking-tight md:text-3xl ${card.light ? "text-[#0B1226]" : "text-white"}`}>
            {card.lead}
          </h3>

          <p className={`mt-3 max-w-lg text-sm leading-relaxed md:text-base ${card.light ? "text-slate-600" : "text-white/70"}`}>
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
      className="pb-14 pt-16 font-content min-[600px]:pt-20 min-[900px]:pt-28"
    >
      <style>{artCss}</style>

      <div className="mx-auto max-w-7xl px-5 md:px-6">
        <div
          className="
          grid grid-cols-1
          items-stretch
          gap-5 md:grid-cols-2 lg:grid-cols-3
          md:gap-6
        "
        >
          {/* Section heading */}
          <div className="flex flex-col justify-between py-2 md:py-4">
            <SectionHeading
              label="Why choose Revate AI?"
              title="Built on understanding."
              accent="Made to earn your trust."
              description="Useful technology starts with your business. We focus on clear scope, connected tools, and systems your team can actually use."
            />
          </div>

          {cards.map((card) => (
            <WhyChooseCard key={card.label} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;