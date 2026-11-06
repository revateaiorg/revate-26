import { useState } from 'react';
import SectionHeading from './SectionHeading';
import { ArrowUpRight, Plus } from 'lucide-react';
const questions = [
  ['What does Revate AI do?', 'Revate AI is an AI automation and web development agency. We build AI voice receptionists, AI chatbots, custom n8n workflow automations, websites, and UI/UX designs around your business processes.'],
  ['How can an AI voice receptionist help my business?', 'An AI voice receptionist can answer incoming calls, respond to common questions, collect caller details, book appointments, and route calls to your team. Its capabilities depend on your phone system, booking tools, and the call flows agreed for your project.'],
  ['Can you automate the tools we already use?', 'We assess your existing tools before recommending an automation. Where APIs or supported integrations are available, n8n workflows can connect systems such as your CRM, email, forms, calendars, and spreadsheets. We confirm integration requirements during discovery.'],
  ['How do you evaluate an AI system before launch?', 'We agree on success criteria for your workflow and test realistic scenarios, including incorrect inputs and handoffs to a person. Depending on the service, evaluation can include answer accuracy, booking completion, workflow reliability, usability, and page performance.'],
  ['Can AI handle every customer conversation?', 'AI works best with a defined scope and reliable business information. Complex, sensitive, or unsupported requests need a clear handoff to your team. We plan those boundaries with you rather than assuming every conversation can be automated.'],
  ['Will my website be built for search and AI discovery?', 'Our website work considers clear page structure, descriptive content, responsive layouts, performance, and relevant structured data. These foundations help search engines and AI systems understand your content. Search rankings and inclusion in AI-generated answers cannot be guaranteed.'],
  ['How much does a project cost, and how long does it take?', 'Cost and timing depend on the scope, integrations, content, and testing needed. After discussing your goals, we define the deliverables and provide a project-specific estimate. You can start with a free strategy call.'],
];
export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  const schema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: questions.map(([question, answer]) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })) };
  return (
    <section id="faq" className="py-24 font-content min-[700px]:rounded-[32px] min-[900px]:py-28">
      <div className="mx-auto grid w-[calc(100%-40px)] max-w-7xl gap-[42px] min-[600px]:w-[calc(100%-48px)] min-[900px]:grid-cols-[0.9fr_1.15fr] min-[900px]:gap-20">
        <div>
          <SectionHeading dark label="Questions, answered" title="A little clarity." accent="A confident next step." description="What to know before bringing AI and automation into your business." />
          <a className="mt-[26px] inline-flex items-center gap-3 whitespace-nowrap border-b border-white/20 py-3 text-sm font-medium text-slate-200 transition-colors hover:border-accent hover:text-accent" href="#contact">Let’s talk about your project <ArrowUpRight size={18} /></a>
        </div>
        <div>
          {questions.map(([question, answer], index) => {
            const isOpen = openIndex === index;
            return (
              <div key={question} className="border-b border-white/10 first:border-t">
                <h3 className="text-[15px] font-medium sm:text-base">
                  <button id={`faq-question-${index}`} aria-expanded={isOpen} aria-controls={`faq-answer-${index}`} onClick={() => setOpenIndex(isOpen ? null : index)} className={`flex w-full cursor-pointer items-center gap-3 py-[22px] text-left leading-[1.55] transition-colors sm:gap-4 sm:py-[25px] ${isOpen ? 'text-accent' : 'text-white'}`}>
                    <span className="text-[10px] text-slate-400">0{index + 1}</span>
                    <span className="flex-1">{question}</span>
                    <Plus size={19} aria-hidden="true" className={`shrink-0 text-slate-400 transition-transform duration-300 motion-reduce:transition-none ${isOpen ? 'rotate-45' : ''}`} />
                  </button>
                </h3>
                <div id={`faq-answer-${index}`} role="region" aria-labelledby={`faq-question-${index}`} aria-hidden={!isOpen} inert={!isOpen} className={`grid transition-[grid-template-rows,opacity] duration-400 ease-out motion-reduce:transition-none ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className="min-h-0 overflow-hidden"><p className="pb-[25px] pl-[25px] pr-2.5 text-[13px] leading-[1.85] text-slate-400 sm:px-8 sm:text-sm">{answer}</p></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    </section>
  );
}
