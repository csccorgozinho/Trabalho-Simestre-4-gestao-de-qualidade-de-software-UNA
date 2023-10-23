// integration-test.js

describe('Integration Test for your HTML', () => {
    it('Loads the page and performs some actions', () => {
      // Visit your HTML file
      cy.visit('C:\Users\cscco\OneDrive\Documentos\test\index.html');
  

      cy.title().should('eq', 'forkify // Search over 1,000,000 recipes');
  

      cy.get('.header__logo').should('be.visible');
  

      cy.get('.search__field').type('Search query here');
      cy.get('.search__btn').click();
  

    });
  });
  