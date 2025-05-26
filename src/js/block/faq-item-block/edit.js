/**
 * FAQ Item Block Edit
 *
 * @package AccordionBlock
 * @since 1.0.0
 */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	RichText,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import { getIconByName } from '../accordion-block/icons';

/**
 * Edit function
 */
export default function Edit({ attributes, setAttributes, context }) {
	const { question, icon, iconPosition } = attributes;
	const { 'the-accordion-block/defaultOpenFirst': defaultOpenFirst } = context;
	
	// In the editor, always show all accordions as open for easy editing
	const isOpen = true;
	
	const blockProps = useBlockProps({
		className: `the-accordion-block-faq-item ${isOpen ? 'the-accordion-block-faq-item--open' : ''}`,
	});

	// Available icons
	const iconOptions = [
		{ label: __('Chevron', 'the-accordion-block'), value: 'chevron' },
		{ label: __('Plus/Minus', 'the-accordion-block'), value: 'plus-minus' },
		{ label: __('Arrow', 'the-accordion-block'), value: 'arrow' },
		{ label: __('Caret', 'the-accordion-block'), value: 'caret' },
	];

	// Icon position options
	const iconPositionOptions = [
		{ label: __('After question', 'the-accordion-block'), value: 'after' },
		{ label: __('Before question', 'the-accordion-block'), value: 'before' },
	];

	// Get the selected icon
	const selectedIcon = getIconByName(icon);
	
	// Use InnerBlocks for the answer content
	const innerBlocksProps = useInnerBlocksProps(
		{ 
			className: 'the-accordion-block-faq-item__content-inner'
		},
		{
			templateLock: false,
			renderAppender: true,
		}
	);

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('FAQ Item Settings', 'the-accordion-block')}>
					<SelectControl
						label={__('Icon', 'the-accordion-block')}
						value={icon}
						options={iconOptions}
						onChange={(value) => setAttributes({ icon: value })}
					/>
					<SelectControl
						label={__('Icon Position', 'the-accordion-block')}
						value={iconPosition}
						options={iconPositionOptions}
						onChange={(value) => setAttributes({ iconPosition: value })}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="the-accordion-block-faq-item__header">
					<h3 className="the-accordion-block-faq-item__title">
						<button
							className="the-accordion-block-faq-item__button"
							aria-expanded={isOpen}
							type="button"
						>
							{iconPosition === 'before' && (
								<span className="the-accordion-block-faq-item__icon the-accordion-block-faq-item__icon--before">
									{selectedIcon}
								</span>
							)}
							<RichText
								tagName="span"
								className="the-accordion-block__question-text"
								value={question}
								onChange={(value) => setAttributes({ question: value })}
								placeholder={__('Add FAQ question…', 'the-accordion-block')}
							/>
							{iconPosition === 'after' && (
								<span className="the-accordion-block-faq-item__icon the-accordion-block-faq-item__icon--after">
									{selectedIcon}
								</span>
							)}
						</button>
					</h3>
				</div>
				<div
					className="the-accordion-block-faq-item__content"
					aria-hidden={!isOpen}
					style={{ display: isOpen ? 'block' : 'none' }}
				>
					<div {...innerBlocksProps} />
				</div>
			</div>
		</>
	);
}