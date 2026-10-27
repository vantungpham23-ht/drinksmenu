import { formatPrice } from "../lib/format";
import { PhinMarker } from "./PhinMarker";
import type { MenuItem } from "../data/menu";

type Props = {
  item: MenuItem;
  index: number;
};

/**
 * A single menu line: drink name on the left, selling price on the right.
 * Vietnamese names may carry a Slovak translation underneath, and drinks
 * served with a phin filter carry a small cultural marker.
 */
export function MenuRow({ item, index }: Props) {
  const price = formatPrice(item.price);
  if (price === null) return null;

  return (
    <li
      className="menu-row"
      data-reveal
      style={{ "--i": index } as React.CSSProperties}
    >
      <span className="menu-row__lead">
        {item.marker === "phin" && <PhinMarker className="menu-row__phin" />}
        <span className="menu-row__text">
          <span className="menu-row__name">{item.name}</span>
          {item.translation && (
            <span className="menu-row__translation">{item.translation}</span>
          )}
        </span>
      </span>
      <span className="menu-row__leader" aria-hidden="true" />
      <span className="menu-row__price">{price}</span>
    </li>
  );
}
