import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Search, Workflow, TrendingUp, Users, Database, MessageSquare, ArrowUpRight, Layers3, ShieldCheck, SlidersHorizontal, CircleCheck, Building2 } from 'lucide-react';
import SectionHeading from './SectionHeading';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    label: 'Understand', title: 'Understand your everyday work.',
    description: 'We map how enquiries, information, and tasks move through your business. Together, we identify repetitive work, missed handoffs, and the best place to start.',
    points: ['Map your current workflow and tools', 'Find the friction and opportunities', 'Agree on priorities and success criteria'],
    deliverable: 'Your workflow map & a focused plan', icon: Search,
  },
  {
    label: 'Build', title: 'Build the system that fits.',
    description: 'We build the website, AI agent, or automation your workflow needs. We connect the right tools, test realistic situations, and show your team how to use the system.',
    points: ['Design the experience with your team', 'Connect the tools you already use', 'Test real scenarios and human handoffs'],
    deliverable: 'A working system, tested together', icon: Workflow,
  },
  {
    label: 'Improve', title: 'Measure, refine, and grow.',
    description: 'After launch, we review the system against the goals agreed with you. We look for failed runs, unanswered questions, or unnecessary steps, then prioritise useful improvements.',
    points: ['Review reliability and customer experience', 'Compare results with your starting point', 'Prioritise the next improvement together'],
    deliverable: 'A clear handover & next-step priorities', icon: TrendingUp,
  },
];

// Scroll phases: expand the inset card, move through the steps, then restore it.
const TIMING = { expand: 0.85, pause: 0.2, horizontal: 2.8, contract: 0.85 };

/* ------------------------------------------------------------------ */
/*  Animated diagrams (self-contained SVG + CSS, no extra packages)    */
/* ------------------------------------------------------------------ */
const diagramCss = `
  .pd-art .pd-glow { filter: drop-shadow(0 0 5px rgba(96,165,250,0.95)); }

  /* rings that ping outward when something arrives */
  .pd-art .pd-ping {
    transform-box: fill-box; transform-origin: center; opacity: 0;
    animation: pd-ping var(--d, 6s) ease-out var(--delay, 0s) infinite;
  }
  /* a node flashing blue as a pulse reaches it */
  .pd-art .pd-lit { animation: pd-lit var(--d, 6s) ease-out var(--delay, 0s) infinite; }

  .pd-art .pd-spin { animation: pd-spin var(--d, 20s) linear infinite; }
  .pd-art .pd-rev  { animation-direction: reverse; }

  /* chart line draws itself, then wipes out and repeats */
  .pd-art .pd-draw { stroke-dasharray: 100; animation: pd-draw var(--d, 9s) ease-in-out infinite; }
  .pd-art .pd-area { opacity: 0; animation: pd-area var(--d, 9s) ease-in-out infinite; }
  .pd-art .pd-dot  { opacity: 0; animation: pd-dot var(--d, 9s) ease-in-out infinite; }

  @keyframes pd-ping {
    0%        { transform: scale(.85); opacity: .6; }
    35%, 100% { transform: scale(1.7); opacity: 0; }
  }
  @keyframes pd-lit {
    0%        { stroke: rgba(96,165,250,.95); }
    22%, 100% { stroke: rgba(255,255,255,.14); }
  }
  @keyframes pd-spin { to { transform: rotate(360deg); } }
  @keyframes pd-draw {
    0%        { stroke-dashoffset: 100; }
    45%, 75%  { stroke-dashoffset: 0; }
    100%      { stroke-dashoffset: -100; }
  }
  @keyframes pd-area {
    0%, 10%   { opacity: 0; }
    45%, 75%  { opacity: 1; }
    100%      { opacity: 0; }
  }
  @keyframes pd-dot {
    0%, 40%   { opacity: 0; }
    50%, 78%  { opacity: 1; }
    95%, 100% { opacity: 0; }
  }

  @media (prefers-reduced-motion: reduce) {
    .pd-art * { animation: none !important; }
    .pd-art .pd-ping { opacity: 0; }
    .pd-art .pd-draw { stroke-dashoffset: 0; }
    .pd-art .pd-area, .pd-art .pd-dot { opacity: 1; }
  }
`;

