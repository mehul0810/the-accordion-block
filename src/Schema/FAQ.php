<?php
/**
 * FAQ Schema Class
 *
 * @package AccordionBlock\Schema
 * @since 1.0.0
 */

namespace AccordionBlock\Schema;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * FAQ Schema Class
 *
 * Handles the output of FAQPage schema.
 *
 * @since 1.0.0
 */
class FAQ {

	/**
	 * Constructor.
	 *
	 * @since 1.0.0
	 */
	public function __construct() {
		// Add FAQ schema to the page.
		add_action( 'wp_footer', array( $this, 'output_faq_schema' ) );
	}

	/**
	 * Output FAQ schema.
	 *
	 * @since 1.0.0
	 * @return void
	 */
	public function output_faq_schema() {
		// Get FAQ items from the page.
		$faq_items = $this->get_faq_items();

		// If no FAQ items, return.
		if ( empty( $faq_items ) ) {
			return;
		}

		// Check if the SEO plugin already outputs FAQ schema.
		if ( $this->is_schema_output_by_seo_plugin() ) {
			return;
		}

		// Generate FAQ schema.
		$schema = array(
			'@context'   => 'https://schema.org',
			'@type'      => 'FAQPage',
			'mainEntity' => array(),
		);

		// Add each FAQ item to the schema.
		foreach ( $faq_items as $faq_item ) {
			$schema['mainEntity'][] = array(
				'@type'          => 'Question',
				'name'           => $faq_item['question'],
				'acceptedAnswer' => array(
					'@type' => 'Answer',
					'text'  => $faq_item['answer'],
				),
			);
		}

		// Output the schema.
		printf(
			'<script type="application/ld+json">%s</script>',
			wp_json_encode( $schema )
		);
	}

	/**
	 * Get FAQ items from the page.
	 *
	 * @since 1.0.0
	 * @return array FAQ items.
	 */
	private function get_faq_items() {
		// Get the current post.
		global $post;
		if ( ! is_object( $post ) ) {
			return array();
		}

		// Get the post content.
		$content = $post->post_content;
		$blocks  = parse_blocks( $content );

		// FAQ items.
		$faq_items = array();

		// Helper function to extract FAQ items from blocks.
		$extract_faq_items = function ( $blocks ) use ( &$extract_faq_items, &$faq_items ) {
			foreach ( $blocks as $block ) {
				// If it's an accordion block, extract FAQ item.
				if ( 'the-accordion-block/accordion-block' === $block['blockName'] ) {
					$question = ! empty( $block['attrs']['question'] ) ? $block['attrs']['question'] : '';
					$answer   = ! empty( $block['innerHTML'] ) ? $this->get_inner_html_content( $block['innerHTML'] ) : '';

					// Add to FAQ items if both question and answer exist.
					if ( $question && $answer ) {
						$faq_items[] = array(
							'question' => $question,
							'answer'   => $answer,
						);
					}
				}

				// Check for nested blocks in innerBlocks.
				if ( ! empty( $block['innerBlocks'] ) ) {
					$extract_faq_items( $block['innerBlocks'] );
				}

				// Check if it's a reusable block.
				if ( 'core/block' === $block['blockName'] && ! empty( $block['attrs']['ref'] ) ) {
					$reusable_block = get_post( $block['attrs']['ref'] );
					if ( $reusable_block ) {
						$reusable_blocks = parse_blocks( $reusable_block->post_content );
						$extract_faq_items( $reusable_blocks );
					}
				}
			}
		};

		// Extract FAQ items from all blocks.
		$extract_faq_items( $blocks );

		return $faq_items;
	}

	/**
	 * Extract text content from inner HTML.
	 *
	 * @since 1.0.0
	 * @param string $html HTML content.
	 * @return string Extracted text content.
	 */
	private function get_inner_html_content( $html ) {
		// Strip HTML tags preserving relevant content.
		$content = wp_strip_all_tags( $html, false );

		// Decode HTML entities.
		$content = html_entity_decode( $content );

		// Trim whitespace.
		$content = trim( $content );

		return $content;
	}

	/**
	 * Check if FAQ schema is already output by the SEO plugin.
	 *
	 * @since 1.0.0
	 * @return boolean Whether FAQ schema is output by the SEO plugin.
	 */
	private function is_schema_output_by_seo_plugin() {
		global $post;
		
		// If no post, return false.
		if ( ! is_object( $post ) ) {
			return false;
		}

		// Check for Yoast SEO.
		if ( function_exists( 'YoastSEO' ) ) {
			// Yoast SEO has FAQ schema blocks.
			if ( has_block( 'yoast/faq-block', $post ) ) {
				return true;
			}
		}

		// Check for Rank Math.
		if ( class_exists( '\\RankMath\\Schema\\Schema' ) ) {
			// If Rank Math is managing schema, let it handle it.
			if ( has_action( 'wp_footer', 'rank_math_add_structured_data' ) || 
				has_action( 'wp_head', 'rank_math_add_structured_data' ) ) {
				return true;
			}
		}

		// Check for All in One SEO.
		if ( class_exists( '\\AIOSEO\\Plugin\\Common\\Schema\\Schema' ) ) {
			// If AIOSEO is managing schema, let it handle it.
			if ( has_action( 'wp_head', 'aioseo_schema_output' ) ) {
				return true;
			}
		}

		return false;
	}
}