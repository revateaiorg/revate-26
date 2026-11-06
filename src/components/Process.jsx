import React from "react";
import BlurText from "./BlurText";
import Chatgpt from "../assets/chatgpt.png";
import HubSpotIcon from "../assets/hubspot.png";
import Airtable from "../assets/airtable.png";
import Sheets from "../assets/sheets.png";
import {
  BarChart,
  BarChart2Icon,
  ChartArea,
  ChartLine,
  PieChartIcon,
  TrendingUp,
} from "lucide-react";
// Icon components (using simple SVG representations)
const ListIcon = () => (
  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
    <path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z" />
  </svg>
);

const MailIcon = () => (
  <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z" />
  </svg>
);

const FileIcon = () => (
  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-8-6z" />
  </svg>
);

const TodoListIcon = () => (
  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
    <rect
      x="3"
      y="3"
      width="18"
      height="18"
      rx="2"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
    <line
      x1="7"
      y1="8"
      x2="17"
      y2="8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="7"
      y1="12"
      x2="17"
      y2="12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="7"
      y1="16"
      x2="17"
      y2="16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const BooksIcon = () => (
  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
    <path d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" />
  </svg>
);

const ShareIcon = () => (
  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.15c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
  </svg>
);

/* ---------- NEW: card shell (background + border + hover spotlight) ---------- */
function CardShell({ fixedHeight = false, children }) {
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  return (
    <div className="relative w-full max-w-sm z-10">
      <div
        onMouseMove={onMove}
        className={`group relative rounded-3xl p-8 min-h-[650px] ${fixedHeight ? "h-[650px]" : ""
          } overflow-hidden border border-white/10 bg-gradient-to-b from-[#1a1a1a] to-[#0c0c0c] shadow-[inset_0_1px_0_rgba(255,255,255,0.07)] transition-colors duration-300 hover:border-blue-500/40`}
      >
        {/* subtle dotted texture */}
        <div
          className="absolute inset-0 opacity-50 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
            WebkitMaskImage:
              "linear-gradient(to bottom, #000, transparent 60%)",
            maskImage: "linear-gradient(to bottom, #000, transparent 60%)",
          }}
        />
        {/* top edge highlight */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/3 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent pointer-events-none" />
        {/* cursor spotlight */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background:
              "radial-gradient(320px circle at var(--x,50%) var(--y,50%), rgba(59,130,246,0.13), transparent 70%)",
          }}
        />
        {children}
      </div>
    </div>
  );
}

/* ---------- NEW: number badge, title and text (same footprint as before) ---------- */
function StepHeader({ step, title, text }) {
  return (
    <>
      <div className="h-12 mb-6 flex items-center gap-3">
        <div className="w-12 h-12 shrink-0 rounded-full bg-gradient-to-b from-white to-gray-300 flex items-center justify-center shadow-[0_0_0_4px_rgba(59,130,246,0.18),0_0_24px_rgba(59,130,246,0.35)]">
          <span className="text-2xl font-bold text-slate-900">{step}</span>
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-blue-400/40 to-transparent" />
        <span className="text-sm font-medium text-blue-300/70">
          Step {step}
        </span>
      </div>
      <h3 className="text-[22px] font-semibold tracking-tight text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-400 text-lg leading-relaxed mb-12">{text}</p>
    </>
  );
}

