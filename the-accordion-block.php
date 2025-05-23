<?php
/**
 * The Accordion Block
 *
 * @package     AccordionBlock
 * @author      Mehul Gohil
 * @copyright   2023 Mehul Gohil
 * @license     GPL-3.0+
 *
 * @wordpress-plugin
 * Plugin Name: The Accordion Block
 * Plugin URI: https://github.com/mehul0810/the-accordion-block
 * Description: Add beautiful, accessible, and SEO-optimized FAQ accordions anywhere on your site with rich content support, schema, and perfect theme compatibility.
 * Version: 1.0.0
 * Author: Mehul Gohil
 * Author URI: https://mehulgohil.com
 * Text Domain: the-accordion-block
 * Domain Path: /languages
 * License: GPL-3.0+
 * License URI: http://www.gnu.org/licenses/gpl-3.0.txt
 * Requires at least: 5.9
 * Requires PHP: 7.2
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Define plugin constants.
define( 'THE_ACCORDION_BLOCK_VERSION', '1.0.0' );
define( 'THE_ACCORDION_BLOCK_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'THE_ACCORDION_BLOCK_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
define( 'THE_ACCORDION_BLOCK_PLUGIN_BASENAME', plugin_basename( __FILE__ ) );

// Load Composer autoloader if it exists.
if ( file_exists( THE_ACCORDION_BLOCK_PLUGIN_DIR . 'vendor/autoload.php' ) ) {
	require_once THE_ACCORDION_BLOCK_PLUGIN_DIR . 'vendor/autoload.php';
}

// Initialize the plugin.
if ( class_exists( 'AccordionBlock\\Plugin' ) ) {
	// Initialize plugin.
	function the_accordion_block_init() {
		return \AccordionBlock\Plugin::get_instance();
	}

	// Start the plugin.
	the_accordion_block_init();
}