const LINE = 'rgba(255,255,255,0.14)';
const NODE_FILL = '#0a0a0a';

const useReducedMotion = () => {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduce(query.matches);
    const onChange = (event) => setReduce(event.matches);
    query.addEventListener?.('change', onChange);
    return () => query.removeEventListener?.('change', onChange);
  }, []);
  return reduce;
};

/* A glowing dot that travels along an SVG path, then fades out. */
function Pulse({ d, dur, begin = 0, to = 0.4, r = 3.2 }) {
  return (
    <circle r={r} fill="#dbeafe" className="pd-glow" opacity="0">
      <animateMotion
        dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite"
        path={d} calcMode="linear" keyPoints="0;1;1" keyTimes={`0;${to};1`}
      />
      <animate
        attributeName="opacity" dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite"
        values="0;1;1;0;0" keyTimes={`0;0.04;${(to - 0.04).toFixed(3)};${to};1`}
      />
    </circle>
  );
}

const cssVars = (duration, delay = 0) => ({ '--d': `${duration}s`, '--delay': `${delay}s` });

/* 01 Understand: people, tools and customers all flow into one clear picture of your business */
function UnderstandDiagram({ reduce }) {
  const DUR = 5;
  const sources = [
    { x: 70, Icon: Users, label: 'Your people', path: 'M70 80 C70 175 200 160 200 246' },
    { x: 200, Icon: Database, label: 'Your tools', path: 'M200 80 V246' },
    { x: 330, Icon: MessageSquare, label: 'Your customers', path: 'M330 80 C330 175 200 160 200 246' },
  ];
  return (
    <>
      <defs>
        <linearGradient id="pd1-node" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2563eb" />
          <stop offset="1" stopColor="#3b82f6" />
        </linearGradient>
        <filter id="pd1-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="16" />
        </filter>
      </defs>

      <ellipse cx="200" cy="268" rx="90" ry="34" fill="#3b82f6" opacity=".2" filter="url(#pd1-blur)" />

      {sources.map((s) => (
        <path key={s.path} d={s.path} stroke={LINE} strokeWidth="1.5" fill="none" />
      ))}

      {sources.map((s, i) => (
        <g key={s.label}>
          <rect
            className="pd-lit" x={s.x - 22} y="8" width="44" height="44" rx="14"
            fill={NODE_FILL} stroke={LINE} strokeWidth="1.2" style={cssVars(DUR / 2, i * 0.5)}
          />
          <g className="text-blue-400">
            <s.Icon x={s.x - 11} y={19} size={22} strokeWidth={1.5} />
          </g>
          <text x={s.x} y="68" textAnchor="middle" fontSize="10" fill="#a3a3a3">{s.label}</text>
        </g>
      ))}

      {!reduce &&
        sources.map((s, i) => (
          <g key={`p-${s.label}`}>
            <Pulse d={s.path} dur={DUR} begin={i * 0.5} to={0.5} />
            <Pulse d={s.path} dur={DUR} begin={i * 0.5 + DUR / 2} to={0.5} />
          </g>
        ))}

      {/* destination: your business */}
      {[0, 0.5, 1].map((offset) => (
        <rect
          key={offset} className="pd-ping" x="132" y="246" width="136" height="44" rx="16"
          fill="none" stroke="#60a5fa" strokeWidth="1.5" style={cssVars(DUR / 2, DUR / 2 + offset)}
        />
      ))}
      <rect x="132" y="246" width="136" height="44" rx="16" fill="url(#pd1-node)" stroke="rgba(255,255,255,0.25)" />
      <g className="text-white">
        <Building2 x={146} y={257} size={22} strokeWidth={1.6} />
      </g>
      <text x="176" y="273" fontSize="11.5" fontWeight="500" fill="#fff">Your business</text>
    </>
  );
}

