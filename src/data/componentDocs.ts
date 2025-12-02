export type ComponentStatus = "ready" | "planned";

interface ComponentProp {
  name: string;
  type: string;
  description: string;
}

export interface ComponentDoc {
  name: string;
  slug: string;
  category:
    | "Buttons"
    | "Inputs"
    | "Forms"
    | "Cards"
    | "Navigation"
    | "Tables"
    | "Feedback"
    | "Overlays"
    | "Typography"
    | "Utilities";
  description: string;
  status: ComponentStatus;
  demo?:
    | "header"
    | "button"
    | "iconButton"
    | "buttonGroup"
    | "input"
    | "textarea"
    | "select";
  usage?: string;
  props?: ComponentProp[];
}

export const componentDocs: ComponentDoc[] = [
  {
    name: "AvHeader",
    slug: "av-header",
    category: "Navigation",
    description:
      "Responsive marketing header from HyperUI with configurable nav links, CTA buttons, and slots for logos or mobile menu icons.",
    status: "ready",
    demo: "header",
    usage: `<AvHeader
  navLinks={[
    { label: "Overview", href: "#overview", current: true },
    { label: "Components", href: "#components" },
  ]}
  primaryAction={{ label: "Login", href: "#login" }}
  secondaryAction={{ label: "Register", href: "#register", variant: "outline" }}
  navAlign="center"
/>`,
    props: [
      {
        name: "navLinks",
        type: "Array<{ label: string; href: string; current?: boolean }>",
        description: "Navigation collection rendered across the header.",
      },
      {
        name: "primaryAction",
        type: "HeaderAction | null",
        description: "Configurable CTA shown beside the nav on desktop.",
      },
      {
        name: "secondaryAction",
        type: "HeaderAction | null",
        description: "Optional secondary CTA; hidden on small screens.",
      },
      {
        name: "navAlign",
        type: `"start" | "center" | "end"`,
        description: "Aligns the nav items when the viewport supports them.",
      },
    ],
  },
  {
    name: "AvButton",
    slug: "av-button",
    category: "Buttons",
    description:
      "Tokenized button primitive that supports solid, outline, soft, ghost, and link variants along with sm/md/lg sizing.",
    status: "ready",
    demo: "button",
    usage: `<AvButton variant="solid" size="md">Save</AvButton>
<AvButton variant="outline" as="a" href="#">Learn more</AvButton>
<AvButton variant="soft" fullWidth size="lg">Continue</AvButton>`,
    props: [
      {
        name: "variant",
        type: `"solid" | "outline" | "soft" | "ghost" | "link"`,
        description: "Selects the button treatment pulled from Ansiversa tokens.",
      },
      {
        name: "size",
        type: `"sm" | "md" | "lg"`,
        description: "Toggles padding + typography scale.",
      },
      {
        name: "as",
        type: "keyof HTMLElementTagNameMap",
        description: "Render as another tag (button, a, etc.).",
      },
      {
        name: "fullWidth",
        type: "boolean",
        description: "Expands to fill available horizontal space.",
      },
    ],
  },
  {
    name: "AvIconButton",
    slug: "av-icon-button",
    category: "Buttons",
    description:
      "Circular icon-only button for toolbars and field adornments. Provides aria-label fallbacks and matches button variants.",
    status: "ready",
    demo: "iconButton",
    usage: `<AvIconButton aria-label="Search" />
<AvIconButton variant="outline" aria-label="Notifications">
  <svg><!-- icon --></svg>
</AvIconButton>`,
    props: [
      {
        name: "aria-label",
        type: "string",
        description: "Accessible label describing the icon action.",
      },
      {
        name: "variant",
        type: "ButtonVariant",
        description: "Shares visual styles with AvButton.",
      },
      {
        name: "size",
        type: `"sm" | "md" | "lg"`,
        description: "Adjusts icon button diameter.",
      },
    ],
  },
  {
    name: "AvButtonGroup",
    slug: "av-button-group",
    category: "Buttons",
    description:
      "Segmented control composed from AvButton tokens. Feeds items and highlights the active value.",
    status: "ready",
    demo: "buttonGroup",
    usage: `<AvButtonGroup
  value="view"
  items={[
    { label: "View", value: "view" },
    { label: "Edit", value: "edit" },
    { label: "Delete", value: "delete" },
  ]}
/>`,
    props: [
      {
        name: "items",
        type: "Array<{ label: string; value: string; disabled?: boolean }>",
        description: "Defines the buttons that make up the group.",
      },
      {
        name: "value",
        type: "string",
        description: "Currently active item key (used for highlighting).",
      },
      {
        name: "size",
        type: `"sm" | "md" | "lg"`,
        description: "Controls padding for each segment.",
      },
    ],
  },
  {
    name: "AvInput",
    slug: "av-input",
    category: "Inputs",
    description: "Text input field with tokenized styling and validation states.",
    status: "ready",
    usage: `<AvInput id="Email" type="email" placeholder="you@example.com" />
<AvInput id="Search" class="mt-4" size="lg" placeholder="Search..." />`,
    demo: "input",
    props: [
      {
        name: "type",
        type: "string",
        description: "HTML input type (text, email, password, etc.).",
      },
      {
        name: "size",
        type: `"sm" | "md" | "lg"`,
        description: "Controls padding and font sizing.",
      },
      {
        name: "invalid",
        type: "boolean",
        description: "Highlights the field with the danger token set.",
      },
    ],
  },
  {
    name: "AvTextarea",
    slug: "av-textarea",
    category: "Inputs",
    description: "Multiline input for notes or descriptions.",
    status: "ready",
    usage: `<AvTextarea id="Notes" rows={5} placeholder="Add more detail..." />`,
    demo: "textarea",
    props: [
      {
        name: "rows",
        type: "number",
        description: "Sets the textarea row count (default 4).",
      },
      {
        name: "size",
        type: `"sm" | "md" | "lg"`,
        description: "Controls padding and typography.",
      },
      {
        name: "invalid",
        type: "boolean",
        description: "Uses the danger token styles when true.",
      },
    ],
  },
  {
    name: "AvSelect",
    slug: "av-select",
    category: "Inputs",
    description: "Custom select menu built from HyperUI patterns.",
    status: "ready",
    usage: `<AvSelect id="Headline" placeholder="Please select">
  <option value="jm">John Mayer</option>
  <option value="srv">Stevie Ray Vaughan</option>
</AvSelect>`,
    demo: "select",
    props: [
      {
        name: "placeholder",
        type: "string",
        description: "Optional placeholder option rendered first.",
      },
      {
        name: "size",
        type: `"sm" | "md" | "lg"`,
        description: "Controls padding and font sizing.",
      },
      {
        name: "invalid",
        type: "boolean",
        description: "Applies danger border/ring styling.",
      },
    ],
  },
  {
    name: "AvCheckbox",
    slug: "av-checkbox",
    category: "Inputs",
    description: "Checkbox input with label support.",
    status: "ready",
    usage: `<AvCheckbox id="Option1" label="Option 1" />
<AvCheckbox id="Option2" label="Option 2" description="Additional context" />`,
    demo: "checkbox",
    props: [
      {
        name: "id",
        type: "string",
        description: "Unique identifier required for the label association.",
      },
      {
        name: "label",
        type: "string",
        description: "Text shown alongside the checkbox (slot also available).",
      },
      {
        name: "description",
        type: "string",
        description: "Optional supporting copy beneath the main label.",
      },
    ],
  },
  {
    name: "AvRadio",
    slug: "av-radio",
    category: "Inputs",
    description: "Radio button group for single selections.",
    status: "planned",
  },
  {
    name: "AvToggle",
    slug: "av-toggle",
    category: "Inputs",
    description: "Toggle switch for boolean fields.",
    status: "planned",
  },
  {
    name: "AvLabel",
    slug: "av-label",
    category: "Forms",
    description: "Form label utility with alignment helpers.",
    status: "planned",
  },
  {
    name: "AvFormGroup",
    slug: "av-form-group",
    category: "Forms",
    description: "Wrapper to stack labels, inputs, and hints consistently.",
    status: "planned",
  },
  {
    name: "AvFieldError",
    slug: "av-field-error",
    category: "Forms",
    description: "Inline error text tied to inputs.",
    status: "planned",
  },
  {
    name: "AvHint",
    slug: "av-hint",
    category: "Forms",
    description: "Subtext helper for fields.",
    status: "planned",
  },
  {
    name: "AvCard",
    slug: "av-card",
    category: "Cards",
    description: "Card container with padding, border, and shadow tokens.",
    status: "planned",
  },
  {
    name: "AvCardHeader",
    slug: "av-card-header",
    category: "Cards",
    description: "Card header region for titles/actions.",
    status: "planned",
  },
  {
    name: "AvCardContent",
    slug: "av-card-content",
    category: "Cards",
    description: "Card body area for main content.",
    status: "planned",
  },
  {
    name: "AvCardFooter",
    slug: "av-card-footer",
    category: "Cards",
    description: "Card footer for actions or metadata.",
    status: "planned",
  },
  {
    name: "AvSidebar",
    slug: "av-sidebar",
    category: "Navigation",
    description: "Sidebar navigation layout.",
    status: "planned",
  },
  {
    name: "AvNavbar",
    slug: "av-navbar",
    category: "Navigation",
    description: "Top navigation bar for app shells.",
    status: "planned",
  },
  {
    name: "AvBreadcrumbs",
    slug: "av-breadcrumbs",
    category: "Navigation",
    description: "Breadcrumb trail for hierarchical navigation.",
    status: "planned",
  },
  {
    name: "AvTabs",
    slug: "av-tabs",
    category: "Navigation",
    description: "Tabbed navigation control.",
    status: "planned",
  },
  {
    name: "AvTable",
    slug: "av-table",
    category: "Tables",
    description: "Table wrapper with scrollable support.",
    status: "planned",
  },
  {
    name: "AvTableHeader",
    slug: "av-table-header",
    category: "Tables",
    description: "Table header row styling.",
    status: "planned",
  },
  {
    name: "AvTableRow",
    slug: "av-table-row",
    category: "Tables",
    description: "Table row layout.",
    status: "planned",
  },
  {
    name: "AvTableCell",
    slug: "av-table-cell",
    category: "Tables",
    description: "Table cell typography / spacing.",
    status: "planned",
  },
  {
    name: "AvAlert",
    slug: "av-alert",
    category: "Feedback",
    description: "Inline alert notification component.",
    status: "planned",
  },
  {
    name: "AvBadge",
    slug: "av-badge",
    category: "Feedback",
    description: "Badge for status or counts.",
    status: "planned",
  },
  {
    name: "AvTag",
    slug: "av-tag",
    category: "Feedback",
    description: "Tag/pill style label.",
    status: "planned",
  },
  {
    name: "AvToast",
    slug: "av-toast",
    category: "Feedback",
    description: "Toast notification overlay.",
    status: "planned",
  },
  {
    name: "AvModal",
    slug: "av-modal",
    category: "Overlays",
    description: "Modal dialog shell.",
    status: "planned",
  },
  {
    name: "AvDrawer",
    slug: "av-drawer",
    category: "Overlays",
    description: "Slide-over drawer.",
    status: "planned",
  },
  {
    name: "AvPopover",
    slug: "av-popover",
    category: "Overlays",
    description: "Popover floating panel.",
    status: "planned",
  },
  {
    name: "AvTooltip",
    slug: "av-tooltip",
    category: "Overlays",
    description: "Tooltip bubble.",
    status: "planned",
  },
  {
    name: "AvHeading",
    slug: "av-heading",
    category: "Typography",
    description: "Heading typography primitive.",
    status: "planned",
  },
  {
    name: "AvText",
    slug: "av-text",
    category: "Typography",
    description: "Body text component.",
    status: "planned",
  },
  {
    name: "AvCode",
    slug: "av-code",
    category: "Typography",
    description: "Inline/code block styling.",
    status: "planned",
  },
  {
    name: "AvDivider",
    slug: "av-divider",
    category: "Utilities",
    description: "Divider line spacing token.",
    status: "planned",
  },
  {
    name: "AvSkeleton",
    slug: "av-skeleton",
    category: "Utilities",
    description: "Skeleton loading placeholder.",
    status: "planned",
  },
  {
    name: "AvLoadingSpinner",
    slug: "av-loading-spinner",
    category: "Utilities",
    description: "Spinner indicator.",
    status: "planned",
  },
];
