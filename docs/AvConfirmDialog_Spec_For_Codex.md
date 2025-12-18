# Spec: AvConfirmDialog (Replace `window.confirm`)

Goal: Replace native `confirm()` with an Ansiversa-standard, accessible confirm dialog that works across all apps and admin pages.

This component becomes the **official pattern** for destructive actions:
- Delete FAQ
- Delete resume section
- Remove items
- Reset / clear data
- Any irreversible action

---

## 0) Strategy (Important)

- Use a **native `<dialog>`** element for accessibility + focus management.
- Provide a **small JS helper** inside the component to:
  - open/close safely
  - close on Escape
  - close on backdrop click
- Provide a clean event-based API usable from:
  - Alpine (`x-data`, `$dispatch`)
  - plain HTML + small script
  - Astro pages

---

## 1) Files to Add / Update

### Add
- `components/src/AvConfirmDialog.astro`

### Update
- `components/index.ts` (export)
- `components/src/styles/global.css` (dialog styles + variants)

---

## 2) Component API

### Props

```ts
interface Props {
  id: string;                                 // required unique id (e.g. "confirm-delete-faq")
  title?: string;                              // default: "Confirm"
  description?: string;                        // optional subtext
  confirmLabel?: string;                       // default: "Confirm"
  cancelLabel?: string;                        // default: "Cancel"
  variant?: "default" | "danger";              // default: "default"
  busy?: boolean;                              // disable actions + show working label
  className?: string;                          // wrapper class
}
```

### Events (Critical)

When user clicks **Confirm**, dispatch:
- `av-confirm`

When user clicks **Cancel** or closes dialog:
- `av-cancel`

Both events must be dispatched from the dialog element:
- `event.detail = { id }`

---

## 3) Markup Requirements

- Use `<dialog>` with accessible labeling:
  - `aria-labelledby`
  - `aria-describedby` when description exists
- Footer must have Cancel (left) and Confirm (right)
- Confirm button must support `danger` styling when variant is danger

### Suggested Astro structure

```astro
---
import { AvButton } from "@ansiversa/components";
const {
  id,
  title = "Confirm",
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "default",
  busy = false,
  className = "",
} = Astro.props;
---

<dialog id={id} class={`av-dialog av-dialog--${variant} ${className}`} aria-modal="true">
  <div class="av-dialog__panel" role="document">
    <div class="av-dialog__header">
      <h2 class="av-dialog__title" id={`${id}-title`}>{title}</h2>
      {description ? <p class="av-dialog__desc" id={`${id}-desc`}>{description}</p> : null}
    </div>

    <div class="av-dialog__footer">
      <AvButton type="button" variant="ghost" size="md" data-av-cancel disabled={busy}>
        {cancelLabel}
      </AvButton>

      <AvButton type="button" variant={variant === "danger" ? "primary" : "primary"} size="md" data-av-confirm disabled={busy}>
        {busy ? "Working…" : confirmLabel}
      </AvButton>
    </div>
  </div>
</dialog>

<script is:inline>
(() => {
  const dialog = document.getElementById({JSON.stringify(id)});
  if (!dialog) return;

  const confirmBtn = dialog.querySelector("[data-av-confirm]");
  const cancelBtn = dialog.querySelector("[data-av-cancel]");

  function dispatch(name) {
    dialog.dispatchEvent(new CustomEvent(name, { bubbles: true, detail: { id: dialog.id } }));
  }

  function open() {
    if (typeof dialog.showModal === "function" && !dialog.open) dialog.showModal();
  }

  function close() {
    if (dialog.open) dialog.close();
  }

  // Public API: window.AvDialog.open(id) / close(id)
  window.AvDialog = window.AvDialog || {};
  window.AvDialog.open = (targetId) => { if (targetId === dialog.id) open(); };
  window.AvDialog.close = (targetId) => { if (targetId === dialog.id) close(); };

  confirmBtn?.addEventListener("click", () => { dispatch("av-confirm"); close(); });
  cancelBtn?.addEventListener("click", () => { dispatch("av-cancel"); close(); });

  dialog.addEventListener("cancel", (e) => {
    e.preventDefault(); // Escape
    dispatch("av-cancel");
    close();
  });

  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) { // backdrop click
      dispatch("av-cancel");
      close();
    }
  });
})();
</script>
```

---

## 4) Global CSS (Required)

Add to `components/src/styles/global.css`

### Classes
- `.av-dialog` (backdrop handled by dialog)
- `.av-dialog__panel` (card surface)
- `.av-dialog__header`
- `.av-dialog__title`
- `.av-dialog__desc`
- `.av-dialog__footer`

### UX Rules
- Center the panel
- Max width ~ 520–640px
- Rounded corners, soft shadow
- Use Ansiversa design tokens (no hard-coded colors)
- Variant:
  - `default`: normal surface
  - `danger`: subtle danger accent (border or header)

---

## 5) Alpine Usage Pattern (Golden)

### Add one dialog instance in the admin page

```html
<AvConfirmDialog
  id="confirm-delete-faq"
  title="Delete this FAQ?"
  description="This action cannot be undone."
  variant="danger"
  confirmLabel="Delete"
  cancelLabel="Cancel"
/>
```

### Alpine store integration

```js
pendingDeleteId: null,

askDelete(id) {
  this.pendingDeleteId = id;
  window.AvDialog?.open("confirm-delete-faq");
},

init() {
  document.addEventListener("av-confirm", (e) => {
    if (e.detail?.id !== "confirm-delete-faq") return;
    if (!this.pendingDeleteId) return;
    this.remove(this.pendingDeleteId);
    this.pendingDeleteId = null;
  });

  document.addEventListener("av-cancel", (e) => {
    if (e.detail?.id !== "confirm-delete-faq") return;
    this.pendingDeleteId = null;
  });
}
```

### Replace existing usage

Before:
```js
confirm("Delete this FAQ?") ? remove(id) : null
```

After:
```js
askDelete(id)
```

---

## 6) Export

Update `components/index.ts`:

```ts
export { default as AvConfirmDialog } from "./src/AvConfirmDialog.astro";
```

---

## 7) Acceptance Checklist

- [ ] No `window.confirm()` is used after migration
- [ ] Confirm fires `av-confirm` and closes dialog
- [ ] Cancel fires `av-cancel` and closes dialog
- [ ] Escape closes and fires cancel
- [ ] Backdrop click closes and fires cancel
- [ ] Buttons disabled when `busy=true`
- [ ] Visual style matches Ansiversa tokens
- [ ] Works in web admin FAQ and at least one mini-app

