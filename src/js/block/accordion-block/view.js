/**
 * View script for the accordion block.
 *
 * This file handles the frontend functionality of the accordion.
 */

document.addEventListener('DOMContentLoaded', function() {
	// Get all accordion blocks
	const accordions = document.querySelectorAll('.wp-block-the-accordion-block-accordion-block');

	accordions.forEach(function(accordion) {
		const button = accordion.querySelector('.components-panel__body-toggle');
		const content = accordion.querySelector('.the-accordion-block__content');

		if (!button || !content) {
			return;
		}

		// Set initial state based on aria-expanded attribute
		if (button.getAttribute('aria-expanded') === 'true') {
			content.style.display = 'block';
			content.style.maxHeight = content.scrollHeight + 'px';
			content.style.opacity = '1';
			content.setAttribute('aria-hidden', 'false');
		} else {
			content.style.display = 'none';
			content.style.maxHeight = '0';
			content.style.opacity = '0';
			content.setAttribute('aria-hidden', 'true');
		}

		// Add click event listener
		button.addEventListener('click', function() {
			const expanded = button.getAttribute('aria-expanded') === 'true';
			
			// Toggle the expanded state
			button.setAttribute('aria-expanded', !expanded);
			content.setAttribute('aria-hidden', expanded);

			// Toggle content visibility with animation
			if (expanded) {
				// Closing the accordion
				content.style.maxHeight = '0';
				content.style.opacity = '0';
				
				// After transition is complete, hide the content
				setTimeout(function() {
					content.style.display = 'none';
				}, 300); // Match this value to the CSS transition duration
			} else {
				// Opening the accordion
				content.style.display = 'block';
				
				// Force a reflow to enable the transition
				content.offsetHeight;
				
				content.style.maxHeight = content.scrollHeight + 'px';
				content.style.opacity = '1';
			}
		});

		// Add keyboard navigation
		button.addEventListener('keydown', function(event) {
			if (event.key === 'Enter' || event.key === ' ') {
				event.preventDefault();
				button.click();
			}
		});
	});

	// Add keyboard navigation between accordions
	const accordionButtons = document.querySelectorAll('.components-panel__body-toggle');
	accordionButtons.forEach(function(button, index) {
		button.addEventListener('keydown', function(event) {
			// Handle arrow keys for navigation
			if (event.key === 'ArrowDown') {
				event.preventDefault();
				if (index < accordionButtons.length - 1) {
					accordionButtons[index + 1].focus();
				}
			} else if (event.key === 'ArrowUp') {
				event.preventDefault();
				if (index > 0) {
					accordionButtons[index - 1].focus();
				}
			} else if (event.key === 'Home') {
				event.preventDefault();
				accordionButtons[0].focus();
			} else if (event.key === 'End') {
				event.preventDefault();
				accordionButtons[accordionButtons.length - 1].focus();
			}
		});
	});
});