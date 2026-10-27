import { useEffect, useLayoutEffect, useRef, useState } from "react";

type CategoryLink = {
  id: string;
  label: string;
  featured?: boolean;
};

type Props = {
  categories: CategoryLink[];
  activeId: string;
  onSelect: (id: string) => void;
  navRef: React.RefObject<HTMLElement | null>;
};

export function CategoryNav({ categories, activeId, onSelect, navRef }: Props) {
  const listRef = useRef<HTMLDivElement | null>(null);
  const chipRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const [indicator, setIndicator] = useState({ left: 0, width: 0, ready: false });

  // Position the sliding active indicator behind the active chip.
  useLayoutEffect(() => {
    const chip = chipRefs.current.get(activeId);
    const list = listRef.current;
    if (!chip || !list) return;

    const update = () => {
      setIndicator({
        left: chip.offsetLeft,
        width: chip.offsetWidth,
        ready: true,
      });
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(chip);
    ro.observe(list);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [activeId, categories.length]);

  // Keep the active chip visible in the horizontal strip.
  useEffect(() => {
    const chip = chipRefs.current.get(activeId);
    const list = listRef.current;
    if (!chip || !list) return;

    const chipLeft = chip.offsetLeft;
    const chipRight = chipLeft + chip.offsetWidth;
    const viewLeft = list.scrollLeft;
    const viewRight = viewLeft + list.clientWidth;

    if (chipLeft < viewLeft + 12) {
      list.scrollTo({ left: Math.max(chipLeft - 16, 0), behavior: "smooth" });
    } else if (chipRight > viewRight - 12) {
      list.scrollTo({
        left: chipRight - list.clientWidth + 16,
        behavior: "smooth",
      });
    }
  }, [activeId]);

  return (
    <nav
      ref={navRef}
      className="cat-nav"
      aria-label="Menu categories"
      data-reveal
    >
      <div className="cat-nav__inner">
        <div className="cat-nav__track" ref={listRef}>
          <span
            className={`cat-nav__indicator${indicator.ready ? " is-ready" : ""}`}
            style={{
              transform: `translateX(${indicator.left}px)`,
              width: indicator.width,
            }}
            aria-hidden="true"
          />
          {categories.map((category) => {
            const isActive = category.id === activeId;
            return (
              <button
                key={category.id}
                type="button"
                className={`cat-nav__chip${isActive ? " is-active" : ""}${
                  category.featured ? " cat-nav__chip--featured" : ""
                }`}
                aria-current={isActive ? "true" : undefined}
                ref={(node) => {
                  if (node) chipRefs.current.set(category.id, node);
                  else chipRefs.current.delete(category.id);
                }}
                onClick={() => onSelect(category.id)}
              >
                {category.featured ? (
                  <>
                    <span className="cat-nav__star" aria-hidden="true">
                      ✦
                    </span>
                    {category.label}
                  </>
                ) : (
                  category.label
                )}
              </button>
            );
          })}
        </div>
        <span className="cat-nav__fade" aria-hidden="true" />
      </div>
    </nav>
  );
}