/* ---------- NEW: redesigned dashboard preview (card 3) ---------- */
function DashboardPreview() {
  const stats = [
    { label: "Tasks automated", value: "1,284", delta: "+12%" },
    { label: "Hours saved", value: "86h", delta: "+8%" },
    { label: "Errors", value: "0.4%", delta: "-3%" },
  ];
  const line =
    "M0 62 C18 58 28 44 46 48 S78 24 98 30 S136 12 158 20 S188 8 200 6";

  return (
    <div className="w-full h-[250px] rounded-xl border border-white/10 bg-neutral-950 shadow-[0_20px_50px_rgba(0,0,0,0.6)] p-3 flex flex-col gap-2.5 overflow-hidden">
      <style>{`
        @keyframes dash-draw { from { stroke-dashoffset: 1 } to { stroke-dashoffset: 0 } }
        .dash-draw { stroke-dasharray: 1; animation: dash-draw 2.2s ease-out forwards }
        @media (prefers-reduced-motion: reduce) { .dash-draw { animation: none; stroke-dashoffset: 0 } }
      `}</style>

      {/* window bar */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-1.5 items-center">
          <div className="bg-red-600 w-[10px] h-[10px] rounded-full"></div>
          <div className="bg-yellow-600 w-[10px] h-[10px] rounded-full"></div>
          <div className="bg-green-600 w-[10px] h-[10px] rounded-full"></div>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          All systems running
        </div>
      </div>

      {/* stat tiles */}
      <div className="grid grid-cols-3 gap-2">
        {stats.map((st) => (
          <div
            key={st.label}
            className="rounded-lg border border-white/5 bg-white/[0.04] px-2.5 py-2"
          >
            <p className="text-[10px] text-gray-500 truncate">{st.label}</p>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-[15px] font-semibold text-white">
                {st.value}
              </span>
              <span className="text-[10px] font-medium text-emerald-400">
                {st.delta}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* chart + donut */}
      <div className="flex gap-2 flex-1 min-h-0">
        <div className="flex-1 min-w-0 rounded-lg border border-white/5 bg-white/[0.04] p-2.5 flex flex-col">
          <p className="text-[10px] text-gray-500 mb-1">Runs this week</p>
          <svg
            className="flex-1 w-full min-h-0"
            viewBox="0 0 200 80"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="dashFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[20, 40, 60].map((y) => (
              <line
                key={y}
                x1="0"
                x2="200"
                y1={y}
                y2={y}
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
            ))}
            <path d={`${line} L200 80 L0 80 Z`} fill="url(#dashFill)" />
            <path
              d={line}
              pathLength="1"
              fill="none"
              stroke="#60a5fa"
              strokeWidth="2"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              className="dash-draw"
            />
          </svg>
        </div>

        <div className="w-[88px] shrink-0 rounded-lg border border-white/5 bg-white/[0.04] p-2.5 flex flex-col items-center justify-center gap-1.5">
          <div className="relative w-14 h-14">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "conic-gradient(#3b82f6 0 72%, #1e3a8a 72% 90%, #374151 90% 100%)",
                WebkitMask: "radial-gradient(circle, transparent 58%, #000 60%)",
                mask: "radial-gradient(circle, transparent 58%, #000 60%)",
              }}
            />
            <span className="absolute inset-0 flex items-center justify-center text-[11px] font-semibold text-white">
              72%
            </span>
          </div>
          <p className="text-[10px] text-gray-500">Completed</p>
        </div>
      </div>
    </div>
  );
}

