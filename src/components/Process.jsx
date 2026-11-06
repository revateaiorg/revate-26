import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Search, Workflow, TrendingUp, Users, Database, MessageSquare, ArrowDown, ArrowUpRight, Layers3, ShieldCheck, SlidersHorizontal, CircleCheck } from 'lucide-react';
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

function DiagramRow({ icon: Icon, title, detail, index }) {
  return (
    <div className="flex items-center gap-3.5 rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 sm:p-4">
      <span className="grid size-11 shrink-0 place-items-center rounded-[14px] border border-blue-500/20 bg-blue-500/10 text-accent"><Icon size={22} strokeWidth={1.5} /></span>
      <div className="min-w-0 flex-1"><p className="text-xs font-medium text-white sm:text-[13px]">{title}</p><p className="mt-1 text-[10px] leading-relaxed text-neutral-400 sm:text-[11px]">{detail}</p></div>
      <span className="text-[10px] tabular-nums text-neutral-500">0{index + 1}</span>
    </div>
  );
}

function ProcessDiagram({ step }) {
  const visuals = [
    { label: 'A CLEARER PICTURE', heading: 'Connect the dots.', caption: 'Your business, understood.', rows: [[Users, 'Your people', 'How your team works together'], [Database, 'Your tools', 'Where information lives'], [MessageSquare, 'Your customers', 'Every enquiry and handoff']] },
    { label: 'BUILT AROUND YOU', heading: 'One connected system.', caption: 'Every connection has a purpose.' },
    { label: 'A USEFUL NEXT STEP', heading: 'Keep getting better.', caption: 'Learn. Refine. Repeat.', rows: [[Search, 'Measure what matters', 'Review the goals we agreed on'], [SlidersHorizontal, 'Refine the experience', 'Resolve friction from real use'], [TrendingUp, 'Plan what comes next', 'Prioritise the next opportunity']] },
  ];
  const visual = visuals[step];
  return (
    <div aria-hidden="true" className="relative flex w-full flex-col overflow-hidden rounded-[24px] border border-white/10 bg-black bg-[radial-gradient(120%_80%_at_0%_0%,rgba(59,130,246,0.14),transparent_60%)] p-5 sm:p-7 min-[1100px]:p-8">
      <span className="absolute -right-2 -top-5 select-none text-[150px] font-semibold leading-none tracking-[-0.08em] text-white/[0.04]">0{step + 1}</span>
      <div className="relative mb-6 flex items-center gap-2 text-[9px] font-semibold tracking-[0.14em] text-neutral-400"><span className="size-1.5 rounded-full bg-accent" />{visual.label}</div>
      <h4 className="relative mb-6 text-2xl font-medium tracking-[-0.035em] text-white sm:text-[28px]">{visual.heading}</h4>
      {visual.rows ? (
        <div className="relative grid gap-2.5">{visual.rows.map(([Icon, title, detail], index) => <DiagramRow key={title} icon={Icon} title={title} detail={detail} index={index} />)}</div>
      ) : (
        <div className="relative flex flex-col items-center">
          <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-[11px] text-neutral-300"><MessageSquare size={16} />A customer enquiry</div>
          <span className="flex h-8 items-center text-blue-400/60"><ArrowDown size={20} /></span>
          <div className="flex w-full items-center gap-4 rounded-[20px] border border-blue-500/30 bg-black p-5 shadow-[0_0_40px_rgba(59,130,246,0.15)]">
            <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-accent text-white shadow-[0_0_0_5px_#3b82f620]"><Workflow size={29} strokeWidth={1.5} /></span>
            <div><p className="text-sm font-medium text-white">Your custom system</p><p className="mt-1.5 text-[10px] text-neutral-400">The right action, at the right time.</p></div>
          </div>
          <div className="grid w-full grid-cols-3 gap-2 pt-7">{[[Layers3, 'Connect tools'], [ShieldCheck, 'Test scenarios'], [Users, 'Human handoff']].map(([Icon, label]) => <div key={label} className="relative grid justify-items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-1 py-4 before:absolute before:bottom-full before:left-1/2 before:h-7 before:w-px before:bg-white/15"><Icon size={21} strokeWidth={1.5} className="text-accent" /><span className="text-center text-[9px] text-neutral-400">{label}</span></div>)}</div>
        </div>
      )}
      <div className="relative mt-6 flex items-center gap-2 border-t border-white/10 pt-4 text-[10px] text-neutral-400"><CircleCheck size={14} className="text-accent" />{visual.caption}</div>
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