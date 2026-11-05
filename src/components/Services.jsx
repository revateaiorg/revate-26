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
  const section = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.12 });
    if (edge.current) observer.observe(edge.current);
    if (section.current) observer.observe(section.current);
    return () => observer.disconnect();
  }, []);
  return (
    <section id="services" ref={section} className="services-section section-space">
      <div className="site-container">
        <div className="section-intro"><SectionHeading label="Our services" title="Good on their own." accent="Better, connected." description="From the first customer conversation to the work behind it, we build systems that work together around your business." /><a className="text-link" href="#contact">Find the right fit <ArrowUpRight size={18} /></a></div>
        <div className="service-network">
          <div className="network-spine" aria-hidden="true"><span /></div>
          {services.map(({ icon: Icon, ...service }) => (
            <article className="service-row" key={service.title}>
              <div className="service-node" aria-hidden="true"><Icon size={23} strokeWidth={1.5} /></div>
              <div className="service-name"><p className="micro-label">{service.label}</p><h3>{service.title}</h3></div>
              <div className="service-detail"><p>{service.body}</p><ul className="service-tags">{service.tags.map(tag => <li key={tag}>{tag}</li>)}</ul><p className="service-evaluation"><Activity size={15} aria-hidden="true" />{service.measure}</p></div>
              <a className="service-arrow" href="#contact" aria-label={`Discuss ${service.title}`}><ArrowUpRight size={23} /></a>
            </article>
          ))}
        </div>
        {/* <div className="evaluation-note"><span className="status-dot" aria-hidden="true" /><p><strong>Build. Test. Improve.</strong> We agree on success criteria with you, test realistic scenarios, and review the results before launch.</p></div> */}
        <div className="services-finish">
          <div className="finish-line" aria-hidden="true"><span /></div>
          <p><span className="status-dot" aria-hidden="true" />Thoughtfully built. Better connected.</p>
          <div className="finish-line" aria-hidden="true"><span /></div>
        </div>
      </div>
      <div className="services-edge" ref={edge} aria-hidden="true">
        <div />
      </div>
    </section>
  );
}
