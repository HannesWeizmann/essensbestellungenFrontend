describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('localhost:4200/login');
  });

  it('should display login form', () => {
    cy.get('input[name="username"]').should('exist');
    cy.get('input[name="password"]').should('exist');
    cy.get('button[type="login"]').should('exist');
  });

  it('should login with valid credentials', () => {
    cy.get('input[name="username"]').type('testuser');
    cy.get('input[name="password"]').type('1234');
    cy.get('button[type="login"]').click();

    cy.url().should('include', 'localhost:4200/speiseplan');
  });
});

