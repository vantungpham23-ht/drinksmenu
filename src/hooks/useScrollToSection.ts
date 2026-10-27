import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Smoothly scrolls a section into view, accounting for the sticky category nav.
 * Falls back to instant scrolling when the user prefers reduced motion.
 */
export function useScrollToSection() {
  const [offset, setOffset] = useState(0);
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const measure = () => {
      const nav = navRef.current;
      setOffset(nav ? nav.getBoundingClientRect().height : 0);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const scrollToSection = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (!el) return;

      const top =
        el.getBoundingClientRect().top + window.scrollY - offset - 26;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
    },
    [offset],
  );

  return { scrollToSection, navRef, offset };
}
