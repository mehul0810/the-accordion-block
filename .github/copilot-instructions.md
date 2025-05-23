# CoPilot Development Instructions – The Accordion Block

## Project Context

- **Plugin Name:** The Accordion Block
- **Purpose:** Gutenberg block plugin for FAQ-style accordions, optimized for SEO with FAQ schema support, block presets, rich content, and perfect theme compatibility.
- **Audience:** All WordPress site owners who want easy, beautiful, and SEO-friendly accordions.

---

## Core Development Instructions

1. **Code Standards**
    - Use modern WordPress coding standards for PHP, JavaScript, and CSS.
    - All PHP must use proper namespaces (`AccordionBlock\*`).
    - Use Composer for PSR-4 autoloading.  
      - Main PHP classes in `/src/`, registered via Composer autoload.
    - Block JS/CSS must use [@wordpress/scripts](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-scripts/) (wp-scripts) for bundling and hot reload.

2. **Block Editor Implementation**
    - Register a single block via `block.json`.
    - Main React block code in `/src/Block/AccordionBlock.js`.
    - Rich content enabled in answer/content via InnerBlocks.
    - Block controls (InspectorControls) for:  
      - Preset style selector (via block styles).
      - Icon picker and position (before/after, set per accordion).
      - Option to disable plugin CSS.
      - Option to set first-open vs. all-collapsed default state.

3. **Styling & Presets**
    - Default style follows WP Design System.
    - Add at least two additional presets.
    - If “disable plugin CSS” is set, do not enqueue plugin CSS on frontend.

4. **Icon Support**
    - Use inline SVG for all icons.
    - Allow user to pick per accordion item.
    - Icon position (before/after) is a per-accordion setting.

5. **FAQ Schema Integration**
    - Detect if Yoast SEO, RankMath, or AIOSEO is active.
    - Output valid FAQPage JSON-LD schema only if supported plugin is present.
    - Avoid double schema output.
    - Use PHP class: `AccordionBlock\Schema\FAQ` for schema output logic.

6. **Frontend JS/CSS**
    - Only load assets if block exists on the page.
    - No jQuery; use vanilla JS for accordion toggle.
    - Animate open/close via CSS transitions.
    - Accessibility:  
      - ARIA attributes and roles.
      - Keyboard navigation (WAI-ARIA Accordion pattern).

7. **Performance & Extensibility**
    - Code must be modular, maintainable, and well-documented.
    - All assets should be as lightweight as possible.
    - Support hooks/filters for extending icons, presets, or schema output.

8. **General Best Practices**
    - All text strings are translation ready.
    - Test for compatibility with major block themes and classic themes.
    - Add appropriate PHPDoc and JSdoc comments for all public functions.

---

## Architecture Reference

- **PHP Namespaces:**  
  - `AccordionBlock\Block` – Block registration and logic.
  - `AccordionBlock\Schema` – FAQ schema output.
  - `AccordionBlock\Admin` – Editor/admin-specific assets.
  - `AccordionBlock\Assets` – Frontend asset logic.
- **Composer Autoload:**  
  - Use `composer.json` to autoload all PHP classes in `/src/` using PSR-4.
  - No direct file includes.

- **Build:**  
  - Run `npm run start` for development, `npm run build` for production bundles via `wp-scripts`.

---

## Clarifications

- If unsure about any business logic, UI/UX, or technical standard, **ask before implementing**.
- Always prefer WordPress native APIs and block editor conventions.
- Prioritize performance, accessibility, and extensibility.