/* 02 Build: an enquiry enters your custom system, which connects tools, tests scenarios and hands off to people */
function BuildDiagram({ reduce }) {
  const DUR = 4;
  const nodes = [
    { x: 62, Icon: Layers3, label: 'Connect tools', path: 'M200 180 C200 212 62 204 62 236', begin: 0.65 },
    { x: 200, Icon: ShieldCheck, label: 'Test scenarios', path: 'M200 180 V236', begin: 0.8 },
    { x: 338, Icon: Users, label: 'Human handoff', path: 'M200 180 C200 212 338 204 338 236', begin: 0.95 },
  ];
  const TRAVEL = 0.36;
  return (
    <>
      <defs>
        <linearGradient id="pd2-core" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3b82f6" />
          <stop offset="1" stopColor="#1d4ed8" />
        </linearGradient>
        <filter id="pd2-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>

      {/* enquiry */}
      <rect x="118" y="4" width="164" height="36" rx="18" fill={NODE_FILL} stroke={LINE} strokeWidth="1.2" />
      <g className="text-blue-300">
        <MessageSquare x={134} y={14} size={16} strokeWidth={1.6} />
      </g>
      <text x="158" y="26" fontSize="10.5" fill="#d4d4d4">A customer enquiry</text>

      {/* lines */}
      <path d="M200 40 V112" stroke={LINE} strokeWidth="1.5" fill="none" />
      {nodes.map((n) => (
        <path key={n.path} d={n.path} stroke={LINE} strokeWidth="1.5" fill="none" />
      ))}

      {/* core system */}
      <circle cx="200" cy="146" r="54" fill="#3b82f6" opacity=".16" filter="url(#pd2-blur)" />
      <circle cx="200" cy="146" r="58" fill="none" stroke={LINE} strokeWidth="1.2" />
      <g className="pd-spin pd-rev" style={{ ...cssVars(16), transformBox: 'view-box', transformOrigin: '200px 146px' }}>
        {/* <circle cx="258" cy="146" r="3.5" fill="#93c5fd" /> */}
      </g>
      <g className="pd-spin" style={{ ...cssVars(26), transformBox: 'view-box', transformOrigin: '200px 146px' }}>
        <circle cx="200" cy="146" r="46" fill="none" stroke="rgba(147,197,253,0.4)" strokeWidth="1.2" strokeDasharray="3 7" />
      </g>
      <circle className="pd-ping" cx="200" cy="146" r="34" fill="none" stroke="#60a5fa" strokeWidth="1.5" style={cssVars(DUR, 0.6)} />
      <circle cx="200" cy="146" r="34" fill="url(#pd2-core)" stroke="rgba(255,255,255,0.25)" />
      <g className="text-white">
        <Workflow x={186} y={132} size={28} strokeWidth={1.5} />
      </g>

      {/* outputs */}
      {nodes.map((n) => {
        const arrive = n.begin + TRAVEL * DUR;
        return (
          <g key={n.label}>
            <rect className="pd-ping" x={n.x - 46} y="236" width="92" height="60" rx="14" fill="none" stroke="#60a5fa" strokeWidth="1.5" style={cssVars(DUR, arrive)} />
            <rect className="pd-lit" x={n.x - 46} y="236" width="92" height="60" rx="14" fill={NODE_FILL} stroke={LINE} strokeWidth="1.2" style={cssVars(DUR, arrive)} />
            <g className="text-blue-400">
              <n.Icon x={n.x - 11} y={246} size={22} strokeWidth={1.5} />
            </g>
            <text x={n.x} y="286" textAnchor="middle" fontSize="10" fill="#a3a3a3">{n.label}</text>
          </g>
        );
      })}

      {!reduce && (
        <>
          <Pulse d="M200 40 V112" dur={DUR} begin={0} to={0.15} />
          {nodes.map((n) => (
            <Pulse key={n.path} d={n.path} dur={DUR} begin={n.begin} to={TRAVEL} />
          ))}
        </>
      )}
    </>
  );
}

