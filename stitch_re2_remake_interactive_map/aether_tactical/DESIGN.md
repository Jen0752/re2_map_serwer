---
name: Aether Tactical
colors:
  surface: '#fcf8f8'
  surface-dim: '#ddd9d9'
  surface-bright: '#fcf8f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f1edec'
  surface-container-high: '#ebe7e7'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1c1b1b'
  on-surface-variant: '#444748'
  inverse-surface: '#313030'
  inverse-on-surface: '#f4f0ef'
  outline: '#747878'
  outline-variant: '#c4c7c8'
  surface-tint: '#5d5f5f'
  primary: '#5d5f5f'
  on-primary: '#ffffff'
  primary-container: '#ffffff'
  on-primary-container: '#747676'
  inverse-primary: '#c6c6c7'
  secondary: '#006591'
  on-secondary: '#ffffff'
  secondary-container: '#39b8fd'
  on-secondary-container: '#004666'
  tertiary: '#5d5f5f'
  on-tertiary: '#ffffff'
  tertiary-container: '#ffffff'
  on-tertiary-container: '#747676'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c7'
  on-primary-fixed: '#1a1c1c'
  on-primary-fixed-variant: '#454747'
  secondary-fixed: '#c9e6ff'
  secondary-fixed-dim: '#89ceff'
  on-secondary-fixed: '#001e2f'
  on-secondary-fixed-variant: '#004c6e'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#fcf8f8'
  on-background: '#1c1b1b'
  surface-variant: '#e5e2e1'
typography:
  display-map:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '300'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  h1-heading:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  h2-subheading:
    fontFamily: Space Grotesk
    fontSize: 18px
    fontWeight: '500'
    lineHeight: '1.4'
  body-main:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0.01em
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: Space Grotesk
    fontSize: 11px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.08em
  mono-data:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '400'
    lineHeight: '1'
    letterSpacing: 0.02em
spacing:
  unit: 4px
  gutter: 16px
  margin-edge: 24px
  stack-xs: 4px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
  panel-width: 320px
---

## Brand & Style

This design system is built for high-stakes decision-making environments where clarity and speed of information processing are paramount. The aesthetic is rooted in **Minimalism** with a heavy influence from high-precision laboratory and aerospace instrumentation. 

The brand personality is clinical, disciplined, and objective. It avoids visual clutter to prioritize spatial data, evoking a sense of "calm authority." By utilizing a restricted palette and hairline strokes, the UI creates a sophisticated, "lightweight" feel that recedes into the background, allowing the tactical map data to remain the primary focus.

## Colors

The color strategy relies on an "Inverted Map" approach. The primary surface is pure white (#FFFFFF), providing maximum contrast for tactical overlays. 

- **Primary:** White (#FFFFFF) used for all major surfaces and container backgrounds.
- **Action/Highlight:** Sky Blue (#0EA5E9) is used sparingly for active states, primary call-to-actions, and critical map markers.
- **Subtle Accent:** Light Sky (#E0F2FE) defines hover states, secondary highlights, and soft grouping backgrounds.
- **Ink:** Slate (#0F172A) is used for primary text and iconography to ensure AAA legibility against the white base.
- **System:** Thin borders and inactive elements use a muted Slate (#94A3B8) to maintain the "wireframe" precision of the interface.

## Typography

This design system employs a dual-font strategy to balance technical precision with readability. 

**Space Grotesk** is used for headings, labels, and data readouts. Its geometric, slightly technical character reinforces the tactical nature of the interface. Small caps are utilized for utility labels to maximize space.

**Inter** is the workhorse for body copy and descriptions. Its neutral, systematic nature ensures that long-form tactical briefs or coordinate lists remain legible during rapid scanning. 

All text should favor slightly increased tracking (letter spacing) in labels to enhance readability against white backgrounds.

## Layout & Spacing

The layout follows a **Fixed-Fluid Hybrid** model. The tactical map occupies the fluid background layer, while control panels and data readouts exist as fixed-width floating modules or anchored sidebars.

A strict **4px baseline grid** governs all spacing. Elements are grouped using generous whitespace rather than heavy lines. Margin "safe zones" of 24px are maintained around the viewport edges to ensure controls do not interfere with map navigation. Content within panels should use a 16px gutter to maintain an airy, breathable feel despite high data density.

## Elevation & Depth

This design system eschews traditional shadows in favor of **Tonal Layers and Low-Contrast Outlines**. Depth is communicated through structural stacking rather than faux-lighting.

1.  **Level 0 (Base):** The tactical map itself.
2.  **Level 1 (Panels):** Pure white backgrounds with a 1px solid border (#E2E8F0). No shadow.
3.  **Level 2 (Popovers/Modals):** Pure white background with a slightly thicker 2px border in the accent color (#E0F2FE) and a very soft, high-diffusion "ambient" glow (0px 8px 24px rgba(14, 165, 233, 0.05)).

Glassmorphism is used exclusively for floating map controls (zoom, compass, layers) using a high-blur (20px) backdrop filter and 80% opacity white fill to allow map features to be partially visible beneath the controls.

## Shapes

The design system utilizes **Sharp (0px)** geometry. The 0px radius reinforces the professional, technical, and "engineered" feel of a tactical instrument. 

Right angles provide a sense of mathematical precision and allow for seamless tiling of data modules. Circular shapes are reserved strictly for status indicators (e.g., "Active" pings) and map iconography to provide an immediate visual distinction between "Interface" (Rectangular) and "Intelligence" (Circular).

## Components

- **Buttons:** Primary buttons are #0EA5E9 with white text. Secondary buttons are white with a 1px #0F172A border. All buttons use the "label-caps" typography style and have a height of 40px.
- **Tactical Chips:** Small, 24px high containers with #E0F2FE backgrounds and #0EA5E9 text. Used for status tags or coordinate shorthand.
- **Input Fields:** Minimalist underlines or 1px border-bottom only. Focus state changes the border-bottom to #0EA5E9 with a 2px thickness.
- **Data Lists:** Use hairline horizontal dividers (#F1F5F9). Alternate row striping is prohibited; use whitespace for separation.
- **Map Markers:** Hairline circles with crosshair inner-details. Use #0EA5E9 for friendly assets and high-contrast black for neutral points.
- **Coordinate Cards:** Floating white boxes with a 1px border. The header of the card should use a 4px left-accent border in Sky Blue to denote selection.
- **Control Toggles:** Square checkboxes. When active, they are filled #0EA5E9 with a white "check" stroke.