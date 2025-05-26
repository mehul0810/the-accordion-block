/**
 * Frontend JavaScript for The Accordion Block
 *
 * @package AccordionBlock
 * @since 1.0.0
 */

document.addEventListener('DOMContentLoaded', function() {
	// Initialize the legacy accordion blocks
	initAccordionBlocks();
	
	// Initialize the new FAQ blocks
	initFaqBlocks();
});

/**
 * Initialize the legacy accordion blocks
 */
function initAccordionBlocks() {
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
	addKeyboardNavigation(accordionButtons);
}

/**
 * Initialize the new FAQ blocks
 */
function initFaqBlocks() {
	// Get all FAQ container blocks
	const faqContainers = document.querySelectorAll('.wp-block-the-accordion-block-faq');

	faqContainers.forEach(function(container) {
		const faqItems = container.querySelectorAll('.the-accordion-block-faq-item');
		
		// Check if it's the first render and we should open the first item
		const shouldOpenFirst = container.classList.contains('default-open-first');
		let isFirstItem = true;
		
		faqItems.forEach(function(item) {
			const button = item.querySelector('.the-accordion-block-faq-item__button');
			const content = item.querySelector('.the-accordion-block-faq-item__content');
			
			if (!button || !content) {
				return;
			}
			
			// If it's the first item and we should open the first one
			if (isFirstItem && shouldOpenFirst) {
				button.setAttribute('aria-expanded', 'true');
				content.setAttribute('aria-hidden', 'false');
				content.style.display = 'block';
				content.style.height = 'auto';
				content.style.opacity = '1';
				item.classList.add('the-accordion-block-faq-item--open');
				isFirstItem = false;
			}
			
			// Add click event listener
			button.addEventListener('click', function() {
				const expanded = button.getAttribute('aria-expanded') === 'true';
				
				// Toggle the expanded state
				button.setAttribute('aria-expanded', !expanded);
				content.setAttribute('aria-hidden', expanded);
				
				if (expanded) {
					// Closing the accordion
					item.classList.remove('the-accordion-block-faq-item--open');
					content.style.height = '0';
					content.style.opacity = '0';
					
					// After transition is complete, hide the content
					setTimeout(function() {
						content.style.display = 'none';
					}, 300); // Match this value to the CSS transition duration
				} else {
					// Opening the accordion
					item.classList.add('the-accordion-block-faq-item--open');
					content.style.display = 'block';
					
					// Force a reflow to enable the transition
					content.offsetHeight;
					
					content.style.height = content.scrollHeight + 'px';
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
		
		// Add keyboard navigation between FAQ items
		const faqButtons = container.querySelectorAll('.the-accordion-block-faq-item__button');
		addKeyboardNavigation(faqButtons);
	});
}

/**
 * Add keyboard navigation to a collection of buttons
 * 
 * @param {NodeList} buttons - Collection of buttons to add keyboard navigation to
 */
function addKeyboardNavigation(buttons) {
	buttons.forEach(function(button, index) {
		button.addEventListener('keydown', function(event) {
			// Handle arrow keys for navigation
			if (event.key === 'ArrowDown') {
				event.preventDefault();
				if (index < buttons.length - 1) {
					buttons[index + 1].focus();
				}
			} else if (event.key === 'ArrowUp') {
				event.preventDefault();
				if (index > 0) {
					buttons[index - 1].focus();
				}
			} else if (event.key === 'Home') {
				event.preventDefault();
				buttons[0].focus();
			} else if (event.key === 'End') {
				event.preventDefault();
				buttons[buttons.length - 1].focus();
			}
		});
	});
}