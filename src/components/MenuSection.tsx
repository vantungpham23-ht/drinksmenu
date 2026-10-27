import { MenuRow } from "./MenuRow";
import { PhinMarker } from "./PhinMarker";
import type { MenuCategory } from "../data/menu";

type Props = {
  category: MenuCategory;
  index: number;
};

/** One editorial menu section: heading, kicker and the list of priced drinks. */
export function MenuSection({ category, index }: Props) {
  const visibleItems = category.items.filter((item) => item.price !== null);
  const phinItems = visibleItems.filter((item) => item.marker === "phin");
  const pouredItems = visibleItems.filter((item) => item.marker !== "phin");

  if (category.featured) {
    return (
      <section
        className="menu-section menu-section--featured"
        id={category.id}
        aria-labelledby={`${category.id}-heading`}
        data-reveal
        style={{ "--i": index } as React.CSSProperties}
      >
        <div className="featured__frame" aria-hidden="true" />
        <div className="featured__inner">
          <header className="menu-section__head featured__head">
            <div className="menu-section__meta">
              <span className="featured__badge">Signature</span>
              <span className="menu-section__index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <h2
              className="menu-section__title featured__title"
              id={`${category.id}-heading`}
            >
              {category.label}
            </h2>
            <p className="menu-section__kicker featured__kicker">
              {category.kicker}
            </p>
          </header>

          <ul className="menu-list featured__list">
            {visibleItems.map((item, i) => (
              <MenuRow key={item.name} item={item} index={i} />
            ))}
          </ul>
        </div>
      </section>
    );
  }

  const hasPhin = phinItems.length > 0;

  return (
    <section
      className="menu-section"
      id={category.id}
      aria-labelledby={`${category.id}-heading`}
      data-reveal
      style={{ "--i": index } as React.CSSProperties}
    >
      <header className="menu-section__head">
        <div className="menu-section__rule" aria-hidden="true" />
        <div className="menu-section__meta">
          <span className="menu-section__index" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h2 className="menu-section__title" id={`${category.id}-heading`}>
            {category.label}
          </h2>
        </div>
        <p className="menu-section__kicker">{category.kicker}</p>
      </header>

      {hasPhin && (
        <>
          <div className="menu-group">
            <p className="menu-group__label">
              <PhinMarker className="menu-group__icon" />
              <span className="menu-group__text">
                <strong>Served with phin</strong>
                <em>
                  The metal filter is placed on the glass and the coffee drips
                  slowly through it — the way it is done in Vietnam. Allow a
                  little time.
                </em>
              </span>
            </p>
            <ul className="menu-list menu-list--phin">
              {phinItems.map((item, i) => (
                <MenuRow key={item.name} item={item} index={i} />
              ))}
            </ul>
          </div>

          <div className="menu-group">
            <p className="menu-group__label menu-group__label--plain">
              <span className="menu-group__text">
                <strong>Pre-brewed, poured over ice</strong>
                <em>No filter — the coffee is made first, then poured.</em>
              </span>
            </p>
            <ul className="menu-list">
              {pouredItems.map((item, i) => (
                <MenuRow key={item.name} item={item} index={i} />
              ))}
            </ul>
          </div>
        </>
      )}

      {!hasPhin && (
        <ul className="menu-list">
          {visibleItems.map((item, i) => (
            <MenuRow key={item.name} item={item} index={i} />
          ))}
        </ul>
      )}
    </section>
  );
}
