---
name: Industrial Integrity
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#5d3f3c'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#916f6b'
  outline-variant: '#e6bdb8'
  surface-tint: '#c00013'
  primary: '#9e000d'
  on-primary: '#ffffff'
  primary-container: '#c90c18'
  on-primary-container: '#ffd9d5'
  inverse-primary: '#ffb4ab'
  secondary: '#595f64'
  on-secondary: '#ffffff'
  secondary-container: '#dde3e9'
  on-secondary-container: '#5f656a'
  tertiary: '#3d4d63'
  on-tertiary: '#ffffff'
  tertiary-container: '#55657b'
  on-tertiary-container: '#d2e3fd'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad6'
  primary-fixed-dim: '#ffb4ab'
  on-primary-fixed: '#410002'
  on-primary-fixed-variant: '#93000c'
  secondary-fixed: '#dde3e9'
  secondary-fixed-dim: '#c1c7cd'
  on-secondary-fixed: '#161c20'
  on-secondary-fixed-variant: '#41484c'
  tertiary-fixed: '#d3e4fe'
  tertiary-fixed-dim: '#b7c8e1'
  on-tertiary-fixed: '#0b1c30'
  on-tertiary-fixed-variant: '#38485d'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  headline-display:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.08em
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 16px
  container-max: 1280px
---

## Brand & Style
The design system is engineered for **Industrial Integrity**. It balances the raw, structural nature of the chemical manufacturing industry with a modern, high-trust digital interface. The aesthetic is "Clean Industrial"—think of a high-tech laboratory or a well-organized factory floor.

The target audience includes B2B procurement officers, safety managers, and industrial contractors who value reliability and clarity above all else. The UI evokes a sense of stability, precision, and institutional strength through the use of a rigid grid, functional typography, and a purposeful "safety red" accent that signals action and expertise without overwhelming the professional gray-scale foundation.

## Colors
The palette is rooted in industrial utility. 

- **Primary (#c90c18):** A bold, authoritative red used exclusively for critical actions, branding elements, and data highlights.
- **Secondary (#12181c):** A deep "Charcoal Ink" used for primary text and high-contrast surfaces to ensure maximum legibility.
- **Tertiary (#64748b):** A "Steel Blue-Gray" used for borders, secondary icons, and meta-information.
- **Neutral (#f8fafc):** A "Laboratory White" background that provides a sterile, clean canvas for product photography.

Functional colors (Success, Warning, Info) should utilize desaturated versions of green and amber to maintain the professional, non-distracting tone of the system.

## Typography
The typography strategy employs a "Workhorse" hierarchy. 

**Hanken Grotesk** is used for headlines to provide a sharp, contemporary edge that feels engineered rather than drawn. For the body, **Inter** is utilized for its exceptional legibility in technical documentation and product specs. 

A third typeface, **JetBrains Mono**, is introduced for technical labels, SKU numbers, and chemical compositions. This adds a "data-driven" industrial feel to the interface, signaling precision to the user. All display type should favor tighter tracking, while body text remains open and breathable.

## Layout & Spacing
This design system utilizes a **12-column Fixed Grid** for desktop and a **4-column Fluid Grid** for mobile. 

The spacing rhythm is based on a strict 4px base unit to ensure alignment with industrial blueprints and technical drawings. Layouts should prioritize high-density information display without feeling cluttered. 

- **Desktop:** 12 columns, 24px gutters, 64px side margins.
- **Tablet:** 8 columns, 16px gutters, 32px side margins.
- **Mobile:** 4 columns, 16px gutters, 16px side margins.

Use wide vertical padding (80px+) between major sections to define a professional "gallery" feel for product showcases, while keeping internal component padding tight and efficient.

## Elevation & Depth
Elevation in this system is conveyed through **Tonal Layers** and **Rigid Borders** rather than dramatic shadows. This reflects the "flat and firm" surfaces found in industrial environments.

- **Level 0 (Base):** Neutral white background.
- **Level 1 (Cards):** 1px border in #e2e8f0 with a subtle, 2px "Technical Shadow" (0px 2px 4px rgba(0,0,0,0.05)).
- **Level 2 (Hover/Active):** 1px border in the Primary Red or Secondary Charcoal with a slightly lifted shadow to indicate interactivity.

Avoid heavy blurs. The goal is to make elements feel like physical parts of a machine—bolted down and secure. Use high-contrast dividers to separate technical specifications.

## Shapes
The shape language is "Soft-Industrial." 

We avoid sharp 0px corners to maintain a modern software feel, but we also avoid pill shapes which can feel too consumer-focused or playful. A consistent **0.25rem (4px)** radius is applied to buttons, input fields, and small containers. This slight rounding suggests precision manufacturing while remaining approachable for a professional user base. Large cards may scale up to a **0.5rem (8px)** radius to soften the layout of heavy data.

## Components

### Buttons & Controls
- **Primary Button:** Solid #c90c18 with white text. Use uppercase `label-caps` typography for an impactful, industrial feel.
- **Secondary Button:** Ghost style with a 1px #12181c border.
- **Checkboxes:** Square with a 2px radius, using Primary Red for the "checked" state to signify a confirmed selection.

### Product Cards
Cards should be structured with a neutral background (#f8fafc) and a high-quality product image. The product title uses `headline-lg` and the category/SKU uses `label-caps`. 

### Content Inventory (Product List)
All products must follow a consistent naming convention in the UI:
- **Cleaners:** Tile Cleaner, Window Cleaner, All Purpose Cleaner, Oven Cleaner, Drain Cleaner, Toilet Cleaner.
- **Industrial/Heavy Duty:** Multi Purpose Degreaser, Grit Hand Cleaner, Silicon, Pine Disinfect.
- **Hygiene:** Hand Sanitizer, Hand Soap, Bubble Bath, Fabric Softener.
- **Specialty:** Car Shampoo, Dish washing liquid, Bleach, Pine Gel, Handy Andy, Air Freshner.

### Data Tables
For chemical specifications, use dense tables with `label-md` for row content and `label-caps` for headers. Use #f1f5f9 zebra-striping for readability in long product lists.