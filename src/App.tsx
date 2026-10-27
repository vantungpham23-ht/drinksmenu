import { useMemo } from "react";
import { CategoryNav } from "./components/CategoryNav";
import { MenuSection } from "./components/MenuSection";
import { SiteHeader } from "./components/SiteHeader";
import { VISIBLE_CATEGORIES } from "./data/menu";
import { useActiveCategory } from "./hooks/useActiveCategory";
import { useReveal } from "./hooks/useReveal";
import { useScrollToSection } from "./hooks/useScrollToSection";
import "./styles/app.css";

export default function App() {
  const categoryIds = useMemo(
    () => VISIBLE_CATEGORIES.map((category) => category.id),
    [],
  );

  const activeId = useActiveCategory(categoryIds, 150);
  const { scrollToSection, navRef } = useScrollToSection();
  const revealRef = useReveal<HTMLDivElement>();

  return (
    <div className="app" ref={revealRef}>
      <SiteHeader />

      <CategoryNav
        categories={VISIBLE_CATEGORIES}
        activeId={activeId}
        onSelect={scrollToSection}
        navRef={navRef}
      />

      <main className="menu">
        <div className="menu__inner">
          {VISIBLE_CATEGORIES.map((category, index) => (
            <MenuSection key={category.id} category={category} index={index} />
          ))}
        </div>

        <footer className="menu-footer">
          <span className="menu-footer__rule" aria-hidden="true" />
          <p className="menu-footer__text">
            <span>PHONK</span>
            <span className="menu-footer__dot" aria-hidden="true">
              ·
            </span>
            <span>ASIAN RESTAURANT</span>
          </p>
        </footer>
      </main>
    </div>
  );
}
