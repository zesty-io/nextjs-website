/* eslint-disable cypress/no-unnecessary-waiting */
/// <reference types="cypress" />

describe('E2E accounts: /start/ ', () => {
  it('Scenario 1: user is NOT logged in and NO template', () => {
    cy.visit('/start/');
    cy.get("[data-testid='start-page']", { timeout: 30000 }).should('exist');
    cy.get("[data-testid='scenario1']", { timeout: 30000 }).should('exist');
  });
});
