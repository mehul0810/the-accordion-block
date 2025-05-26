/**
 * FAQ Item Block Save
 *
 * @package AccordionBlock
 * @since 1.0.0
 */

/**
 * WordPress dependencies
 */
import { useBlockProps, RichText, useInnerBlocksProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { getIconByName } from '../accordion-block/icons';

/**
 * Save function
 */
export default function save({ attributes }) {
	const { question, icon, iconPosition } = attributes;
	
	const blockProps = useBlockProps.save({
		className: 'the-accordion-block-faq-item',
	});

	// Get the selected icon
	const selectedIcon = getIconByName(icon);
	
	// Use InnerBlocks.Content for the answer content
	const innerBlocksProps = useInnerBlocksProps.save(
		{ className: 'the-accordion-block-faq-item__content-inner' }
	);

	return (
		<div {...blockProps}>
			<div className="the-accordion-block-faq-item__header">
				<h3 className="the-accordion-block-faq-item__title">
					<button
						className="the-accordion-block-faq-item__button"
						aria-expanded="false"
						aria-controls={blockProps.id + '-content'}
						type="button"
					>
						{iconPosition === 'before' && (
							<span 
								className="the-accordion-block-faq-item__icon the-accordion-block-faq-item__icon--before"
								aria-hidden="true"
							>
								{selectedIcon}
							</span>
						)}
						<RichText.Content
							tagName="span"
							className="the-accordion-block__question-text"
							value={question}
						/>
						{iconPosition === 'after' && (
							<span 
								className="the-accordion-block-faq-item__icon the-accordion-block-faq-item__icon--after"
								aria-hidden="true"
							>
								{selectedIcon}
							</span>
						)}
					</button>
				</h3>
			</div>
			<div
				id={blockProps.id + '-content'}
				className="the-accordion-block-faq-item__content"
				aria-hidden="true"
				style={{ display: 'none' }}
			>
				<div {...innerBlocksProps} />
			</div>
		</div>
	);
}