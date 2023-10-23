// integration-test.js

describe('Integration Test for your HTML', () => {
    it('Loads the page and performs some actions', () => {
      // Visit your HTML file
      cy.visit('C:\Users\cscco\OneDrive\Documentos\test\index.html');
  
      // Check if the title is correct
      cy.title().should('eq', 'forkify // Search over 1,000,000 recipes');
  
      // Check if the header contains the logo
      cy.get('.header__logo').should('be.visible');
  
      // Enter a search query and submit the form
      cy.get('.search__field').type('Search query here');
      cy.get('.search__btn').click();
  
      // You can continue with other interactions and assertions as needed
    });
  });
  