/**
 * Accordion Block Icons
 *
 * @package AccordionBlock
 * @since 1.0.0
 */

/**
 * WordPress dependencies
 */
import { Path, SVG } from '@wordpress/components';

/**
 * Block icon
 */
export const accordion = (
	<SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
		<Path d="M16.93,8.93a1,1,0,0,1-1.41,0L12,5.41,8.48,8.93A1,1,0,0,1,7.07,7.51l4.25-4.25a1,1,0,0,1,1.41,0l4.25,4.25A1,1,0,0,1,16.93,8.93Z" />
		<Path d="M7.07,15.07a1,1,0,0,1,1.41,0L12,18.59l3.52-3.52a1,1,0,0,1,1.41,1.42l-4.25,4.25a1,1,0,0,1-1.41,0L7.07,16.49A1,1,0,0,1,7.07,15.07Z" />
		<Path d="M21,2H3A1,1,0,0,0,2,3V9a1,1,0,0,0,1,1H21a1,1,0,0,0,1-1V3A1,1,0,0,0,21,2Z" />
		<Path d="M3,22H21a1,1,0,0,0,1-1V15a1,1,0,0,0-1-1H3a1,1,0,0,0-1,1v6A1,1,0,0,0,3,22Z" />
	</SVG>
);

/**
 * Chevron icon
 */
export const chevronIcon = (
	<SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
		<Path d="M17,9.17a1,1,0,0,0-1.41,0L12,12.71,8.46,9.17a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42l4.24,4.24a1,1,0,0,0,1.42,0L17,10.59A1,1,0,0,0,17,9.17Z" />
	</SVG>
);

/**
 * Plus/Minus icon
 */
export const plusMinusIcon = (
	<SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
		<Path className="plus-icon" d="M19,11H13V5a1,1,0,0,0-2,0v6H5a1,1,0,0,0,0,2h6v6a1,1,0,0,0,2,0V13h6a1,1,0,0,0,0-2Z" />
		<Path className="minus-icon" d="M19,11H5a1,1,0,0,0,0,2H19a1,1,0,0,0,0-2Z" />
	</SVG>
);

/**
 * Arrow icon
 */
export const arrowIcon = (
	<SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
		<Path d="M18.71,8.21a1,1,0,0,0-1.42,0l-4.58,4.58a1,1,0,0,1-1.42,0L6.71,8.21a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41l4.59,4.59a3,3,0,0,0,4.24,0l4.59-4.59A1,1,0,0,0,18.71,8.21Z" />
	</SVG>
);

/**
 * Caret icon
 */
export const caretIcon = (
	<SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
		<Path d="M6.41,9H17.59a1,1,0,0,1,.7,1.71l-5.58,5.58a1,1,0,0,1-1.42,0L5.71,10.71A1,1,0,0,1,6.41,9Z" />
	</SVG>
);

/**
 * Get icon by name
 */
export const getIconByName = (iconName) => {
	switch (iconName) {
		case 'chevron':
			return chevronIcon;
		case 'plus-minus':
			return plusMinusIcon;
		case 'arrow':
			return arrowIcon;
		case 'caret':
			return caretIcon;
		default:
			return chevronIcon;
	}
};