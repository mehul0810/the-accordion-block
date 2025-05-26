<?php
/**
 * Block Registration Class
 *
 * @package AccordionBlock\Block
 * @since 1.0.0
 */

namespace AccordionBlock\Block;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Registration Class
 *
 * Handles the registration of the accordion block.
 *
 * @since 1.0.0
 */
class Block_Registration {

	/**
	 * Constructor.
	 *
	 * @since 1.0.0
	 */
	public function __construct() {
		// Register the block.
		add_action( 'init', array( $this, 'register_block' ) );

		// Register block styles.
		add_action( 'init', array( $this, 'register_block_styles' ) );

		// Load editor assets.
		add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue_editor_assets' ) );
	}

	/**
	 * Register the accordion block.
	 *
	 * @since 1.0.0
	 * @return void
	 */
	public function register_block() {
		// Register the block using block.json.
		$asset_file = include THE_ACCORDION_BLOCK_PLUGIN_DIR . 'build/index.asset.php';
		
		wp_register_script(
			'the-accordion-block-editor-script',
			THE_ACCORDION_BLOCK_PLUGIN_URL . 'build/index.js',
			$asset_file['dependencies'],
			$asset_file['version']
		);

		// Register the accordion block.
		register_block_type( 
			THE_ACCORDION_BLOCK_PLUGIN_DIR . 'build/block.json',
			array(
				'editor_script' => 'the-accordion-block-editor-script',
			)
		);
		
		// Register the FAQ block.
		register_block_type( 
			THE_ACCORDION_BLOCK_PLUGIN_DIR . 'build/faq-block.json',
			array(
				'editor_script' => 'the-accordion-block-editor-script',
			)
		);
		
		// Register the FAQ item block.
		register_block_type( 
			THE_ACCORDION_BLOCK_PLUGIN_DIR . 'build/faq-item-block.json',
			array(
				'editor_script' => 'the-accordion-block-editor-script',
			)
		);
	}

	/**
	 * Register block styles.
	 *
	 * @since 1.0.0
	 * @return void
	 */
	public function register_block_styles() {
		// Register styles for the accordion block.
		$this->register_accordion_block_styles();
		
		// Register styles for the FAQ block.
		$this->register_faq_block_styles();
	}
	
	/**
	 * Register styles for the accordion block.
	 *
	 * @since 1.0.0
	 * @return void
	 */
	private function register_accordion_block_styles() {
		// Register default style (WordPress Design System).
		register_block_style(
			'the-accordion-block/accordion',
			array(
				'name'         => 'default',
				'label'        => __( 'Default (WPDS)', 'the-accordion-block' ),
				'is_default'   => true,
				'inline_style' => '',
			)
		);

		// Register modern style.
		register_block_style(
			'the-accordion-block/accordion',
			array(
				'name'         => 'modern',
				'label'        => __( 'Modern', 'the-accordion-block' ),
				'inline_style' => '',
			)
		);

		// Register minimal style.
		register_block_style(
			'the-accordion-block/accordion',
			array(
				'name'         => 'minimal',
				'label'        => __( 'Minimal', 'the-accordion-block' ),
				'inline_style' => '',
			)
		);
	}
	
	/**
	 * Register styles for the FAQ block.
	 *
	 * @since 1.0.0
	 * @return void
	 */
	private function register_faq_block_styles() {
		// Register default style (WordPress Design System).
		register_block_style(
			'the-accordion-block/accordion',
			array(
				'name'         => 'default',
				'label'        => __( 'Default (WPDS)', 'the-accordion-block' ),
				'is_default'   => true,
				'inline_style' => '',
			)
		);

		// Register modern style.
		register_block_style(
			'the-accordion-block/accordion',
			array(
				'name'         => 'modern',
				'label'        => __( 'Modern', 'the-accordion-block' ),
				'inline_style' => '',
			)
		);

		// Register minimal style.
		register_block_style(
			'the-accordion-block/accordion',
			array(
				'name'         => 'minimal',
				'label'        => __( 'Minimal', 'the-accordion-block' ),
				'inline_style' => '',
			)
		);
	}

	/**
	 * Enqueue editor assets.
	 *
	 * @since 1.0.0
	 * @return void
	 */
	public function enqueue_editor_assets() {
		// Enqueue editor script.
		wp_enqueue_script(
			'the-accordion-block-editor',
			THE_ACCORDION_BLOCK_PLUGIN_URL . 'build/index.js',
			array(
				'wp-blocks',
				'wp-i18n',
				'wp-element',
				'wp-block-editor',
				'wp-components',
			),
			THE_ACCORDION_BLOCK_VERSION,
			true
		);

		// Enqueue editor styles.
		wp_enqueue_style(
			'the-accordion-block-editor',
			THE_ACCORDION_BLOCK_PLUGIN_URL . 'build/index.css',
			array( 'wp-edit-blocks' ),
			THE_ACCORDION_BLOCK_VERSION
		);
	}
}