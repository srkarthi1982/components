# Spec: AvAccordion Component (to implement in `@ansiversa/components`)

Goal: build a reusable **Ansiversa-standard accordion** component so we stop repeating `<details>` markup in each app.  
Implementation should be **accessible**, **consistent**, and **style-token driven**.

---

## 0) Strategy

- Build `AvAccordion` **on top of native** `<details>/<summary>` for accessibility.
- Keep FAQ CRUD fixes separate; implement `AvAccordion` in parallel.
- After `AvAccordion` is stable, switch FAQ page to use it.

---

## 1) Files to Add / Update

### Add
- `components/src/AvAccordion.astro`

### Update
- `components/index.ts` (export `AvAccordion`)
- `components/src/styles/global.css` (add accordion classes + variants)

---

## 2) Component API

### Types

```ts
export interface AvAccordionItem {
  id?: string;        // optional stable id, used by defaultOpenIds
  title: string;      // summary title
  content: string;    // HTML string OR plain text; treat as content body
  disabled?: boolean; // optional, disables open/close
}
```

### Props

```ts
interface Props {
  items: AvAccordionItem[];
  mode?: "single" | "multiple";          // default: "multiple"
  defaultOpenIds?: string[];             // default: []
  variant?: "default" | "soft" | "auth"; // default: "default"
  className?: string;                    // optional wrapper class
}
```

#### Behaviour Requirements
- `mode="multiple"`: multiple items can be open at once (native default).
- `mode="single"`: opening one item closes others.
- `defaultOpenIds`: items whose `id` is in the list should render with `open` initially.
- `disabled`: item cannot be opened; visually looks disabled.

---

## 3) Markup Requirements (Accessible)

- Use `<details>` per item.
- Use `<summary>` for the clickable header.
- Place icon + title **same line** (flex row).
- Do **not** use `@click.prevent` on `<details>` (don’t break native keyboard support).
- If you need JS for single-mode, attach it minimally and safely.

### Recommended structure

```astro
<div class={`av-accordion av-accordion--${variant} ${className ?? ""}`}>
  {items.map((item, i) => {
    const id = item.id ?? `item-${i}`;
    const isOpen = defaultOpenIds?.includes(id);
    return (
      <details
        class={`av-accordion__item ${item.disabled ? "is-disabled" : ""}`}
        open={isOpen}
        data-av-accordion-item
        data-id={id}
        disabled={item.disabled ? true : undefined}
      >
        <summary class="av-accordion__summary">
          <span class="av-accordion__icon" aria-hidden="true"></span>
          <span class="av-accordion__title">{item.title}</span>
        </summary>

        <div class="av-accordion__content">
          {item.content}
        </div>
      </details>
    );
  })}
</div>
```

> Note: HTML doesn’t support `disabled` on `<details>` in all browsers; handle with CSS + JS guard.

---

## 4) Single Mode Logic (Minimal JS)

When `mode="single"`, opening one `<details>` must close the others.

Implementation options:
1) Small inline script inside component only when `mode="single"`.
2) Alpine-friendly: allow caller to wrap with Alpine and use events.

### Suggested minimal inline script (only for single)

- Add `data-av-accordion-root` on wrapper.
- On `toggle` event:
  - if a `<details>` becomes open, close all siblings.

Pseudo:

```js
root.addEventListener("toggle", (e) => {
  const d = e.target;
  if (!(d instanceof HTMLDetailsElement)) return;
  if (!d.open) return;
  root.querySelectorAll("details[data-av-accordion-item]").forEach((x) => {
    if (x !== d) x.open = false;
  });
});
```

Also: if item is disabled, force `open=false`.

---

## 5) CSS Requirements (Global)

Add styles in `components/src/styles/global.css`

### Base Classes
- `.av-accordion`
- `.av-accordion__item`
- `.av-accordion__summary`
- `.av-accordion__icon`
- `.av-accordion__title`
- `.av-accordion__content`
- `.av-accordion__item.is-disabled`

### Visual Expectations
- Summary row uses flex: `display:flex; align-items:center; gap: var(--space-2);`
- Icon placed left, title next to it (same line).
- Content has padding, readable line-height.
- Divider between items (border or subtle background separation).
- Variants:
  - `default`: normal background
  - `soft`: softer surface
  - `auth`: match auth pages (card-like)

Do NOT hardcode colors; use existing Ansiversa CSS tokens.

---

## 6) FAQ Integration (After AvAccordion Is Ready)

### Public FAQ page
- Replace raw `<details>` list with `<AvAccordion items={...mappedFaqItems} mode="multiple" />`

### Admin FAQ page
- Keep Edit/Delete buttons separate initially (below content or in a right-side action row outside summary).
- Later we can add an enhanced API if we want “slots”.

---

## 7) Acceptance Checklist

- [ ] Accordion renders correctly across web + at least one mini-app
- [ ] Icon + title are on the **same line**
- [ ] Keyboard works: Tab → Enter/Space toggles summary
- [ ] `mode="single"` closes other items reliably
- [ ] `defaultOpenIds` works
- [ ] Disabled items cannot open
- [ ] Variants look consistent with Av design system
- [ ] No breaking changes to existing components/styles

---

## 8) Export

Add to `components/index.ts`:

```ts
export { default as AvAccordion } from "./src/AvAccordion.astro";
```

---

## Notes

Keep this component **small and strict**; this is a core UI primitive that will be reused everywhere.