export default function Process() {
  return (
    <section id="process" className="p-8">
      <div className="rounded-lg px-4 py-1 bg-white/8 backdrop-blur-lg border border-blue-500/20 w-fit flex items-center justify-center mx-auto md:mt-10">
        <h2 className="text-md text-white text-center font-medium">
          Our Process
        </h2>
      </div>
      <div>
        <BlurText
          text="How We Build Your Custom AI System"
          delay={50}
          animateBy="words"
          direction="top"
          className="text-center text-2xl md:text-5xl text-white px-5 md:w-4/5 leading-tight pt-5 mx-auto mt-5"
        />
        <BlurText
          text="That Actually Works."
          delay={50}
          animateBy="words"
          direction="top"
          className="text-center text-2xl md:text-5xl text-white/70 px-5 md:w-4/5 leading-tight pb-5 mx-auto "
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto mt-10">
        {/* Card 1 */}
        <CardShell>
          {/* Blue gradient with higher z-index */}
          <div className="absolute -bottom-40 -left-35 w-[400px] h-[400px] rounded-full blur-3xl opacity-30 bg-gradient-to-r from-blue-500 to-blue-600 z-30" />

          <div className="relative z-10 h-42">
            <StepHeader
              step="1"
              title="Share Your Workflow"
              text="From lead gen to client onboarding, just share your workflow and the tools you use."
            />
            {/* Icons container with lower z-index */}
            <div className="relative w-full h-full z-20">
              <div className="absolute right-5 -rotate-12 w-30 h-30 rounded-full bg-gradient-to-tr from-neutral-900 to-gray-700 flex items-center justify-center shadow-lg border-t-3 border-gray-500 animate-pulse-scale">
                <MailIcon />
              </div>
              <div className="absolute left-5 top-10 -rotate-12 w-26 h-26 rounded-full bg-gradient-to-br from-neutral-900 to-gray-700 flex items-center justify-center shadow-lg border-t-3 border-gray-500 animate-pulse-scale-delayed-1">
                <ListIcon />
              </div>
              <div className="absolute left-0 -bottom-25 rotate-12 w-20 h-20 rounded-full bg-gradient-to-br from-neutral-900 to-gray-700 flex items-center justify-center shadow-lg border-t-3 border-gray-500 animate-pulse-scale-delayed-2">
                <CalendarIcon />
              </div>
              <div className="absolute right-4 -bottom-20 -rotate-12 w-20 h-20 rounded-full bg-gradient-to-br from-neutral-900 to-gray-700 flex items-center justify-center shadow-lg border-t-3 border-gray-500 animate-pulse-scale-delayed-3">
                <FileIcon />
              </div>
              <div className="absolute right-30 -bottom-40 -rotate-12 w-20 h-20 rounded-full bg-gradient-to-br from-neutral-900 to-gray-700 flex items-center justify-center shadow-lg border-t-3 border-gray-500 animate-pulse-scale-delayed-4">
                <TodoListIcon />
              </div>
            </div>
          </div>
        </CardShell>

        {/* Card 2 */}
        <CardShell fixedHeight>
          <div className="absolute -bottom-40 -left-35 w-[400px] h-[400px] rounded-full blur-3xl opacity-30 bg-gradient-to-r from-blue-500 to-blue-600 z-30" />
          <div className="relative z-10">
            <StepHeader
              step="2"
              title="We Build the System"
              text="We design and set up custom automations that connect your tools with AI—so work happens while you sleep."
            />

            {/* Fade via mask so it works on any background (no colored overlays) */}
            <div
              className="relative overflow-hidden z-10"
              style={{
                WebkitMaskImage:
                  "linear-gradient(to bottom, transparent, #000 25%, #000 75%, transparent)",
                maskImage:
                  "linear-gradient(to bottom, transparent, #000 25%, #000 75%, transparent)",
              }}
            >
              <div className="flex-col gap-6 animate-loop-y z-20">
                {/* First set of items */}
                <div className="w-26 h-26 rounded-full bg-gradient-to-br from-neutral-900 to-gray-700 flex items-center justify-center shadow-lg border-t-3 border-gray-500 ">
                  <img src={Chatgpt} className="w-16" alt="ChatGPT logo" />
                </div>
                <div className="w-26 h-26 rounded-full bg-gradient-to-br from-neutral-900 to-gray-700 flex items-center justify-center shadow-lg border-t-3 border-gray-500 ">
                  <img src={HubSpotIcon} className="w-16" alt="HubSpot logo" />
                </div>
                <div className="w-26 h-26 rounded-full bg-gradient-to-br from-neutral-900 to-gray-700 flex items-center justify-center shadow-lg border-t-3 border-gray-500 ">
                  <img src={Airtable} className="w-16" alt="Airtable logo" />
                </div>
                <div className="w-26 h-26 rounded-full bg-gradient-to-br from-neutral-900 to-gray-700 flex items-center justify-center shadow-lg border-t-3 border-gray-500 ">
                  <img src={Sheets} className="w-16" alt="Google Sheets logo" />
                </div>
              </div>
            </div>
          </div>
        </CardShell>

        {/* Card 3 */}
        <CardShell fixedHeight>
          <div className="absolute -bottom-40 -left-35 w-[400px] h-[400px] rounded-full blur-3xl opacity-30 bg-gradient-to-r from-blue-500 to-blue-600 z-30" />
          <div className="relative z-10">
            <StepHeader
              step="3"
              title="Launch and Take Control"
              text="You get a plug-and-play dashboard with a walkthrough to manage everything easily."
            />

            <div className="mt-25">
              <DashboardPreview />
            </div>
          </div>
        </CardShell>
      </div>
    </section>
  );
}