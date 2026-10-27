/**
 * Line-art illustration of a Vietnamese phin filter resting on top of a glass.
 * Used as a cultural marker so guests can tell "served with phin" drinks
 * apart from the same coffee poured without it.
 */
export function PhinMarker({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.15"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="presentation"
      aria-hidden="true"
    >
      {/* knob on the lid */}
      <path d="M12 1.4v1.5" />
      {/* lid plate */}
      <path d="M5.4 3.4h13.2" />
      {/* phin body — tapering metal filter */}
      <path d="M6.1 4.6h11.8l-1.5 7.6H7.6L6.1 4.6Z" />
      {/* mesh line inside the filter */}
      <path d="M7.9 9.8h8.2" opacity="0.55" />
      {/* small stamped mark on the lid, echoing traditional phin engraving */}
      <path d="M12 5.9l1.05 2.15 2.35.34-1.7 1.66.4 2.35L12 11.35l-2.1 1.05.4-2.35-1.7-1.66 2.35-.34L12 5.9Z" />
      {/* drip */}
      <path d="M12 12.4v2.1" />
      <path d="M11.3 15.4h1.4" opacity="0.6" />
      {/* glass */}
      <path d="M8 16.6h8l-1 6.2H9l-1-6.2Z" />
      {/* coffee level */}
      <path d="M9.2 20.1h5.6" opacity="0.55" />
    </svg>
  );
}
