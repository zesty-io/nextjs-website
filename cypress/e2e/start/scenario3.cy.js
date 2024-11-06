/* eslint-disable cypress/no-unnecessary-waiting */
/// <reference types="cypress" />

describe('E2E accounts: /start/ s3', () => {
  beforeEach('clear page', () => {
    cy.clearCookies();
    cy.reload();
  });

  it('Scenario 3: user is NOT logged in and has template', () => {
    cy.visit('/start/?template=7-988aafaef8-m1n34q');
    cy.get("[data-testid='start-page']", { timeout: 30000 }).should('exist');
    // finds the signup button
    cy.get("[data-testid='submitButton']", { timeout: 30000 }).should('exist');
  });
});
