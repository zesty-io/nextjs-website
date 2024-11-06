/* eslint-disable cypress/no-unnecessary-waiting */
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

const { email, password } = Cypress.env('user');

Cypress.Commands.add('loginTestUser', () => {
  cy.visit('/login/');
  cy.origin('https://8-aaeffee09b-7w6v22.manager.zesty.io', {}, () => {
    const { email, password } = Cypress.env('user');
    cy.visit('/launchpad');
    cy.get("input[name='email']").should('exist').type(email);
    cy.get("input[name='password']").should('exist').type(password);
    cy.contains('Resume Session').click();
  });

  cy.wait(5000);
  cy.visit('/login/');

  cy.location().should((loc) => {
    expect(loc.pathname).to.equal('/dashboard/');
  });
  cy.get("[data-testid='instancesContainer']", { timeout: 30000 }).should(
    'exist',
  );
});

Cypress.Commands.add('algoliaNavigate', () => {
  cy.get("[data-testid='algolia-search-trigger']", { timeout: 30000 })
    .type('content')
    .then(async () => {
      await cy
        .get("[data-testid='algolia-search-container']", {
          timeout: 30000,
        })
        .should('exist');

      await cy
        .get("[data-testid='products-index']", { timeout: 30000 })
        .should('exist');
      await cy
        .get("[data-testid='parsley-index']", { timeout: 30000 })
        .should('exist');
      await cy
        .get("[data-testid='algolia-search']", { timeout: 30000 })
        .should('exist');
    });
});
