---
name: "UT MD Anderson"
description: "Design tokens extracted from https://www.mdanderson.org/prevention-screening/get-screened/breast-cancer-screening.html"
colors:
  primary: "#D82C27"
  primary-hover: "#b62520"
  secondary: "#3361AD"
  secondary-hover: "#2a4e8a"
  accent-purple: "#614B79"
  surface: "#FFFFFF"
  on-surface: "#000000"
  text-body: "#3A3A3A"
  text-muted: "#414042"
  nav-bar: "#000000"
  footer-bar: "#000000"
  footer-sublinks: "#F2F3F4"
  highlight: "#F2F3F4"
  input-bg: "#F2F2F2"
  input-text: "#605D5D"
typography:
  heading-xl:
    role: "H1 — page title"
    fontFamily: "Minion Regular"
    fontSize: "48px"
    fontWeight: 400
    lineHeight: 1.3
    color: "#000000"
  heading-l:
    role: "H2 — section heading"
    fontFamily: "Minion Regular"
    fontSize: "41px"
    fontWeight: 400
    lineHeight: 1.3
    color: "#000000"
  heading-m:
    role: "H3 — subsection heading"
    fontFamily: "Minion Regular"
    fontSize: "36px"
    fontWeight: 400
    lineHeight: 1.3
    color: "#000000"
  heading-s:
    role: "H4/H5 — minor heading"
    fontFamily: "Minion Semi Bold"
    fontSize: "24px"
    fontWeight: 600
    lineHeight: 1.3
    color: "#000000"
  body:
    role: "Body copy"
    fontFamily: "Univers LT W01_55 Roman"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.3
    color: "#3A3A3A"
  body-large:
    role: "Lead / introductory body text"
    fontFamily: "Univers LT W01_55 Roman"
    fontSize: "21px"
    fontWeight: 400
    lineHeight: 1.3
    color: "#3A3A3A"
  ui-bold:
    role: "Navigation labels, buttons, bold UI"
    fontFamily: "Univers LT W01_65 Bold"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.3
    color: "#FFFFFF"
  ui-condensed:
    role: "Nav links, compact UI labels"
    fontFamily: "UniversLTW01-67BoldCn"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.3
    color: "#FFFFFF"
  small:
    role: "Breadcrumbs, captions, footnotes"
    fontFamily: "Univers LT W01_45 Light"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.3
    color: "#414042"
spacing:
  base: "8px"
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  xxl: "40px"
  xxxl: "48px"
  xxxxl: "64px"
rounded:
  sm: "2px"
  md: "6px"
  lg: "15px"
  full: "9999px"
breakpoints:
  xs: "480px"
  sm: "768px"
  md: "992px"
  lg: "1200px"
  xl: "1440px"
  xxl: "1920px"
components:
  button-primary:
    backgroundColor: "#3361AD"
    textColor: "#FFFFFF"
    rounded: "0px"
    padding: "10px 35px"
    fontFamily: "Univers LT W01_65 Bold"
    fontSize: "16px"
  button-cta:
    backgroundColor: "#D82C27"
    textColor: "#FFFFFF"
    rounded: "0px"
    padding: "10px 35px"
  nav-cta-button:
    backgroundColor: "#D82C27"
    textColor: "#FFFFFF"
    rounded: "0px"
  appt-bar:
    backgroundColor: "#3361AD"
    textColor: "#FFFFFF"
  input-observed:
    backgroundColor: "#F2F2F2"
    textColor: "#605D5D"
    rounded: "0px"
    padding: "4px 10px 4px 36px"
    border: "1px solid #cccccc"
---

# Design System

## Overview

Design tokens extracted from mdanderson.org. The YAML front matter contains machine-readable values extracted from the live site. This document reflects the actual rendered design, not aspirational values.

## Colors

### Brand

| Token | Hex | Usage |
|---|---|---|
| `--color-primary` | `#D82C27` | Brand red — primary actions, logo, search submit button |
| `--color-primary-hover` | `#b62520` | Primary red hover state |
| `--color-secondary` | `#3361AD` | Brand blue — CTA buttons, appointment bar, links |
| `--color-secondary-hover` | `#2a4e8a` | Secondary blue hover state |
| `--color-accent-purple` | `#614B79` | Accent purple — MyChart / patient portal button |

### Surface & Text

| Token | Hex | Usage |
|---|---|---|
| `--background-color` | `#FFFFFF` | Page background |
| `--text-color` | `#000000` | Headings, primary text |
| `--text-body-color` | `#3A3A3A` | Body paragraph text |
| `--text-muted-color` | `#414042` | Utility nav, breadcrumbs, secondary text |
| `--input-text-color` | `#605D5D` | Search/form input placeholder and text |

### Navigation & Structure

| Token | Hex | Usage |
|---|---|---|
| `--color-nav-bar` | `#000000` | Top CTA bar and mobile utility bar background |
| `--color-nav-bar-text` | `#FFFFFF` | Text on dark nav bar |
| `--color-footer-bar` | `#000000` | Footer subscribe band and bottom bar background |
| `--color-footer-sublinks` | `#F2F3F4` | Footer sub-links bar background |
| `--color-highlight` | `#F2F3F4` | Section highlight / light background band |
| `--light-color` | `#f8f8f8` | General light surface |

