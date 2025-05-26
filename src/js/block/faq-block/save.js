/**
 * FAQ Block Save
 *
 * @package AccordionBlock
 * @since 1.0.0
 */

/**
 * WordPress dependencies
 */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

/**
 * Save function
 */
export default function save({ attributes }) {
	const { disableCss } = attributes;
	
	const blockProps = useBlockProps.save({
		className: `the-accordion-block-faq ${disableCss ? 'the-accordion-block-faq--disable-css' : ''} ${attributes.defaultOpenFirst ? 'default-open-first' : ''}`,
	});

	// Use InnerBlocks.Content for the FAQ items
	const innerBlocksProps = useInnerBlocksProps.save(
		{ className: 'the-accordion-block-faq__items' }
	);

	return (
		<div {...blockProps}>
			<div {...innerBlocksProps} />
		</div>
	);
}