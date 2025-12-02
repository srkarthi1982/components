export const inputBaseClass =
  "block w-full rounded-[var(--ans-radius)] border border-[var(--ans-border)] bg-[var(--ans-bg)] text-[var(--ans-fg)] placeholder:text-[var(--ans-fg-muted)] shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ans-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ans-bg)] disabled:pointer-events-none disabled:opacity-50";

export const inputSizeClasses = {
  sm: "text-sm px-3 py-2",
  md: "text-sm px-4 py-2.5",
  lg: "text-base px-4 py-3",
} as const;

export const invalidClasses =
  "border-[var(--ans-danger)] focus-visible:ring-[var(--ans-danger)]";
