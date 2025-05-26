/**
 * Cypress tests for the FAQ accordion block
 */

// Test the block editor functionality
describe('FAQ Accordion Block', () => {
  beforeEach(() => {
    // Visit the block editor and create a new post
    cy.visit('/wp-admin/post-new.php');
    cy.get('.components-button.edit-post-fullscreen-mode-close').click();
    cy.get('.editor-post-title__input').type('FAQ Accordion Block Test');
  });

  it('can be inserted into the editor', () => {
    // Open the block inserter
    cy.get('.edit-post-header-toolbar__inserter-toggle').click();
    
    // Search for our block
    cy.get('.components-search-control__input').type('FAQ Accordion');
    
    // Insert the block
    cy.get('.editor-block-list-item-the-accordion-block-faq').click();
    
    // Check if the block is inserted and has the FAQ item
    cy.get('.wp-block-the-accordion-block-faq').should('exist');
    cy.get('.the-accordion-block-faq-item').should('exist');
  });

  it('can add new FAQ items', () => {
    // Insert the FAQ block
    cy.get('.edit-post-header-toolbar__inserter-toggle').click();
    cy.get('.components-search-control__input').type('FAQ Accordion');
    cy.get('.editor-block-list-item-the-accordion-block-faq').click();
    
    // Click the appender to add a new FAQ item
    cy.get('.block-editor-button-block-appender').click();
    cy.get('.editor-block-list-item-the-accordion-block-faq-item').click();
    
    // Check if we now have two FAQ items
    cy.get('.the-accordion-block-faq-item').should('have.length', 2);
  });

  it('can edit FAQ questions and answers', () => {
    // Insert the FAQ block
    cy.get('.edit-post-header-toolbar__inserter-toggle').click();
    cy.get('.components-search-control__input').type('FAQ Accordion');
    cy.get('.editor-block-list-item-the-accordion-block-faq').click();
    
    // Type a question
    cy.get('.the-accordion-block__question-text').click().type('What is this FAQ block?');
    
    // Add content to the answer area
    cy.get('.the-accordion-block-faq-item__content').click();
    cy.get('.block-editor-default-block-appender__content').click();
    cy.get('.block-editor-rich-text__editable').type('This is a test answer for the FAQ block.');
    
    // Check if the content was added correctly
    cy.get('.the-accordion-block__question-text').should('contain', 'What is this FAQ block?');
    cy.get('.the-accordion-block-faq-item__content .block-editor-rich-text__editable').should('contain', 'This is a test answer for the FAQ block.');
  });

  it('can change icon and its position', () => {
    // Insert the FAQ block
    cy.get('.edit-post-header-toolbar__inserter-toggle').click();
    cy.get('.components-search-control__input').type('FAQ Accordion');
    cy.get('.editor-block-list-item-the-accordion-block-faq').click();
    
    // Select the FAQ item to edit
    cy.get('.the-accordion-block-faq-item').click();
    
    // Open the block sidebar
    cy.get('.interface-interface-skeleton__sidebar').should('not.be.visible');
    cy.get('.interface-pinned-items button[aria-label="Block"]').click();
    cy.get('.interface-interface-skeleton__sidebar').should('be.visible');
    
    // Change the icon
    cy.get('.components-panel__body').contains('FAQ Item Settings').click();
    cy.get('.components-select-control__input').eq(0).select('plus-minus');
    
    // Change the icon position
    cy.get('.components-select-control__input').eq(1).select('before');
    
    // Check if the icon and position were changed
    cy.get('.the-accordion-block-faq-item__icon--before').should('exist');
  });
});

