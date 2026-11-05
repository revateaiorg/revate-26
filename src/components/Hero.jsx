import { ArrowUpRight, ArrowDown, Check } from 'lucide-react';
import { motion as Motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import BgVideo from '../assets/hero-bg-vid.webm';

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 520], reduceMotion ? [0, 0] : [0, -160]);
  const contentOpacity = useTransform(scrollY, [0, 420], reduceMotion ? [1, 1] : [1, 0]);
  return (
    <section className="hero-section" aria-labelledby="hero-title">
      {!reduceMotion && <video className="hero-video" src={BgVideo} autoPlay loop muted playsInline preload="metadata" aria-hidden="true" />}
      <div className="hero-shade" />
      <Motion.div className="hero-content" style={{ y: contentY, opacity: contentOpacity }}>
        <p className="section-eyebrow"><span aria-hidden="true" />AI automation & web development</p>
        <h1 id="hero-title">Less busywork.<br />More <span>business.</span></h1>
        <p className="hero-description">Revate AI builds AI voice receptionists, chatbots, n8n workflow automations, and custom websites that help your business respond faster and work smarter.</p>
        <div className="hero-actions">
          <a className="primary-link" href="https://cal.com/pradeep-srinivasan/free-strategy-call">Let’s build your next step <ArrowUpRight size={19} /></a>
          <a className="hero-secondary" href="#services">Explore our services <ArrowDown size={17} /></a>
        </div>
        <div className="hero-notes">{['Built around your workflow', 'Connected to your tools', 'Tested before launch'].map(item => <span key={item}><Check size={14} />{item}</span>)}</div>
      </Motion.div>
      <Motion.div className="hero-footer" style={{ opacity: contentOpacity }}><span>YOUR BUSINESS. A SMARTER WAY FORWARD.</span><a href="#about">Discover the difference <ArrowDown size={14} /></a></Motion.div>
    </section>
  );
}
