<?php
/**
 * Main Plugin Class
 *
 * @package AccordionBlock
 * @since 1.0.0
 */

namespace AccordionBlock;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Plugin Class
 *
 * Manages the plugin's initialization, hooks, and main functionality.
 *
 * @since 1.0.0
 */
class Plugin {

	/**
	 * Instance of the class.
	 *
	 * @since 1.0.0
	 * @var object
	 */
	private static $instance;

	/**
	 * Get class instance.
	 *
	 * @since 1.0.0
	 * @return object Instance of the class.
	 */
	public static function get_instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * Constructor.
	 *
	 * @since 1.0.0
	 */
	private function __construct() {
		$this->init();
	}

	/**
	 * Initialize the plugin.
	 *
	 * @since 1.0.0
	 * @return void
	 */
	private function init() {
		// Load translations.
		add_action( 'init', array( $this, 'load_textdomain' ) );

		// Initialize classes.
		$this->init_classes();
	}

	/**
	 * Load plugin translations.
	 *
	 * @since 1.0.0
	 * @return void
	 */
	public function load_textdomain() {
		load_plugin_textdomain(
			'the-accordion-block',
			false,
			dirname( THE_ACCORDION_BLOCK_PLUGIN_BASENAME ) . '/languages'
		);
	}

	/**
	 * Initialize plugin classes.
	 *
	 * @since 1.0.0
	 * @return void
	 */
	private function init_classes() {
		// Initialize block registration.
		new Block\Block_Registration();

		// Initialize assets management.
		new Assets\Assets_Manager();

		// Initialize schema if a supported SEO plugin is active.
		if ( $this->is_seo_plugin_active() ) {
			new Schema\FAQ();
		}
	}

	/**
	 * Check if a supported SEO plugin is active.
	 *
	 * @since 1.0.0
	 * @return boolean True if a supported SEO plugin is active, false otherwise.
	 */
	private function is_seo_plugin_active() {
		// Array of supported SEO plugins.
		$seo_plugins = array(
			'wordpress-seo/wp-seo.php',           // Yoast SEO.
			'wordpress-seo-premium/wp-seo.php',   // Yoast SEO Premium.
			'seo-by-rank-math/rank-math.php',     // Rank Math SEO.
			'all-in-one-seo-pack/all_in_one_seo_pack.php', // All in One SEO.
		);

		// Check if at least one of the supported SEO plugins is active.
		foreach ( $seo_plugins as $plugin ) {
			if ( is_plugin_active( $plugin ) ) {
				return true;
			}
		}

		return false;
	}
}