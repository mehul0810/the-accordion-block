=== The Accordion Block ===
Contributors: mehulgohil
Tags: accordion, faq, gutenberg, block, schema
Requires at least: 5.9
Tested up to: 6.4
Requires PHP: 7.2
Stable tag: 1.0.0
License: GPLv3
License URI: http://www.gnu.org/licenses/gpl-3.0.html

Add beautiful, accessible, and SEO-optimized FAQ accordions anywhere on your site with rich content support, schema, and perfect theme compatibility.

== Description ==

A plug-and-play Gutenberg block plugin for WordPress that lets you add beautiful, accessible, and SEO-optimized FAQ accordions anywhere on your site.  
Zero configuration, modern design presets, FAQ schema support, and perfect theme compatibility.

= Features =

* **Add Accordion FAQs Anywhere:**  
  Instantly add a question and answer (rich content) using a single, reusable block.  
  Supports patterns and block templates for efficient workflows.

* **Rich Content Support:**  
  Use any block (text, images, lists, embeds) in the answer area. No limits.

* **SEO-Ready with FAQ Schema:**  
  Outputs valid FAQPage JSON-LD schema for all visible accordions.  
  Auto-detects major SEO plugins (Yoast SEO, RankMath, AIOSEO) for seamless integration and prevents duplicate schema.

* **Accessible & Keyboard-Friendly:**  
  Built on the WAI-ARIA Accordion Pattern.  
  Full keyboard navigation and ARIA compliance out of the box.

* **Modern Design Presets:**  
  Choose from a variety of built-in style presets, including a default matching the WordPress Design System (WPDS).  
  Optionally disable plugin CSS to let your theme fully control styling.

* **Custom Icons:**  
  Select icon (chevron, arrow, plus/minus, etc.) and its position (before/after) for each accordion item.  
  All icons are lightweight SVG and extendable.

* **Performance First:**  
  No frontend JS or CSS loaded unless the block is present on the page.  
  Pure CSS animation for open/close—no jQuery, no bloat.

* **Developer-Friendly:**  
  Modular, extensible code with PSR-4 autoloading and PHP namespaces.  
  Built using @wordpress/scripts for fast, modern development.

== Installation ==

1. Upload the plugin files to the `/wp-content/plugins/the-accordion-block` directory, or install the plugin through the WordPress plugins screen directly.
2. Activate the plugin through the 'Plugins' screen in WordPress.
3. Use the block editor to add the 'Accordion Block' to your posts or pages.

== Frequently Asked Questions ==

= Does this output valid FAQ Schema? =

Yes! The plugin automatically outputs FAQPage schema for all visible accordions on the page if you have Yoast SEO, RankMath, or AIOSEO active. It's designed to prevent duplicate schema if your SEO plugin already handles it.

= Can I use any content in the accordion answers? =

Absolutely! You can use any Gutenberg blocks inside the accordion content area - text, images, galleries, videos, or even other blocks.

= Is it accessible? =

Yes, the plugin follows the WAI-ARIA Accordion Pattern with full keyboard navigation support and proper ARIA attributes.

== Screenshots ==

1. Adding an accordion block
2. Different preset styles
3. Block controls in the sidebar
4. Accordion with rich content in the answer area

== Changelog ==

= 1.0.0 =
* Initial release

== Upgrade Notice ==

= 1.0.0 =
Initial release