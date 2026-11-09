// components/Preloader.jsx
import React, { useEffect, useRef, useState } from "react";

/**
 * Percentage preloader
 * Counts 0 → 100%, holds briefly, then the curtain lifts.
 *
 * Props
 *  - onComplete: called after the exit animation finishes
 *  - duration:   count-up time from 0 to 100 (ms)
 */

const EXIT_MS = 900;
const HOLD_MS = 400;

const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const SCROLL_KEYS = new Set([
  " ", "ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End",
]);

const Preloader = ({ onComplete, duration = 2800 }) => {
  const [leaving, setLeaving] = useState(false);
  const numberRef = useRef(null);

  useEffect(() => {
    const reduce =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const total = reduce ? 800 : duration;

    // ---- Scroll lock -------------------------------------------------
    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    const prevRestoration = window.history.scrollRestoration;

    const toTop = () =>
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    window.history.scrollRestoration = "manual";
    toTop();
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    const block = (e) => e.preventDefault();
    const blockKeys = (e) => {
      if (SCROLL_KEYS.has(e.key)) e.preventDefault();
    };
    window.addEventListener("wheel", block, { passive: false });
    window.addEventListener("touchmove", block, { passive: false });
    window.addEventListener("keydown", blockKeys);

    const unlock = () => {
      window.removeEventListener("wheel", block);
      window.removeEventListener("touchmove", block);
      window.removeEventListener("keydown", blockKeys);
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      window.history.scrollRestoration = prevRestoration;
    };
    // ------------------------------------------------------------------

    const timers = [];
    let raf = 0;
    let start = 0;

    const tick = (now) => {
      if (!start) start = now;
      const t = Math.min((now - start) / total, 1);
      const value = Math.round(easeInOutCubic(t) * 100);

      if (numberRef.current) numberRef.current.textContent = value;

      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        timers.push(
          window.setTimeout(() => {
            toTop(); // page is at the top before the curtain lifts
            setLeaving(true);
          }, HOLD_MS)
        );
        timers.push(
          window.setTimeout(() => {
            toTop();
            unlock();
            onComplete?.();
          }, HOLD_MS + EXIT_MS)
        );
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      unlock();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration]);

  return (
    <div
      role="status"
      aria-label="Loading"
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#020308]"
      style={{
        transform: leaving ? "translateY(-100%)" : "translateY(0)",
        borderRadius: leaving ? "0 0 50% 50% / 0 0 16vh 16vh" : "0",
        transition: `transform ${EXIT_MS}ms cubic-bezier(0.76, 0, 0.24, 1), border-radius ${EXIT_MS}ms cubic-bezier(0.76, 0, 0.24, 1)`,
      }}
    >
      <div
        aria-hidden="true"
        className="select-none text-white"
        style={{
          fontFamily: '"DM Sans", sans-serif',
          fontSize: "clamp(56px, 14vw, 100px)",
          fontWeight: 300,
          lineHeight: 1,
          fontVariantNumeric: "tabular-nums",
          letterSpacing: "-0.02em",
        }}
      >
        <span ref={numberRef}>0</span>
        <span>%</span>
      </div>
    </div>
  );
};

export default Preloader;