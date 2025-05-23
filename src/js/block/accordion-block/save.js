/**
 * Accordion Block Save
 *
 * @package AccordionBlock
 * @since 1.0.0
 */

/**
 * WordPress dependencies
 */
import { useBlockProps, RichText, InnerBlocks } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { getIconByName } from './icons';

/**
 * Save function
 */
export default function save({ attributes }) {
	const { question, icon, iconPosition, defaultOpen } = attributes;
	const blockProps = useBlockProps.save({
		className: `the-accordion-block ${defaultOpen ? 'the-accordion-block--open' : ''}`,
	});

	// Get the selected icon
	const selectedIcon = getIconByName(icon);

	return (
		<div {...blockProps}>
			<div className="components-panel">
				<div className="components-panel__body the-accordion-block__header">
					<h2 className="components-panel__body-title">
						<button
							className="components-button components-panel__body-toggle the-accordion-block__button"
							aria-expanded={defaultOpen}
							aria-controls={blockProps.id + '-content'}
						>
							{iconPosition === 'before' && (
								<span 
									className="the-accordion-block__icon the-accordion-block__icon--before"
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
									className="the-accordion-block__icon the-accordion-block__icon--after"
									aria-hidden="true"
								>
									{selectedIcon}
								</span>
							)}
						</button>
					</h2>
				</div>
				<div
					id={blockProps.id + '-content'}
					className="the-accordion-block__content"
					aria-hidden={!defaultOpen}
					style={{ display: defaultOpen ? 'block' : 'none' }}
				>
					<div className="the-accordion-block__content-inner">
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		</div>
	);
}