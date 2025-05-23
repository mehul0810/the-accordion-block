/**
 * Accordion Block Edit
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
	InnerBlocks,
} from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	ToggleControl,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import { getIconByName } from './icons';

/**
 * Edit function
 */
export default function Edit({ attributes, setAttributes }) {
	const { question, icon, iconPosition, disableCss, defaultOpen } = attributes;
	const blockProps = useBlockProps({
		className: `the-accordion-block ${defaultOpen ? 'the-accordion-block--open' : ''}`,
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

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Accordion Settings', 'the-accordion-block')}>
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
					<ToggleControl
						label={__('Disable Plugin CSS', 'the-accordion-block')}
						checked={disableCss}
						onChange={(value) => setAttributes({ disableCss: value })}
						help={
							disableCss
								? __('Plugin CSS is disabled. Your theme will control the styling.', 'the-accordion-block')
								: __('Plugin CSS is enabled. Preset styles will be applied.', 'the-accordion-block')
						}
					/>
					<ToggleControl
						label={__('Open by Default', 'the-accordion-block')}
						checked={defaultOpen}
						onChange={(value) => setAttributes({ defaultOpen: value })}
						help={
							defaultOpen
								? __('This accordion will be open by default.', 'the-accordion-block')
								: __('This accordion will be closed by default.', 'the-accordion-block')
						}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="the-accordion-block__header">
					<button
						className="the-accordion-block__button"
						aria-expanded={defaultOpen}
					>
						{iconPosition === 'before' && (
							<span className="the-accordion-block__icon the-accordion-block__icon--before">
								{selectedIcon}
							</span>
						)}
						<RichText
							tagName="span"
							className="the-accordion-block__question-text"
							value={question}
							onChange={(value) => setAttributes({ question: value })}
							placeholder={__('Add accordion question…', 'the-accordion-block')}
						/>
						{iconPosition === 'after' && (
							<span className="the-accordion-block__icon the-accordion-block__icon--after">
								{selectedIcon}
							</span>
						)}
					</button>
				</div>
				<div
					className="the-accordion-block__content"
					aria-hidden={!defaultOpen}
					style={{ display: defaultOpen ? 'block' : 'none' }}
				>
					<div className="the-accordion-block__content-inner">
						<InnerBlocks />
					</div>
				</div>
			</div>
		</>
	);
}