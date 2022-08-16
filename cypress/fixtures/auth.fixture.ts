const auth = () => {
  cy.intercept('POST', 'api/auth/token', { fixture: 'refresh-token.json' }).as('refresh');
  cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as('auth');
};

export default auth;
