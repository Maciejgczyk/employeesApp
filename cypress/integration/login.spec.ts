/// <reference types="Cypress" />

describe('Login page', () => {
  it('Should login', () => {
    cy.visit('/login');

    cy.get('.username-field')
      .type('matio@o2.pl')

    cy.get('.password-field')
      .type('mati')

  });
});
