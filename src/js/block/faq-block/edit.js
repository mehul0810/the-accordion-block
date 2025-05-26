/**
 * FAQ Block Edit
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
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
} from '@wordpress/components';

/**
 * Edit function
 */
export default function Edit({ attributes, setAttributes }) {
	const { disableCss, defaultOpenFirst } = attributes;
	const blockProps = useBlockProps({
		className: 'the-accordion-block-faq',
	});

	// Define the allowed blocks and template
	const ALLOWED_BLOCKS = ['the-accordion-block/faq-item'];
	const TEMPLATE = [['the-accordion-block/faq-item', {}]];

	// Use InnerBlocks for the FAQ items
	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'the-accordion-block-faq__items' },
		{
			allowedBlocks: ALLOWED_BLOCKS,
			template: TEMPLATE,
			orientation: 'vertical',
			renderAppender: 'core/button',
			__experimentalCaptureToolbars: true,
		}
	);

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('FAQ Settings', 'the-accordion-block')}>
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
						label={__('Open First Item by Default', 'the-accordion-block')}
						checked={defaultOpenFirst}
						onChange={(value) => setAttributes({ defaultOpenFirst: value })}
						help={
							defaultOpenFirst
								? __('The first FAQ item will be open by default on the frontend.', 'the-accordion-block')
								: __('All FAQ items will be closed by default on the frontend.', 'the-accordion-block')
						}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div {...innerBlocksProps} />
			</div>
		</>
	);
}