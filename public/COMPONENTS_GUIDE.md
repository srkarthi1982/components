
# COMPONENTS_GUIDE.md

## Ansiversa components — Component Creation Guide (Using HyperUI Templates)
_For Codex Automation_

---

# 1. Purpose

This document instructs Codex on how to generate clean, reusable **Astro components** for **components.ansiversa.com**, based entirely on the HTML/Tailwind patterns found inside the cloned **HyperUI** repository.

The goal is to create a **fully consistent, token-based Ansiversa component library**.

---

# 2. HyperUI Source Directory

Codex must use component HTML templates from:

```
hyperui/components/
```

HyperUI is already cloned locally.  
Codex should use those templates directly and NEVER invent new structures.

---

# 3. Output Folder Structure

All generated components must be placed inside:

```
components/src/components/
    buttons/
    cards/
    forms/
    inputs/
    navigation/
    overlays/
    typography/
    tables/
    utilities/
```

Examples:

```
components/src/components/buttons/AvButton.astro
components/src/components/cards/AvCard.astro
```

---

# 4. Naming Conventions

### Component Name Prefix
All components MUST start with:

```
Av
```

Examples:

- AvButton
- AvCard
- AvModal
- AvTable
- AvInput

### File Names
```
AvButton.astro
AvInput.astro
AvCard.astro
```

---

# 5. Tailwind + Ansiversa Token Rules

HyperUI classes like:

```
bg-indigo-600
text-indigo-700
border-gray-300
```

MUST be replaced with Ansiversa tokens:

- bg-[var(--ans-primary)]
- text-[var(--ans-primary)]
- border-[var(--ans-border)]
- bg-[var(--ans-bg)]
- text-[var(--ans-fg)]
- rounded-[var(--ans-radius)]
- shadow-[var(--ans-shadow)]

Codex must ensure the components UI follows **one consistent design language**.

---

# 6. Component Architecture

Every component must follow this structure:

```astro
---
export interface Props {
  as?: keyof HTMLElementTagNameMap;
  class?: string;
  variant?: string;
  size?: string;
  [key: string]: any;
}

const {
  as: Tag = 'div',
  class: className = '',
  variant = 'default',
  size = 'md',
  ...rest
} = Astro.props;
---

<Tag
  {...rest}
  class={`BASE_CLASSES ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
>
  <slot />
</Tag>
```

---

# 7. Variant & Size System

Codex must read HyperUI templates and create:

### Variants
- solid
- outline
- soft
- ghost
- link

### Sizes
- sm
- md
- lg

Each size affects padding + font.

---

# 8. Required Component List

## BUTTONS
- AvButton
- AvIconButton
- AvButtonGroup

## INPUTS
- AvInput
- AvTextarea
- AvSelect
- AvCheckbox
- AvRadio
- AvToggle

## FORMS
- AvLabel
- AvFormGroup
- AvFieldError
- AvHint

## CARDS
- AvCard
- AvCardHeader
- AvCardContent
- AvCardFooter

## NAVIGATION
- AvSidebar
- AvNavbar
- AvBreadcrumbs
- AvTabs

## TABLES
- AvTable
- AvTableHeader
- AvTableRow
- AvTableCell

## FEEDBACK
- AvAlert
- AvBadge
- AvTag
- AvToast

## OVERLAYS
- AvModal
- AvDrawer
- AvPopover
- AvTooltip

## TYPOGRAPHY
- AvHeading
- AvText
- AvCode

## UTILITIES
- AvDivider
- AvSkeleton
- AvLoadingSpinner

---

# 9. Code Refactoring Rules

1. Remove unnecessary wrapper divs
2. Extract reusable parts into props
3. Merge HyperUI classes into token-based classes
4. Keep only minimal HTML
5. Make every component slot-friendly

---

# 10. Example Conversion

### HyperUI Button (original)

```html
<button class="px-4 py-2 bg-indigo-600 text-white rounded-lg">Click</button>
```

### Converted Ansiversa Button

```astro
<AvButton variant="solid" size="md">Click</AvButton>
```

---

This MD file instructs Codex exactly how to build a full reusable component library for the Ansiversa components App.
