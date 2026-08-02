import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Work from "./components/Work";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";
import Process from "./components/Process";
import CalBooking from "./components/CalBooking";
// import ChatbotWidget from "./components/ChatbotWidget";

const App = () => {
  // During SSR/SSG pre-render, window is undefined so loading starts as false
  // so the actual page content is rendered into the static HTML (not the preloader).
  // On the client after hydration, the preloader activates normally.
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // We're now in the browser — activate the preloader on first client paint
    setMounted(true);
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Disable scrolling while loading
    document.body.style.overflow = loading ? "hidden" : "auto";
  }, [loading]);

  return (
    <main className="bg-black w-full max-w-screen">
      {mounted && loading ? (
        <Preloader />
      ) : (
        <>
          <Hero />
          <About />
          <Services />
          <Work />
          <Process />
          <CalBooking />
          {/* <Contact /> */}
          <Footer />
        </>
      )}
    </main>
  );
};

export default App;
