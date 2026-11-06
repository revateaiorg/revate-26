import React, { useEffect, useRef } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Work from "./components/Work";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Process from "./components/Process";
import FAQ from "./components/FAQ";
import CalBooking from "./components/CalBooking";

const App = () => {
  const lenisRef = useRef(null);

  // Smooth scroll (must stay inside useEffect so your prerender step doesn't touch `window`)
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    const lenis = new Lenis({
      duration: 1.2, // higher = floatier, lower = snappier
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    // Keep scrolling locked while the preloader is showing
    if (document.getElementById("preloader-overlay")) lenis.stop();

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Smooth anchor links (#about, #contact, ...)
    const onClick = (e) => {
      const link = e.target.closest?.('a[href^="#"]');
      if (!link) return;
      const hash = link.getAttribute("href");

      if (hash === "#") {
        e.preventDefault();
        lenis.scrollTo(0);
        return;
      }

      let target = null;
      try {
        target = document.querySelector(hash);
      } catch {
        return;
      }
      if (!target) return;

      e.preventDefault();
      lenis.scrollTo(target, { offset: -100 }); // matches your scroll-margin-top
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", onClick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Preloader (unchanged, plus one line to unlock scrolling)
  useEffect(() => {
    const handleRemovePreloader = () => {
      const preloader = document.getElementById("preloader-overlay");
      if (preloader) {
        preloader.style.opacity = "0";
        document.body.style.overflow = "auto";
        lenisRef.current?.start(); // <-- unlock smooth scroll
        setTimeout(() => {
          preloader.remove();
        }, 500);
      }
    };

    if (document.readyState === "complete") {
      handleRemovePreloader();
    } else {
      window.addEventListener("load", handleRemovePreloader);
      const fallback = setTimeout(handleRemovePreloader, 3500);

      return () => {
        window.removeEventListener("load", handleRemovePreloader);
        clearTimeout(fallback);
      };
    }
  }, []);

  return (
    <main className="bg-black w-full max-w-screen grain-overlay">
      <Navbar />
      <div className="relative">
        <div className="sticky top-0 z-0">
          <Hero />
        </div>
        <div className="relative z-10 bg-white rounded-t-[2rem] md:rounded-t-[3.5rem] shadow-[0_-40px_80px_-25px_rgba(0,0,0,0.7)]">
          <About />
          <Services />
        </div>
      </div>

      <div className="relative z-20 max-w-screen overflow-x-hidden bg-black">
        <Work />
        <Process />
        <FAQ />
        {/* <CalBooking /> */}
        <Contact />
        <Footer />
      </div>
    </main>
  );
};

export default App;