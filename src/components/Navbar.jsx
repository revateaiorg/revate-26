import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Logo from "../assets/logo.png"; // Adjust the path as necessary

// `target` = the section id to scroll to (defaults to `id`)
const NAV_LINKS = [
  { id: "about", label: "About Us" },
  { id: "services", label: "Services" },
  { id: "works", label: "Works" },
  { id: "process", label: "Process" },
  { id: "faq", label: "FAQs", target: "contact" },
];

const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncR type='linear' slope='1.8' intercept='-0.4'/%3E%3CfeFuncG type='linear' slope='1.8' intercept='-0.4'/%3E%3CfeFuncB type='linear' slope='1.8' intercept='-0.4'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) {
    const y = el.getBoundingClientRect().top + window.pageYOffset - 100;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
};

const ArrowIcon = ({ className = "h-4 w-4" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  Full-screen mobile menu                                            */
/*  Rendered in a portal: the navbar uses transform + backdrop-blur,  */
/*  which would otherwise trap a `fixed` child inside the navbar box. */
/* ------------------------------------------------------------------ */
const MobileMenu = ({ isOpen, onClose, onNavigate }) => {
  // Portals require a real browser DOM and cannot be pre-rendered.
  if (import.meta.env.SSR) return null;

  const reveal = (i, base = 180) => ({
    transitionDelay: isOpen ? `${base + i * 70}ms` : "0ms",
  });
  const itemClass = `transition-all duration-700 ease-out ${isOpen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
    }`;

  return createPortal(
    <div
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-[60] md:hidden bg-[#02040a] text-white font-content
        transition-[clip-path,visibility] duration-[650ms] ease-[cubic-bezier(0.76,0,0.24,1)]
        ${isOpen
          ? "visible [clip-path:inset(0_0_0_0)]"
          : "invisible [clip-path:inset(0_0_100%_0)]"
        }`}
    >
      {/* Blue glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_40%_at_50%_28%,rgba(59,130,246,0.16),transparent_70%),radial-gradient(90%_32%_at_50%_100%,rgba(37,99,235,0.28),transparent_70%)]"
      />
      {/* Grain */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.3] mix-blend-overlay"
        style={{ backgroundImage: GRAIN, backgroundSize: "220px 220px" }}
      />

      <div className="relative flex h-[100dvh] flex-col px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-5">
        {/* Top bar: logo + close */}
        <div className="flex items-center justify-between">
          <a href="/" aria-label="Revate AI Homepage" onClick={onClose}>
            <img src={Logo} alt="Revate AI Logo" className="w-30" />
          </a>

          <button
            onClick={onClose}
            aria-label="Close navigation menu"
            tabIndex={isOpen ? 0 : -1}
            className="grid h-10 w-10 place-items-center rounded-xl border border-white/15 bg-white/5 text-blue-300 transition-all duration-300 hover:bg-white/10 active:scale-90 focus:outline-none"
          >
            <svg
              className={`h-5 w-5 transition-transform duration-500 ${isOpen ? "rotate-0" : "-rotate-90"
                }`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {/* Label */}
        {/* <p
          className={`mt-[7svh] font-mono text-[13px] tracking-[0.18em] text-blue-400 ${itemClass}`}
          style={reveal(0)}
        >
          {"// NAVIGATION"}
        </p> */}

        {/* Links */}
        <nav aria-label="Mobile navigation" className="mt-[7svh] flex flex-col">
          {NAV_LINKS.map(({ id, label, target }, i) => (
            <a
              key={id}
              href={`#${id}`}
              tabIndex={isOpen ? 0 : -1}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(target ?? id);
              }}
              style={reveal(i + 1)}
              className={`group flex items-center justify-between border-white/[0.07] py-[1.7svh] ${itemClass}`}
            >
              <span className="text-[clamp(28px,5.6svh,40px)] font-medium leading-none tracking-tight text-white transition-colors duration-300 group-active:text-blue-400">
                {label}
              </span>
              <span className="flex items-center gap-3">
                <span className="font-mono text-xs text-white/30">
                  0{i + 1}
                </span>
                <ArrowIcon className="h-4 w-4 -translate-x-2 text-blue-400 opacity-0 transition-all duration-300 group-active:translate-x-0 group-active:opacity-100" />
              </span>
            </a>
          ))}
        </nav>

        {/* Footer */}
        <div className="mt-auto">
          <p
            className={`mb-5 font-mono text-xs tracking-[0.16em] text-white/45 ${itemClass}`}
            style={reveal(NAV_LINKS.length + 2)}
          >
            AI-POWERED WEB AGENCY
          </p>

          <div
            className={`group relative ${itemClass}`}
            style={reveal(NAV_LINKS.length + 3)}
          >
            <div className="absolute -inset-1 rounded-3xl bg-blue-500/40 blur-xl opacity-60 transition-all duration-500 group-active:opacity-100" />
            <a
              href="#contact"
              tabIndex={isOpen ? 0 : -1}
              onClick={(e) => {
                e.preventDefault();
                onNavigate("contact");
              }}
              className="relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl px-6 py-4 text-sm font-medium uppercase tracking-[0.18em] text-white
                bg-gradient-to-b from-blue-400 to-blue-600
                shadow-[inset_0_1px_0_0_rgba(255,255,255,0.35),0_10px_28px_-8px_rgba(59,130,246,0.85)]
                transition-all duration-300 active:scale-[0.98] focus:outline-none"
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-out group-active:translate-x-full" />
              <span className="relative">Get in touch</span>
              <ArrowIcon className="relative h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

