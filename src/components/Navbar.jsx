import { useState, useEffect } from "react";
import Logo from "../assets/logo.png"; // Adjust the path as necessary

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const diff = currentScrollY - lastScrollY;

      // Always show navbar near the top of the page
      if (currentScrollY <= 20) {
        setIsVisible(true);
        lastScrollY = currentScrollY;
        return;
      }

      // Ignore minor jitter less than 8px
      if (Math.abs(diff) < 8) {
        return;
      }

      if (diff > 0) {
        // Scrolling down -> hide navbar
        if (!isMenuOpen) {
          setIsVisible(false);
        }
      } else {
        // Scrolling up -> animate navbar down from top into view
        setIsVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    setIsMenuOpen(false); // Close the menu
  };

  return (
    <nav
      className={`font-content fixed top-3 md:top-5 left-0 w-full z-50 px-4 transition-transform duration-350 ease-out ${
        isVisible ? "translate-y-0" : "-translate-y-[150%] pointer-events-none"
      }`}
    >
      <div className="md:max-w-[1300px] mx-auto bg-black/40 backdrop-blur-lg border border-white/15 shadow-lg rounded-2xl text-white px-5 py-3 md:py-4">
        <div className=" flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            {/* <span className="text-xl font-semibold ml-2">Radison</span> */}
            <a href="/" aria-label="Revate AI Homepage" target="_blank" rel="noopener noreferrer">
              <img src={Logo} alt="Revate AI Logo" className="w-30 md:w-35" />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8  font-light gap-2">
            {/* <a href="/" className="hover:text-gray-300 transition-colors" target="_blank" rel="noopener noreferrer">
              Home
            </a> */}
            <a
              href="#about"
              className="hover:text-gray-300 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById("about");
                if (el) {
                  const y =
                    el.getBoundingClientRect().top + window.pageYOffset - 100;
                  window.scrollTo({ top: y, behavior: "smooth" });
                }
              }}
            >
              About Us
            </a>
            <a
              href="#services"
              className="hover:text-gray-300 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById("services");
                if (el) {
                  const y =
                    el.getBoundingClientRect().top + window.pageYOffset - 100;
                  window.scrollTo({ top: y, behavior: "smooth" });
                }
              }}
            >
              Services
            </a>
            <a
              href="#works"
              className="hover:text-gray-300 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById("works");
                if (el) {
                  const y =
                    el.getBoundingClientRect().top + window.pageYOffset - 100;
                  window.scrollTo({ top: y, behavior: "smooth" });
                }
              }}
            >
              Works
            </a>
            <a
              href="#process"
              className="hover:text-gray-300 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById("process");
                if (el) {
                  const y =
                    el.getBoundingClientRect().top + window.pageYOffset - 100;
                  window.scrollTo({ top: y, behavior: "smooth" });
                }
              }}
            >
              Process
            </a>
            <a
              href="#contact"
              className="hover:text-gray-300 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById("contact");
                if (el) {
                  const y =
                    el.getBoundingClientRect().top + window.pageYOffset - 100;
                  window.scrollTo({ top: y, behavior: "smooth" });
                }
              }}
            >
              Contact Us
            </a>
          </div>

          {/* Get in touch button - Desktop */}
          <div className="hidden md:block">
            <div className="relative inline-flex  group">
              <div className="absolute  -inset-px bg-[#3B82F6] rounded-xl blur-sm group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>

              <a
                href="https://cal.com/pradeep-srinivasan/free-strategy-call"
                target="_blank"
                rel="noopener noreferrer"
                className=" cursor-pointer relative inline-flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 duration-200  bg-[#3B82F6] hover:bg-[#2563EB]  text-white px-6 py-2 rounded-lg "
              >
                Get in touch
              </a>
            </div>
          </div>

          {/* Mobile Hamburger Menu */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation menu"
              className="flex flex-col justify-center items-center w-8 h-8 space-y-1 focus:outline-none"
            >
              <div
                className={`w-6 h-0.5 bg-white transition-all duration-300 ease-in-out ${
                  isMenuOpen ? "rotate-45 translate-y-1.5" : ""
                }`}
              ></div>
              <div
                className={`w-6 h-0.5 bg-white transition-all duration-300 ease-in-out ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              ></div>
              <div
                className={`w-6 h-0.5 bg-white transition-all duration-300 ease-in-out ${
                  isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                }`}
              ></div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-8 pb-4">
            <div className="flex flex-col space-y-8">
              {/* <a href="/" className="hover:text-gray-300 transition-colors" target="_blank" rel="noopener noreferrer">
                Home
              </a> */}
              <a
                href="#about"
                className="hover:text-gray-300 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("about");
                }}
              >
                About Us
              </a>

              <a
                href="#services"
                className="hover:text-gray-300 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("services");
                }}
              >
                Our Services
              </a>

              <a
                href="#works"
                className="hover:text-gray-300 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("works");
                }}
              >
                Works
              </a>

              <a
                href="#process"
                className="hover:text-gray-300 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("process");
                }}
              >
                Process
              </a>

              <a
                href="#contact"
                className="hover:text-gray-300 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("contact");
                }}
              >
                Contact Us
              </a>

              <div className="relative inline-flex  group">
                <div className="absolute  -inset-px bg-[#3B82F6] rounded-xl blur-sm group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>

                <a
                  href="https://cal.com/pradeep-srinivasan/free-strategy-call"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full cursor-pointer relative inline-flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 duration-200  bg-[#3B82F6] hover:bg-[#2563EB]  text-white px-6 py-2 rounded-lg "
                >
                  Get in touch
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
