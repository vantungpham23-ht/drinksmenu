import { useEffect, useRef, useState } from "react";

/**
 * Tracks which category section is currently in view.
 * Uses a scroll listener (rAF-throttled) so the active chip always matches
 * the section the user is actually looking at.
 */
export function useActiveCategory(ids: string[], offset = 140) {
  const [activeId, setActiveId] = useState(ids[0] ?? "");
  const ticking = useRef(false);

  useEffect(() => {
    if (ids.length === 0) return;

    const compute = () => {
      ticking.current = false;
      const scrollY = window.scrollY;
      let current = ids[0];

      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + scrollY;
        if (top - offset <= scrollY) {
          current = id;
        }
      }

      // Bottom of the page: make sure the last category can always win.
      if (window.innerHeight + scrollY >= document.body.scrollHeight - 8) {
        current = ids[ids.length - 1];
      }

      setActiveId((prev) => (prev === current ? prev : current));
    };

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids, offset]);

  return activeId;
}
