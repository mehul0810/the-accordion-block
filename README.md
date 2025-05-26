# The Accordion Block

A plug-and-play Gutenberg block plugin for WordPress that lets you add beautiful, accessible, and SEO-optimized FAQ accordions anywhere on your site.  
Zero configuration, modern design presets, FAQ schema support, and perfect theme compatibility.

---

## Features

- **Add FAQ Accordions Anywhere:**  
  Easily add multiple FAQ items with questions and rich content answers.  
  Reorder, add, and remove FAQ items with intuitive UI.

- **Rich Content Support:**  
  Use any block (text, images, lists, embeds) in the answer area. No limits.

- **SEO-Ready with FAQ Schema:**  
  Outputs valid [FAQPage JSON-LD schema](https://developers.google.com/search/docs/appearance/structured-data/faqpage) for all visible accordions.  
  **Auto-detects major SEO plugins** (Yoast SEO, RankMath, AIOSEO) for seamless integration and prevents duplicate schema.

- **Accessible & Keyboard-Friendly:**  
  Built on the [WAI-ARIA Accordion Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/).  
  Full keyboard navigation and ARIA compliance out of the box.

- **Modern Design Presets:**  
  Choose from a variety of built-in style presets, including a default matching the WordPress Design System (WPDS).  
  Optionally **disable plugin CSS** to let your theme fully control styling.

- **Custom Icons:**  
  Select icon (chevron, arrow, plus/minus, etc.) and its position (before/after) for each accordion item.  
  All icons are lightweight SVG and extendable.

- **Performance First:**  
  No frontend JS or CSS loaded unless the block is present on the page.  
  Pure CSS animation for open/close—no jQuery, no bloat.

- **Developer-Friendly:**  
  Modular, extensible code with PSR-4 autoloading and PHP namespaces.  
  Built using [@wordpress/scripts](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-scripts/) for fast, modern development.

---

## Quick Start

1. **Install and Activate:**
    - Upload or clone this repository into your WordPress `/wp-content/plugins/` directory.
    - Run `composer install` (for autoloading) and `npm install` (for JS/CSS build tools).
    - Activate “The Accordion Block” plugin from your WordPress dashboard.

2. **Build Assets:**
    - Development:  
      `npm run start`
    - Production:  
      `npm run build`

3. **Add Accordions:**
    - In the Block Editor, add “Accordion Block” from the block inserter.
    - Enter your question and add any blocks to the answer area.
    - Select design preset and icon in the block sidebar.
    - Optional: Save accordions as patterns for reuse.

---

## Block Controls

- **Preset Styles:**  
  Instantly switch between built-in design looks.
- **Icon Picker:**  
  Choose icon per FAQ item and set its position (before/after question).
- **Disable Plugin CSS:**  
  Let your theme take full control of the accordion look.
- **Default Open State:**  
  Set whether first accordion is open or all are collapsed by default.

---

## FAQ Schema & SEO

- **Automatic FAQPage JSON-LD:**  
  - Output only if Yoast SEO, RankMath, or AIOSEO plugin is active.
  - Schema is injected for all visible accordions on the page.
  - Prevents duplicate FAQ schema if your SEO plugin already handles it.
- **Works with any theme**—block and classic.

---

## Accessibility

- Keyboard navigation (Tab, Arrow keys) and full ARIA support.
- Semantic markup using buttons, headings, and regions.

---

## Technical Details

- **PHP:**  
  - Namespaced under `AccordionBlock\*`, PSR-4 autoloaded with Composer.
  - Main classes in `/src/`.
- **JS/CSS:**  
  - Built with [@wordpress/scripts](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-scripts/).
  - Main block code: `/src/Block/AccordionBlock.js`.
  - CSS-only animation for performance.
- **No jQuery, no legacy dependencies.**

---

## Contributing

Pull requests, issues, and feature suggestions are welcome!

- Please follow WordPress, PHP, and JS coding standards.
- All PHP classes should be namespaced and autoloaded.
- Keep code modular and well-documented.

---

## Roadmap

Planned features for future releases:
- More design presets.
- Drag-and-drop reorder within patterns.
- Custom icon uploads.
- Analytics for accordion opens/clicks.
- WooCommerce/ACF integration.

---

## License

GPLv3

---

## Credits

Developed by [Mehul Gohil](https://mehulgohil.com/).  
Inspired by the best practices in WordPress block development.

---

## Links

- [WordPress Block Editor Handbook](https://developer.wordpress.org/block-editor/)
- [FAQPage Schema Docs](https://developers.google.com/search/docs/appearance/structured-data/faqpage)
