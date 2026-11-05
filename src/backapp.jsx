import React, { useEffect } from "react";
import { motion as Motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Work from "./components/Work";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Process from "./components/Process";
import CalBooking from "./components/CalBooking";

const App = () => {
  useEffect(() => {
    const handleRemovePreloader = () => {
      const preloader = document.getElementById("preloader-overlay");
      if (preloader) {
        preloader.style.opacity = "0";
        document.body.style.overflow = "auto";
        setTimeout(() => {
          preloader.remove();
        }, 500); // match CSS transition duration
      }
    };

    // If the page is already fully loaded, remove it immediately
    if (document.readyState === "complete") {
      handleRemovePreloader();
    } else {
      // Otherwise, wait for the load event (when all images and scripts are fully loaded)
      window.addEventListener("load", handleRemovePreloader);

      // Fallback safety timeout (3.5 seconds) in case a slow resource hangs the load event
      const fallback = setTimeout(handleRemovePreloader, 3500);

      return () => {
        window.removeEventListener("load", handleRemovePreloader);
        clearTimeout(fallback);
      };
    }
  }, []);

  const { scrollY } = useScroll();
  const reduceMotion = useReducedMotion();
  const heroOpacity = useTransform(scrollY, [0, 700], reduceMotion ? [1, 1] : [1, 0.6]);

  return (
    <main className="bg-black w-full max-w-screen grain-overlay">
      <Navbar />
      <div className="relative">
        <div className="sticky top-0 z-0">
          <Motion.div style={{ opacity: heroOpacity }}>
            <Hero />
          </Motion.div>
        </div>
        <div className="relative z-10 bg-white rounded-t-[2rem] md:rounded-t-[3.5rem] shadow-[0_-40px_80px_-25px_rgba(0,0,0,0.7)]">
          <About />
          <Services />
        </div>
      </div>

      <div className="relative z-20 bg-black">
        <Work />
        <Process />
        <CalBooking />
        <Contact />
        <Footer />
      </div>
    </main>
  );
};

export default App;
