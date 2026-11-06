import { PhoneCall, Workflow, MessageSquare, Code2, PenTool, ArrowUpRight, Activity } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { useEffect, useRef } from 'react';

const services = [
  { icon: PhoneCall, label: '01 / CONVERSATIONS', title: 'AI voice receptionists', body: 'Answer calls, handle common questions, book appointments, and route conversations to your team. A helpful first response, even outside office hours.', tags: ['Call handling', 'Appointment booking', 'Human handoff'], measure: 'Evaluate call accuracy, booking completion, and handoff quality.' },
  { icon: Workflow, label: '02 / OPERATIONS', title: 'AI workflow automation', body: 'Connect your CRM, forms, email, and everyday tools with custom n8n workflows. Keep information moving without the repetitive copy and paste.', tags: ['n8n workflows', 'CRM integrations', 'Connected tools'], measure: 'Evaluate time saved, successful runs, and exception handling.' },
  { icon: MessageSquare, label: '03 / CUSTOMER EXPERIENCE', title: 'AI chatbots', body: 'Help visitors find answers using your business information, capture enquiries, and pass complex questions to your team with useful context.', tags: ['Business knowledge', 'Lead capture', 'Customer support'], measure: 'Evaluate answer quality, lead capture, and escalation accuracy.' },
  { icon: Code2, label: '04 / DIGITAL PRESENCE', title: 'Custom web development', body: 'Give your business a fast, responsive website with clear content and an intuitive path from first visit to enquiry. Built with search visibility in mind.', tags: ['Business websites', 'Responsive builds', 'Technical SEO'], measure: 'Evaluate page speed, accessibility, and enquiry journeys.' },
  { icon: PenTool, label: '05 / PRODUCT DESIGN', title: 'UI/UX design', body: 'Turn complex ideas into clear digital experiences. We map user journeys, prototype the important interactions, and design interfaces people can navigate.', tags: ['User journeys', 'Prototypes', 'Design systems'], measure: 'Evaluate usability, task completion, and design consistency.' },
];

export default function Services() {
  const edge = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.dataset.visible = 'true';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    if (edge.current) observer.observe(edge.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className="relative bg-surface pt-16 font-content min-[600px]:pt-20 min-[900px]:pt-28">
      <div className="mx-auto w-[calc(100%-40px)] max-w-7xl min-[600px]:w-[calc(100%-48px)]">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-5 sm:mb-15 sm:flex-nowrap sm:gap-8">
          <SectionHeading label="Our services" title="Good on their own." accent="Better, connected." description="From the first customer conversation to the work behind it, we build systems that work together around your business." />
          <a className="inline-flex items-center gap-3 whitespace-nowrap border-b border-slate-300 py-3 text-sm font-medium transition-colors hover:text-accent" href="#contact">
            Find the right fit <ArrowUpRight size={18} />
          </a>
        </div>

        <div className="relative">
          <div aria-hidden="true" className="absolute bottom-[90px] left-5 top-15 w-px overflow-hidden bg-connection min-[600px]:left-[23px] min-[900px]:left-7">
            <span className="absolute -top-20 h-20 w-px animate-spine-flow bg-gradient-to-b from-transparent to-accent motion-reduce:animate-none" />
          </div>
          {services.map(({ icon: Icon, ...service }, index) => (
            <article key={service.title} className={`group relative grid grid-cols-[42px_1fr_34px] items-start gap-x-[18px] gap-y-5 py-[34px] min-[600px]:grid-cols-[48px_1fr_40px] min-[600px]:gap-6 min-[600px]:py-[42px] min-[900px]:grid-cols-[58px_1fr_1.35fr_48px] min-[900px]:gap-8 ${index > 0 ? 'before:absolute before:inset-x-0 before:top-0 before:ml-15 before:border-t before:border-line min-[600px]:before:ml-[72px] min-[900px]:before:ml-[90px]' : ''}`}>
              <div className="col-start-2 min-w-0">
                <p className="text-[8px] font-semibold tracking-[0.12em] text-slate-500 min-[600px]:text-[10px]">{service.label}</p>
                <h3 className="relative mt-[13px] pl-[13px] text-[25px] font-medium leading-[1.15] tracking-[-0.035em] text-ink min-[600px]:pl-4 min-[600px]:text-[clamp(24px,2.5vw,34px)]">
                  <span aria-hidden="true" className="absolute -left-15 top-1/2 grid size-[42px] -translate-y-1/2 place-items-center rounded-[15px] border border-connection bg-surface text-accent shadow-[0_0_0_9px_var(--surface)] min-[600px]:-left-[72px] min-[600px]:size-12 min-[900px]:-left-[90px] min-[900px]:size-[58px] min-[900px]:rounded-[18px]">
                    <Icon size={23} strokeWidth={1.5} />
                  </span>
                  <span aria-hidden="true" className="absolute -left-[18px] top-1/2 h-px w-[18px] bg-connection min-[600px]:-left-6 min-[600px]:w-6 min-[900px]:-left-8 min-[900px]:w-8" />
                  <span aria-hidden="true" className="absolute left-0 top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_0_5px_#3979ed0d]" />
                  {service.title}
                </h3>
              </div>
              <div className="col-start-2 col-end-4 min-[900px]:col-start-3 min-[900px]:col-end-4">
                <p className="text-sm leading-[1.75] text-ink-muted min-[600px]:text-[15px]">{service.body}</p>
                <ul className="my-[18px] flex flex-wrap gap-x-4 gap-y-2">
                  {service.tags.map(tag => <li className="flex items-center gap-1.5 text-[11px] text-ink-muted" key={tag}><span aria-hidden="true" className="size-[3px] rounded-full bg-slate-400" />{tag}</li>)}
                </ul>
                <p className="flex items-start gap-[9px] text-xs leading-[1.75] text-ink-muted"><Activity size={15} aria-hidden="true" className="mt-[3px] shrink-0" />{service.measure}</p>
              </div>
              <a className="col-start-3 row-start-1 grid size-[34px] place-items-center rounded-full border border-line text-slate-600 transition-colors group-hover:bg-accent group-hover:text-white min-[600px]:size-10 min-[900px]:col-start-4 min-[900px]:size-[46px]" href="#contact" aria-label={`Discuss ${service.title}`}>
                <ArrowUpRight size={23} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none" />
              </a>
            </article>
          ))}
        </div>

        <div className="mt-2.5 flex items-center gap-3.5 pb-7 pt-6 min-[600px]:mt-7 min-[600px]:gap-7 min-[600px]:pb-16 min-[600px]:pt-11">
          {[0, 1, 2].map(index => index === 1 ? (
            <p key={index} className="flex items-center gap-2 whitespace-nowrap text-[9px] text-ink-muted min-[600px]:gap-3 min-[600px]:text-xs"><span className="size-[7px] shrink-0 rounded-full bg-accent shadow-[0_0_0_4px_#3979ed12]" />Thoughtfully built. Better connected.</p>
          ) : (
            <div key={index} aria-hidden="true" className={`relative h-px flex-1 overflow-hidden bg-line ${index === 2 ? 'rotate-180' : ''}`}><span className="absolute h-px w-15 animate-finish-flow bg-gradient-to-r from-transparent to-accent motion-reduce:animate-none" /></div>
          ))}
        </div>
      </div>
      <div ref={edge} aria-hidden="true" className="group h-[45px] bg-black min-[700px]:h-[72px]">
        <div className="h-full w-full rounded-b-2xl bg-surface transition-[border-radius] duration-800 ease-out group-data-[visible=true]:rounded-b-[64px] motion-reduce:transition-none" />
      </div>
    </section>
  );
}
