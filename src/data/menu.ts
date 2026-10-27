export type MenuItem = {
  /** Exact drink name — never translated or altered. */
  name: string;
  /** Selling price in EUR. `null` when the price has not been supplied yet. */
  price: number | null;
  /** Optional Slovak translation, shown under the original name. */
  translation?: string;
  /**
   * Marks the drink as served with a traditional Vietnamese phin filter
   * resting on top of the glass. Rendered with its own graphic marker.
   */
  marker?: "phin";
};

export type MenuCategory = {
  id: string;
  label: string;
  /** Short editorial kicker used in the section heading. */
  kicker: string;
  /**
   * Featured categories get their own art direction: an inverted cream
   * panel, oversized display type and a signature treatment.
   */
  featured?: boolean;
  items: MenuItem[];
};

/**
 * Single source of truth for the drinks menu.
 * Items with a `null` price stay here but are filtered out of the public menu
 * until a selling price is supplied.
 */
export const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: "matcha-signature",
    label: "MATCHA RITUAL",
    kicker: "Stone-ground ceremonial grade, whisked to order",
    items: [
      { name: "Caramelized banana matcha (Iced)", price: 4.5 },
      { name: "Caramelized banana matcha (Hot)", price: 3.9 },
      { name: "Salted date matcha (Iced)", price: 4.5 },
      { name: "Pumpkin spice matcha (Hot/Iced)", price: 3.9 },
      { name: "Earl grey matcha (Hot/Iced)", price: 3.9 },
      { name: "Matcha chai latte (Hot/Iced)", price: 3.9 },
      { name: "Matcha latte (Hot/Iced)", price: 3.6 },
    ],
  },
  {
    id: "coffee-bar",
    label: "COFFEE LAB",
    kicker: "Dark roast, pulled slow, built for the long nights",
    items: [
      { name: "Espresso", price: 1.8 },
      { name: "Lungo", price: 1.8 },
      { name: "Espresso macchiato", price: 1.9 },
      { name: "Americano", price: 1.9 },
      { name: "Doppio", price: 2.9 },
      { name: "Cappuccino", price: 2.5 },
      { name: "Flat white", price: 2.9 },
      { name: "Caffè latte", price: 2.7 },
      { name: "Iced latte", price: 2.9 },
      { name: "Autumn shaken espresso", price: 3.9 },
      { name: "Caramelized banana coffee (Iced)", price: 4.2 },
      { name: "Caramelized banana coffee (Hot)", price: 3.9 },
    ],
  },
  {
    id: "vietnamska-kava",
    label: "CÀ PHÊ PHIN",
    kicker: "Vietnamese phin, dripped slow over ice",
    items: [
      { name: "Cafe đen đá", price: 1.9, translation: "Ľadová čierna káva" },
      { name: "Phin sữa đá", price: 2.9, translation: "Ľadová káva s kondenzovaným mliekom", marker: "phin" },
      { name: "Phin Đen đá", price: 2.5, translation: "Ľadová čierna káva s phin filtrom", marker: "phin" },
      { name: "Cafe nâu đá", price: 2.5, translation: "Ľadová hnedá káva" },
      { name: "Cafe cốt dừa", price: 3.9, translation: "Káva s kokosovým mliekom" },
      { name: "Cafe bạc xỉu", price: 2.6, translation: "Bạc xỉu" },
      { name: "Cafe muối", price: 3.5, translation: "Káva soľou" },
      { name: "Cafe kem cheese", price: 3.5, translation: "Káva s krémovým syrom" },
      { name: "Cafe trứng", price: 3.9, translation: "Káva s vajcom" },
    ],
  },
  {
    id: "smoothies-frappe",
    label: "BLENDED & FROZEN",
    kicker: "Thick, bright and always served cold",
    items: [
      { name: "Trà xanh xay", price: 3.9, translation: "Zelený čaj smoothie" },
      { name: "Sinh tố dâu", price: 3.9, translation: "Jahodový smoothie" },
      { name: "Sinh tố việt quất", price: 3.9, translation: "Smoothie z čučorodky" },
      { name: "Cookie đá xay", price: 3.9, translation: "Cookie smoothie" },
    ],
  },
  {
    id: "caje-latte",
    label: "TEA & LATTE HOUSE",
    kicker: "Loose leaf infusions, slow-poured lattes",
    items: [
      { name: "Trà dâu tây", price: 2.9, translation: "Čaj zo zemute" },
      { name: "Trà vải", price: 2.9, translation: "Čaj z liptového ovocia" },
      { name: "Trà đào cam sả", price: 2.9, translation: "Čaj z broskyne, pomaranča a citrónovníka" },
      { name: "Trà ô long kem sữa", price: 2.9, translation: "Oolong čaj s krémovým mliekom" },
      { name: "Trà xanh latte", price: 3.2, translation: "Zelený čaj latte" },
    ],
  },
  {
    id: "kokteily",
    label: "SIGNATURE COCKTAILS",
    kicker: "House pours, bold finishes, made only here",
    featured: true,
    items: [
      { name: "Lotus Dawn", price: 6.5 },
      { name: "Sesame Colada", price: 7.0 },
      { name: "Saigon Sour", price: 7.5 },
      { name: "Pho Roy", price: 7.5 },
      { name: "Lychee Fizz", price: 6.5 },
      { name: "Hibiscus Spritz", price: 7.0 },
      { name: "Pandan Tonic", price: 6.5 },
    ],
  },
];

/** Categories that have at least one item with a valid selling price. */
export const VISIBLE_CATEGORIES = MENU_CATEGORIES.filter((category) =>
  category.items.some((item) => item.price !== null),
);

/** Flat list of items that are safe to render publicly. */
export const VISIBLE_ITEMS = VISIBLE_CATEGORIES.flatMap((category) =>
  category.items.filter((item) => item.price !== null),
);
