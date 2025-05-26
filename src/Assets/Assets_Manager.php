<?php
/**
 * Assets Manager Class
 *
 * @package AccordionBlock\Assets
 * @since 1.0.0
 */

namespace AccordionBlock\Assets;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Assets Manager Class
 *
 * Handles frontend assets loading.
 *
 * @since 1.0.0
 */
class Assets_Manager {

	/**
	 * Constructor.
	 *
	 * @since 1.0.0
	 */
	public function __construct() {
		// Register and enqueue frontend assets.
		add_action( 'wp_enqueue_scripts', array( $this, 'register_frontend_assets' ) );
	}

	/**
	 * Register frontend assets.
	 *
	 * @since 1.0.0
	 * @return void
	 */
	public function register_frontend_assets() {
		// Register frontend script.
		wp_register_script(
			'the-accordion-block-frontend',
			THE_ACCORDION_BLOCK_PLUGIN_URL . 'build/frontend.js',
			array(),
			THE_ACCORDION_BLOCK_VERSION,
			true
		);

		// Register frontend styles.
		wp_register_style(
			'the-accordion-block-frontend',
			THE_ACCORDION_BLOCK_PLUGIN_URL . 'build/frontend.css',
			array(),
			THE_ACCORDION_BLOCK_VERSION
		);

		// Only enqueue assets if the block is used on the page.
		if ( $this->is_block_used_on_page() ) {
			wp_enqueue_script( 'the-accordion-block-frontend' );
			wp_enqueue_style( 'the-accordion-block-frontend' );
		}
	}

	/**
	 * Check if the accordion block is used on the current page.
	 *
	 * @since 1.0.0
	 * @return boolean Whether the block is used on the page.
	 */
	private function is_block_used_on_page() {
		// If we're in the admin, don't check.
		if ( is_admin() ) {
			return false;
		}

		// If it's a REST API request, don't check.
		if ( defined( 'REST_REQUEST' ) && REST_REQUEST ) {
			return false;
		}

		// Get the current post.
		global $post;
		if ( ! is_object( $post ) ) {
			return false;
		}

		// Check if any of our blocks are used in the content.
		if ( has_block( 'the-accordion-block/accordion-block', $post ) || has_block( 'the-accordion-block/faq', $post ) || has_block( 'the-accordion-block/faq-item', $post ) ) {
			return true;
		}

		// Check for reusable blocks.
		if ( has_block( 'core/block', $post ) ) {
			$content = $post->post_content;
			$blocks  = parse_blocks( $content );

			// Helper function to check for nested accordion blocks.
			$check_blocks = function ( $blocks ) use ( &$check_blocks ) {
				foreach ( $blocks as $block ) {
					// Check if it's an accordion block.
					if ( 'the-accordion-block/accordion-block' === $block['blockName'] || 'the-accordion-block/faq' === $block['blockName'] || 'the-accordion-block/faq-item' === $block['blockName'] ) {
						return true;
					}

					// Check for nested blocks in innerBlocks.
					if ( ! empty( $block['innerBlocks'] ) ) {
						if ( $check_blocks( $block['innerBlocks'] ) ) {
							return true;
						}
					}

					// Check if it's a reusable block.
					if ( 'core/block' === $block['blockName'] && ! empty( $block['attrs']['ref'] ) ) {
						$reusable_block = get_post( $block['attrs']['ref'] );
						if ( $reusable_block && ( 
							has_block( 'the-accordion-block/accordion-block', $reusable_block ) || 
							has_block( 'the-accordion-block/faq', $reusable_block ) ||
							has_block( 'the-accordion-block/faq-item', $reusable_block )
						) ) {
							return true;
						}
					}
				}
				return false;
			};

			// Check all blocks.
			if ( $check_blocks( $blocks ) ) {
				return true;
			}
		}

		return false;
	}
}