## Typography

Four typeface families used across the site. Icon fonts (FontAwesome, MDIcons, mda-icons) are excluded — they are not text design tokens.

### Heading — Minion (serif)

Used for all `h1`–`h4` headings, footer text.

| Role | Family | Size | Weight | Line Height |
|---|---|---|---|---|
| H1 / Page title | Minion Regular | 48px | 400 | 1.3 |
| H2 / Section heading | Minion Regular | 41px | 400 | 1.3 |
| H3 / Subsection | Minion Regular | 36px | 400 | 1.3 |
| H4 / Minor heading | Minion Regular / Semi Bold | 30px | 700 | 1.3 |
| H5–H6 / Small heading | Minion Semi Bold | 24px | 600 | 1.3 |

### Body — Univers LT W01_55 Roman (sans-serif)

Used for body copy, navigation wrapper, utility bar.

| Role | Family | Size | Weight | Line Height |
|---|---|---|---|---|
| Lead / intro text | Univers LT W01_55 Roman | 21px | 400 | 1.3 |
| Body copy | Univers LT W01_55 Roman | 18px | 400 | 1.3 |
| Small body | Univers LT W01_55 Roman | 16px | 400 | 1.25 |

### UI / Navigation — Univers LT W01_65 Bold & Condensed (sans-serif)

Used for navigation links, button labels, bold UI text.

| Role | Family | Size | Weight | Line Height |
|---|---|---|---|---|
| Nav links | UniversLTW01-67BoldCn | 16px | 400 | 1.3 |
| UI labels / buttons | Univers LT W01_65 Bold | 16px | 400 | 1.25 |

### Light / Secondary — Univers LT W01_45 Light (sans-serif)

Used for breadcrumbs, captions, footnotes, small supporting text.

| Role | Family | Size | Weight | Line Height |
|---|---|---|---|---|
| Breadcrumbs / captions | Univers LT W01_45 Light | 14px | 400 | 1.3 |

## Spacing

Standard 8px base scale used for padding and margin throughout the layout.

| Token | Value | Usage |
|---|---|---|
| `xs` | 4px | Tight internal spacing |
| `sm` | 8px | Base unit |
| `md` | 16px | Standard component padding |
| `lg` | 24px | Section internal padding |
| `xl` | 32px | Comfortable section gaps |
| `xxl` | 40px | Section margins |
| `xxxl` | 48px | Large section gaps |
| `xxxxl` | 64px | Hero / page-level spacing |

Observed values: `main > div` margin `40px 16px`; `.col-content` padding `0 18px 0 36px`; paragraph margin-bottom `18px`; H2 margin `22px 0`.

## Layout

- Max content width: `1200px`
- Desktop content padding: `0 32px`
- Mobile content padding: `0 24px`

## Elevation & Depth

- Inset shadow (inputs/cards): `rgba(0, 0, 0, 0.1) 0px 1px 2px 0px inset`

## Shapes

| Token | Value | Usage |
|---|---|---|
| `--border-radius-sm` | `2px` | Tags, badges |
| `--border-radius-md` | `6px` | Cards, panels |
| `--border-radius-lg` | `15px` | Pills, large radius elements |
| `--border-radius-full` | `9999px` | Circular / pill buttons |

## Responsive Breakpoints

Breakpoints extracted from the site's media queries, grouped into semantic tiers:

| Token | Value | Tier |
|---|---|---|
| `xs` | 480px | Small mobile |
| `sm` | 768px | Mobile / tablet boundary |
| `md` | 992px | Tablet / desktop boundary |
| `lg` | 1200px | Wide desktop |
| `xl` | 1440px | Wide viewport |
| `xxl` | 1920px | Full HD |

Additional granular breakpoints observed: 320px, 540px, 541px, 752px, 767px, 769px, 850px, 991px, 1025px, 1030px, 1100px, 1120px, 1128px, 1145px, 1240px, 1241px.

The EDS project uses `900px` as its primary mobile-to-desktop breakpoint (in `styles.css`).

## Components

### Buttons

| Variant | Background | Text | Border-radius | Padding |
|---|---|---|---|---|
| Primary (blue) | `#3361AD` | `#FFFFFF` | `0px` | `10px 35px` |
| CTA (red) | `#D82C27` | `#FFFFFF` | `0px` | `10px 35px` |
| Hover state | `#D82C27` | `#FFFFFF` | — | — |

### Navigation CTA Bar (top black bar)

- Background: `#000000`
- Text: `#FFFFFF`
- MyChart/appointment button: `#3361AD` background, `#FFFFFF` text
- Patient portal accent: `#614B79` background

### Appointment Sticky Bar

- Background: `#3361AD`
- Text: `#FFFFFF`

### Search Input

- Background: `#F2F2F2` (desktop), `#FFFFFF` (mobile dropdown)
- Text: `#605D5D`
- Submit button: `#D82C27` background, `#FFFFFF` icon
- Border-radius: `0px`

### Footer

- Subscribe / bottom bar: `#000000` background, `#FFFFFF` text
- Sub-links band: `#F2F3F4` background, `#000000` text
- Social icon circles: `#D82C27`

### Breadcrumbs

- Text color: `#3F3D3D` (rgb 63,61,61)
- Font: Univers LT W01_45 Light, 14px
