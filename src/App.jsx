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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay (e.g., 2 seconds)
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Disable scrolling while loading
    document.body.style.overflow = loading ? "hidden" : "auto";
  }, [loading]);

  return (
    <main className="bg-black w-full max-w-screen">
      {loading ? (
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
