const baseButton =
  "inline-flex items-center justify-center gap-2 rounded-[var(--ans-radius)] font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ans-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ans-bg)] disabled:pointer-events-none disabled:opacity-50";

export const variantClasses = {
  solid:
    "border border-transparent bg-[var(--ans-primary)] text-[var(--ans-primary-foreground)] shadow-sm hover:opacity-90",
  outline:
    "border border-[var(--ans-border)] bg-transparent text-[var(--ans-fg)] hover:bg-[var(--ans-bg-muted)]",
  soft:
    "border border-transparent bg-[var(--ans-bg-muted)] text-[var(--ans-fg)] hover:bg-[var(--ans-border)]",
  ghost:
    "border border-transparent bg-transparent text-[var(--ans-fg-muted)] hover:bg-[var(--ans-bg-muted)] hover:text-[var(--ans-fg)]",
  link:
    "border border-transparent bg-transparent text-[var(--ans-primary)] underline-offset-4 hover:underline",
} as const;

export const sizeClasses = {
  sm: "text-sm px-3 py-1.5",
  md: "text-sm px-4 py-2",
  lg: "text-base px-6 py-3",
} as const;

export type ButtonVariant = keyof typeof variantClasses;
export type ButtonSize = keyof typeof sizeClasses;

export const buttonBaseClass = baseButton;
