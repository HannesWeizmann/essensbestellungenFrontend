describe('SpeiseplanComponent', () => {
    beforeEach(() => {
    cy.visit('localhost:4200/login');
    cy.get('input[name="username"]').type('testuser');
    cy.get('input[name="password"]').type('1234');
    cy.get('button[type="login"]').click();
    cy.url().should('include', 'localhost:4200/speiseplan');
    });
  
    it('zeigt den Speiseplan an', () => {
        cy.contains('Speiseplan');
        cy.get('.speiseplan-wrapper').should('exist')
      });
      
 
  });
  