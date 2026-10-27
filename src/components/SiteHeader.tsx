import { BrandMark } from "./BrandMark";

/**
 * Compact brand header. Deliberately free of marketing copy, contact details
 * and secondary sections — brand + title + a living accent, nothing more.
 */
export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__glow" aria-hidden="true" />
      <div className="site-header__inner">
        <div className="site-header__top">
          <BrandMark className="site-header__mark" />
          <span className="site-header__pulse" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        </div>

        <div className="site-header__title-row">
          <h1 className="site-header__title">
            <span className="site-header__title-line">DRINKS</span>
            <span className="site-header__title-line site-header__title-line--alt">
              MENU
            </span>
          </h1>
          <span className="site-header__seal" aria-hidden="true">
            <svg viewBox="0 0 100 100" role="presentation">
              <defs>
                {/* Text rides on its own radius, clear of the decorative rings */}
                <path
                  id="seal-path"
                  d="M50,50 m-34,0 a34,34 0 1,1 68,0 a34,34 0 1,1 -68,0"
                />
              </defs>
              <circle cx="50" cy="50" r="45" className="seal__ring" />
              <circle cx="50" cy="50" r="22" className="seal__ring seal__ring--inner" />
              <text>
                <textPath href="#seal-path" startOffset="0%">
                  THINK PHO · DRINKS · MENU ·
                </textPath>
              </text>
            </svg>
          </span>
        </div>
      </div>
    </header>
  );
}