// Test the frontend functionality
describe('FAQ Accordion Block Frontend', () => {
  beforeEach(() => {
    // Create a post with the FAQ block
    cy.visit('/wp-admin/post-new.php');
    cy.get('.components-button.edit-post-fullscreen-mode-close').click();
    cy.get('.editor-post-title__input').type('FAQ Accordion Frontend Test');
    
    // Insert the FAQ block
    cy.get('.edit-post-header-toolbar__inserter-toggle').click();
    cy.get('.components-search-control__input').type('FAQ Accordion');
    cy.get('.editor-block-list-item-the-accordion-block-faq').click();
    
    // Add two FAQ items
    cy.get('.the-accordion-block__question-text').click().type('Question 1');
    cy.get('.the-accordion-block-faq-item__content').click();
    cy.get('.block-editor-default-block-appender__content').click();
    cy.get('.block-editor-rich-text__editable').type('Answer 1');
    
    // Add second FAQ item
    cy.get('.block-editor-button-block-appender').click();
    cy.get('.editor-block-list-item-the-accordion-block-faq-item').click();
    cy.get('.the-accordion-block__question-text').eq(1).click().type('Question 2');
    cy.get('.the-accordion-block-faq-item__content').eq(1).click();
    cy.get('.block-editor-default-block-appender__content').click();
    cy.get('.block-editor-rich-text__editable').eq(1).type('Answer 2');
    
    // Publish the post
    cy.get('.editor-post-publish-panel__toggle').click();
    cy.get('.editor-post-publish-button').click();
    
    // Visit the post on the frontend
    cy.get('.components-snackbar__content a').click();
  });

  it('toggles accordions when clicked', () => {
    // Check that all accordions are closed by default
    cy.get('.the-accordion-block-faq-item__content').should('not.be.visible');
    
    // Click the first FAQ item
    cy.get('.the-accordion-block-faq-item__button').eq(0).click();
    
    // Check if the content is now visible
    cy.get('.the-accordion-block-faq-item__content').eq(0).should('be.visible');
    
    // Click it again to close
    cy.get('.the-accordion-block-faq-item__button').eq(0).click();
    
    // Check if it's closed again
    cy.get('.the-accordion-block-faq-item__content').eq(0).should('not.be.visible');
  });

  it('supports keyboard navigation', () => {
    // Focus on the first FAQ item
    cy.get('.the-accordion-block-faq-item__button').eq(0).focus();
    
    // Open with Enter key
    cy.get('.the-accordion-block-faq-item__button').eq(0).type('{enter}');
    cy.get('.the-accordion-block-faq-item__content').eq(0).should('be.visible');
    
    // Navigate to next item with arrow down
    cy.get('.the-accordion-block-faq-item__button').eq(0).type('{downarrow}');
    
    // Open second item with Space key
    cy.get('.the-accordion-block-faq-item__button').eq(1).type(' ');
    cy.get('.the-accordion-block-faq-item__content').eq(1).should('be.visible');
  });
});

// Test the schema output
describe('FAQ Schema Output', () => {
  beforeEach(() => {
    // Create a post with the FAQ block
    cy.visit('/wp-admin/post-new.php');
    cy.get('.components-button.edit-post-fullscreen-mode-close').click();
    cy.get('.editor-post-title__input').type('FAQ Schema Test');
    
    // Insert the FAQ block
    cy.get('.edit-post-header-toolbar__inserter-toggle').click();
    cy.get('.components-search-control__input').type('FAQ Accordion');
    cy.get('.editor-block-list-item-the-accordion-block-faq').click();
    
    // Add FAQ content
    cy.get('.the-accordion-block__question-text').click().type('Schema Question');
    cy.get('.the-accordion-block-faq-item__content').click();
    cy.get('.block-editor-default-block-appender__content').click();
    cy.get('.block-editor-rich-text__editable').type('Schema Answer');
    
    // Publish the post
    cy.get('.editor-post-publish-panel__toggle').click();
    cy.get('.editor-post-publish-button').click();
    
    // Visit the post on the frontend
    cy.get('.components-snackbar__content a').click();
  });

  it('outputs JSON-LD schema for FAQs', () => {
    // Check if the schema is present in the page
    cy.get('script[type="application/ld+json"]').should('exist');
    
    // Get the schema content and verify it
    cy.get('script[type="application/ld+json"]').then(($el) => {
      const schema = JSON.parse($el.text());
      expect(schema['@type']).to.equal('FAQPage');
      expect(schema.mainEntity).to.have.length.at.least(1);
      expect(schema.mainEntity[0]['@type']).to.equal('Question');
      expect(schema.mainEntity[0].name).to.equal('Schema Question');
      expect(schema.mainEntity[0].acceptedAnswer['@type']).to.equal('Answer');
      expect(schema.mainEntity[0].acceptedAnswer.text).to.contain('Schema Answer');
    });
  });
});