/* 03 Improve: a measure, refine, plan loop that keeps pushing the results upward */
function ImproveDiagram() {
  const DUR = 9;
  const cx = 200;
  const cy = 178;
  const nodes = [
    { x: 200, y: 80, Icon: Search, label: 'Measure', labelY: 48, delay: 0 },
    { x: 285, y: 227, Icon: SlidersHorizontal, label: 'Refine', labelY: 270, delay: 3 },
    { x: 115, y: 227, Icon: TrendingUp, label: 'Plan next', labelY: 270, delay: 6 },
  ];
  const curve = 'M156 192 C176 192 182 176 200 172 S228 164 244 146';
  return (
    <>
      <defs>
        <linearGradient id="pd3-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3b82f6" stopOpacity=".35" />
          <stop offset="1" stopColor="#3b82f6" stopOpacity="0" />
        </linearGradient>
        <filter id="pd3-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="16" />
        </filter>
      </defs>

      <circle cx={cx} cy={cy} r="62" fill="#3b82f6" opacity=".12" filter="url(#pd3-blur)" />

      {/* loop */}
      <circle cx={cx} cy={cy} r="98" fill="none" stroke={LINE} strokeWidth="1.5" strokeDasharray="2 7" />
      <g className="pd-spin" style={{ ...cssVars(DUR), transformBox: 'view-box', transformOrigin: `${cx}px ${cy}px` }}>
        <circle
          cx={cx} cy={cy} r="98" pathLength="100" fill="none" stroke="#60a5fa" strokeWidth="2.5"
          strokeLinecap="round" strokeDasharray="12 88" strokeDashoffset="12"
          transform={`rotate(-90 ${cx} ${cy})`} opacity=".9"
        />
        <circle cx={cx} cy="80" r="4" fill="#dbeafe" className="pd-glow" />
      </g>

      {/* growth chart in the middle */}
      <path d="M156 200 H244" stroke={LINE} strokeWidth="1.2" />
      <path
        className="pd-area" style={cssVars(DUR)}
        d={`${curve} L244 200 L156 200 Z`} fill="url(#pd3-area)" stroke="none"
      />
      <path
        className="pd-draw" style={cssVars(DUR)} pathLength="100"
        d={curve} fill="none" stroke="#93c5fd" strokeWidth="2.2" strokeLinecap="round"
      />
      <g className="pd-dot" style={cssVars(DUR)}>
        <circle cx="244" cy="146" r="4" fill="#dbeafe" className="pd-glow" />
      </g>
      <circle className="pd-ping" cx="244" cy="146" r="6" fill="none" stroke="#60a5fa" strokeWidth="1.2" style={cssVars(DUR, 4)} />

      {/* stages on the loop */}
      {nodes.map((n) => (
        <g key={n.label}>
          <rect className="pd-ping" x={n.x - 22} y={n.y - 22} width="44" height="44" rx="14" fill="none" stroke="#60a5fa" strokeWidth="1.5" style={cssVars(DUR, n.delay)} />
          <rect className="pd-lit" x={n.x - 22} y={n.y - 22} width="44" height="44" rx="14" fill={NODE_FILL} stroke={LINE} strokeWidth="1.2" style={cssVars(DUR, n.delay)} />
          <g className="text-blue-400">
            <n.Icon x={n.x - 11} y={n.y - 11} size={22} strokeWidth={1.5} />
          </g>
          <text x={n.x} y={n.labelY} textAnchor="middle" fontSize="10" fill="#a3a3a3">{n.label}</text>
        </g>
      ))}
    </>
  );
}

const diagrams = [UnderstandDiagram, BuildDiagram, ImproveDiagram];

