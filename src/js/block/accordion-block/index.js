/**
 * Accordion Block
 *
 * @package AccordionBlock
 * @since 1.0.0
 */

/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import './style.scss';
import './editor.scss';
import metadata from './block.json';
import Edit from './edit';
import save from './save';
import { accordion } from './icons';

/**
 * Register the block
 */
registerBlockType(metadata.name, {
	icon: accordion,
	edit: Edit,
	save,
});