/* eslint-disable cypress/no-unnecessary-waiting */
/// <reference types="cypress" />

describe('E2E accounts: /start/ ', () => {
  beforeEach('Login', () => {
    cy.loginTestUser();
  });

  it('Scenario 2: user is logged in and no template', () => {
    cy.visit('/start/');
    cy.get("[data-testid='start-page']", { timeout: 30000 }).should('exist');
    cy.get("[data-testid='scenario2']", { timeout: 30000 }).should('exist');
  });
});