function ProcessDiagram({ step }) {
  const reduce = useReducedMotion();
  const visuals = [
    { label: 'A CLEARER PICTURE', heading: 'Connect the dots.', caption: 'Your business, understood.' },
    { label: 'BUILT AROUND YOU', heading: 'One connected system.', caption: 'Every connection has a purpose.' },
    { label: 'A USEFUL NEXT STEP', heading: 'Keep getting better.', caption: 'Learn. Refine. Repeat.' },
  ];
  const visual = visuals[step];
  const Diagram = diagrams[step];
  return (
    <div aria-hidden="true" className="relative flex w-full flex-col overflow-hidden rounded-[24px] border border-white/10 bg-black bg-[radial-gradient(120%_80%_at_0%_0%,rgba(59,130,246,0.14),transparent_60%)] p-5 sm:p-6 min-[1100px]:p-7">
      <span className="absolute -right-2 -top-5 select-none text-[150px] font-semibold leading-none tracking-[-0.08em] text-white/[0.04]">0{step + 1}</span>
      <div className="relative mb-4 flex items-center gap-2 text-[9px] font-semibold tracking-[0.14em] text-neutral-400"><span className="size-1.5 rounded-full bg-accent" />{visual.label}</div>
      <h4 className="relative mb-3 text-2xl font-medium tracking-[-0.035em] text-white sm:text-[28px]">{visual.heading}</h4>
      <svg
        viewBox="0 0 400 310"
        preserveAspectRatio="xMidYMid meet"
        className="pd-art relative mx-auto block h-auto max-h-[44svh] w-full"
        fill="none"
      >
        <Diagram reduce={reduce} />
      </svg>
      <div className="relative mt-4 flex items-center gap-2 border-t border-white/10 pt-4 text-[10px] text-neutral-400"><CircleCheck size={14} className="text-accent" />{visual.caption}</div>
    </div>
  );
}

