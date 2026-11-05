import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Search, Workflow, TrendingUp, Users, Database, MessageSquare, Zap } from 'lucide-react';
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

const TIMING = { expand: 0.7, gap: 0.15, hscroll: 2.2, contract: 0.7 };

function ProcessDiagram({ step }) {
  return (
    <div className={`journey-diagram journey-diagram-${step}`} aria-hidden="true">
      <div className="diagram-caption">{['SEE THE WHOLE PICTURE', 'BRING THE PIECES TOGETHER', 'MAKE PROGRESS VISIBLE'][step]}</div>
      {step === 0 && <div className="workflow-map"><div className="map-inputs"><span><Users size={18} />Your team</span><span><Database size={18} />Your tools</span><span><MessageSquare size={18} />Your customers</span></div><div className="map-junction"><Search size={26} /><span>A clearer picture</span></div><div className="map-result"><span className="diagram-dot" />The right opportunity</div></div>}
      {step === 1 && <div className="build-map"><div className="build-center"><Workflow size={32} /><span>Your system</span></div><div className="build-tools">{['Website', 'AI agents', 'Your CRM'].map(item => <span key={item}><Check size={14} />{item}</span>)}</div><p><span className="diagram-dot" />Connected. Tested. Ready.</p></div>}
      {step === 2 && <div className="growth-map"><div className="growth-bars">{[25, 40, 36, 58, 66, 83, 100].map((height, index) => <span key={index} style={{ height: `${height}%` }} />)}</div><div className="growth-labels"><span>Launch</span><span>Measure</span><span>Improve <TrendingUp size={15} /></span></div><p>Illustrating the improvement cycle</p></div>}
      <div className="diagram-bottom"><Zap size={13} /> YOUR BUSINESS, BETTER CONNECTED</div>
    </div>
  );
}

export default function Process() {
  const pinRef = useRef(null);
  const bgRef = useRef(null);
  const frameRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    const frame = frameRef.current;
    if (!track || !frame) return;

    const pin = pinRef.current;
    const bg = bgRef.current;
    const media = gsap.matchMedia();
    // Native scrolling remains the baseline on small or short screens.
    media.add('(min-width: 900px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)', () => {
      pin.classList.add('is-enhanced');
      const rest = { w: 0, h: 0 };
      const measure = () => {
        rest.w = frame.offsetWidth;
        rest.h = frame.offsetHeight;
      };
      measure();

      const ctx = gsap.context(() => {
        const timeline = gsap.timeline({
          defaults: { ease: 'power2.inOut' },
          scrollTrigger: {
            trigger: pin,
            start: 'top top',
            end: () => '+=' + Math.round(window.innerHeight * 3),
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });


        timeline
          .fromTo(
            bg,
            { xPercent: -50, yPercent: -50, width: () => rest.w, height: () => rest.h, borderRadius: 28 },
            { width: () => pin.offsetWidth, height: () => pin.offsetHeight, borderRadius: 0, duration: TIMING.expand, immediateRender: true }
          )
          .to(track, { x: () => -(track.scrollWidth - track.clientWidth), ease: 'none', duration: TIMING.hscroll }, `+=${TIMING.gap}`)
          .to(bg, { width: () => rest.w, height: () => rest.h, borderRadius: 28, duration: TIMING.contract }, `+=${TIMING.gap}`);
      }, pin);

      const onRefreshInit = () => {
        measure();
        gsap.set(bg, { width: rest.w, height: rest.h });
      };
      ScrollTrigger.addEventListener('refreshInit', onRefreshInit);

      return () => {
        ScrollTrigger.removeEventListener('refreshInit', onRefreshInit);
        ctx.revert();
        pin.classList.remove('is-enhanced');
      };
    });
    return () => media.revert();
  }, []);

  return (
    <section id="process" className="journey-section section-space">
      <div className="site-container pb-0 mb-0">
        <div className="section-intro">
          <SectionHeading dark label="Our process" title="From how you work." accent="To what’s possible." description="Three considered steps. One system that makes sense for your business." />
        </div>
      </div>
      <div ref={pinRef} className="process-pin">
        <div className="process-stage">
          <div ref={bgRef} className="process-card-bg" aria-hidden="true" />
          <div ref={frameRef} className="process-frame">
            <ol className="journey-track" id="process-slides" ref={trackRef} tabIndex={0} aria-label="Our three process steps. Scroll down on desktop, or swipe horizontally on smaller screens.">
              {steps.map((step, index) => <li className="journey-slide" key={step.label} aria-label={`Step ${index + 1}: ${step.label}`}>
                <div className="journey-copy"><p className="journey-step-label">STEP 0{index + 1} / {step.label.toUpperCase()}</p><h3>{step.title}</h3><p className="journey-description">{step.description}</p><ul>{step.points.map(point => <li key={point}><Check size={16} />{point}</li>)}</ul><div className="journey-deliverable"><span>WHAT YOU LEAVE WITH</span><p><step.icon size={18} />{step.deliverable}</p></div></div>
                <ProcessDiagram step={index} />
              </li>)}
            </ol>

          </div>
        </div>
      </div>
    </section>
  );
}
