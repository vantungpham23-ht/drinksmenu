/**
 * The official PHONK wordmark, supplied as a transparent asset derived from
 * the brand logo (pale-yellow wordmark on deep olive).
 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <img
      className={className}
      src="/phonk-wordmark.png"
      alt="PHONK"
      width={902}
      height={190}
      decoding="async"
    />
  );
}