export default function Process() {
  const stageRef = useRef(null);
  const frameRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const stage = stageRef.current;
    const frame = frameRef.current;
    const track = trackRef.current;
    if (!stage || !frame || !track) return;
    const media = gsap.matchMedia();

    // Smaller screens retain touch/keyboard scrolling and their natural height.
    media.add('(min-width: 1024px) and (min-height: 760px) and (prefers-reduced-motion: no-preference)', () => {
      stage.dataset.enhanced = 'true';
      const insetWidth = () => Math.min(1280, stage.clientWidth - 64);
      const insetHeight = () => window.innerHeight - 112;
      const fullWidth = () => stage.clientWidth;
      const fullHeight = () => stage.clientHeight;
      const lastStep = steps.length - 1;

      const context = gsap.context(() => {
        const timeline = gsap.timeline({
          defaults: { ease: 'power2.inOut' },
          scrollTrigger: {
            trigger: stage,
            start: 'top top',
            end: () => `+=${Math.round(window.innerHeight * 3)}`,
            pin: true,
            scrub: 0.5,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .fromTo(frame,
            { width: insetWidth, height: insetHeight, borderRadius: 32 },
            { width: fullWidth, height: fullHeight, borderRadius: 0, duration: TIMING.expand }
          )
          .fromTo(track,
            { x: 0 },
            { x: () => -fullWidth() * lastStep, ease: 'none', duration: TIMING.horizontal, immediateRender: false },
            `+=${TIMING.pause}`
          )
          .addLabel('restore', `+=${TIMING.pause}`)
          .fromTo(frame,
            { width: fullWidth, height: fullHeight, borderRadius: 0 },
            { width: insetWidth, height: insetHeight, borderRadius: 32, duration: TIMING.contract, immediateRender: false },
            'restore'
          )
          // Keep the final slide centred as its container returns to card width.
          .fromTo(track,
            { x: () => -fullWidth() * lastStep },
            { x: () => -insetWidth() * lastStep, duration: TIMING.contract, immediateRender: false },
            'restore'
          );
      }, stage);

      return () => {
        context.revert();
        // Explicitly release animated dimensions when crossing into mobile layout.
        gsap.set(frame, { clearProps: 'width,height,borderRadius' });
        gsap.set(track, { clearProps: 'transform,translate,rotate,scale' });
        delete stage.dataset.enhanced;
      };
    });
    return () => media.revert();
  }, []);

  return (
    <section id="process" className="bg-black pb-14 pt-14 font-content text-white min-[700px]:pb-20 min-[700px]:pt-20">
      <style>{diagramCss}</style>
      <div className="mx-auto mb-7 w-[calc(100%-40px)] max-w-7xl sm:w-[calc(100%-64px)] min-[1024px]:mb-0">
        <SectionHeading dark label="Our process" title="From how you work." accent="To what’s possible." description="Three considered steps. One system that makes sense for your business." />
      </div>
      <div ref={stageRef} data-process-stage className="group/process relative grid place-items-center overflow-hidden data-[enhanced=true]:h-svh">
        <div ref={frameRef} data-process-frame className="relative w-[calc(100%-40px)] max-w-7xl overflow-hidden rounded-[24px] border border-white/10 bg-black text-white sm:w-[calc(100%-64px)] group-data-[enhanced=true]/process:h-[calc(100svh-112px)] group-data-[enhanced=true]/process:max-w-none group-data-[enhanced=true]/process:rounded-[32px]">
          {/* soft blue glow so the pure-black card still has depth */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(59,130,246,0.10),transparent_70%)]" />
          <ol id="process-slides" ref={trackRef} tabIndex={0} aria-label="Our three process steps. Scroll down on desktop, or swipe horizontally on smaller screens." className="relative z-10 flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-color:var(--accent)_rgba(255,255,255,0.1)] [scrollbar-width:thin] group-data-[enhanced=true]/process:h-full group-data-[enhanced=true]/process:snap-none group-data-[enhanced=true]/process:overflow-visible">
            {steps.map((step, index) => (
              <li key={step.label} aria-label={`Step ${index + 1}: ${step.label}`} className="grid min-w-0 basis-full shrink-0 snap-start snap-always grid-cols-1 content-center gap-8 p-6 sm:p-9 min-[800px]:grid-cols-2 min-[800px]:items-center min-[800px]:gap-10 min-[1100px]:gap-16 min-[1100px]:px-14 group-data-[enhanced=true]/process:pb-12 group-data-[enhanced=true]/process:pt-28">
                <div className="mx-auto flex w-full max-w-[530px] flex-col items-start">
                  <div className="mb-6 flex w-full items-center gap-3.5 border-b border-white/10 pb-5"><span className="grid size-10 place-items-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-xs font-semibold tabular-nums text-accent">0{index + 1}</span><p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-400">{step.label}</p><span className="ml-auto text-[10px] tabular-nums text-neutral-500">0{index + 1} / 03</span></div>
                  <h3 className="mb-5 text-[30px] font-medium leading-[1.12] tracking-[-0.045em] text-white min-[1100px]:text-[clamp(34px,3.3vw,52px)]">{step.title}</h3>
                  <p className="text-[13px] leading-[1.85] text-neutral-400 min-[1100px]:text-sm">{step.description}</p>
                  <ul className="grid w-full gap-3 py-6 text-[11px] leading-relaxed text-neutral-300 min-[1100px]:text-xs">{step.points.map(point => <li className="flex items-start gap-2.5" key={point}><span className="mt-px grid size-4 shrink-0 place-items-center rounded-full bg-blue-500/15 text-accent"><Check size={11} /></span>{point}</li>)}</ul>
                  <div className="mt-auto flex w-full items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4"><step.icon size={19} className="mt-1 shrink-0 text-accent" /><div><span className="text-[8px] font-semibold tracking-[0.12em] text-neutral-500">WHAT YOU LEAVE WITH</span><p className="mt-1.5 text-[11px] font-medium text-white min-[1100px]:text-xs">{step.deliverable}</p></div><ArrowUpRight size={15} className="ml-auto mt-1 shrink-0 text-neutral-500" /></div>
                </div>
                <div className="mx-auto w-full max-w-[530px]"><ProcessDiagram step={index} /></div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}