/* ------------------------------------------------------------------ */

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

  // While the full-screen menu is open: lock page scroll, close on Esc / when resized to desktop
  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close the menu first (unlocks scrolling), then scroll to the section
  const handleMobileNavigate = (id) => {
    setIsMenuOpen(false);
    window.setTimeout(() => scrollToSection(id), 120);
  };

  return (
    <>
      <nav
        className={`font-content fixed top-3 md:top-5 left-0 w-full z-50 px-4 transition-transform duration-350 ease-out ${isVisible ? "translate-y-0" : "-translate-y-[150%] pointer-events-none"
          }`}
      >
        <div className="md:max-w-[1300px] mx-auto bg-black/20 backdrop-blur-md border border-white/15 shadow-lg rounded-2xl text-white px-5 py-3 md:py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <a
                href="/"
                aria-label="Revate AI Homepage"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={Logo} alt="Revate AI Logo" className="w-30 md:w-35" />
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8 font-light gap-2">
              {NAV_LINKS.map(({ id, label, target }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="hover:text-gray-300 transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(target ?? id);
                  }}
                >
                  {label}
                </a>
              ))}
            </div>

            {/* Get in touch button - Desktop */}
            <div className="hidden md:block">
              <div className="group relative inline-flex">
                {/* Ambient glow */}
                <div className="absolute -inset-1 rounded-2xl bg-blue-500/40 blur-lg opacity-50 transition-all duration-500 group-hover:opacity-100"></div>

                <a
                  href="#contact"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative inline-flex items-center gap-2 overflow-hidden rounded-xl px-6 py-2 text-white
        bg-gradient-to-b from-blue-400 to-blue-600
        shadow-[inset_0_1px_0_0_rgba(255,255,255,0.35),0_6px_18px_-6px_rgba(59,130,246,0.8)]
        transition-all duration-300 ease-out
        hover:-translate-y-0.5 active:translate-y-0 active:scale-95
        focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 motion-reduce:transition-none"
                >
                  {/* Shimmer sweep */}
                  <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"></span>

                  <span className="relative">Get in touch</span>
                  <ArrowIcon className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </div>

            {/* Mobile Hamburger Menu */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                aria-expanded={isMenuOpen}
                aria-label="Open navigation menu"
                className="flex flex-col justify-center items-center w-8 h-8 space-y-1 focus:outline-none"
              >
                <div className="w-6 h-0.5 bg-white"></div>
                <div className="w-4 h-0.5 bg-white self-end mr-1"></div>
                <div className="w-6 h-0.5 bg-white"></div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Full-screen mobile menu */}
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={handleMobileNavigate}
      />
    </>
  );
};

export default Navbar;
