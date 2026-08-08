import React, { useEffect } from "react";
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

  return (
    <main className="bg-black w-full max-w-screen">
      <Hero />
      <About />
      <Services />
      <Work />
      <Process />
      <CalBooking />
      {/* <Contact /> */}
      <Footer />
    </main>
  );
};

export default App;
