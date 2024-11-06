/* eslint-disable cypress/no-unnecessary-waiting */
/// <reference types="cypress" />

describe('E2E accounts: Navigate user', () => {
  beforeEach('Login', () => {
    cy.loginTestUser();
  });

  it('Test user navigation in Accounts', () => {
    cy.wait(3000);

    cy.visit('/');
    cy.get("[data-testid='instancesContainer']", { timeout: 30000 }).should(
      'exist',
    );

    cy.get("input[placeholder='Search an Instances']", { timeout: 30000 })
      .should('exist')
      .type('zesty.pw');

    cy.wait(5000);

    cy.get("[data-testid='zesty.pw']", { timeout: 30000 })
      .should('exist')
      .click();

    cy.get("[data-testid='Overview']", { timeout: 30000 }).should('exist');

    cy.get("[data-testid='Users-Nav']", { timeout: 30000 })
      .should('exist')
      .click();
    cy.get("[data-testid='Users']", { timeout: 30000 }).should('exist');

    cy.get("[data-testid='Teams-Nav']", { timeout: 30000 })
      .should('exist')
      .click();
    cy.get("[data-testid='Teams']", { timeout: 30000 }).should('exist');

    cy.get("[data-testid='Domains-Nav']", { timeout: 30000 })
      .should('exist')
      .click();
    cy.get("[data-testid='Domain']", { timeout: 30000 }).should('exist');

    cy.get("[data-testid='Locales-Nav']", { timeout: 30000 })
      .should('exist')
      .click();
    cy.get("[data-testid='Locales']", { timeout: 30000 }).should('exist');

    cy.get("[data-testid='APIs-Nav']", { timeout: 30000 })
      .should('exist')
      .click();
    cy.get("[data-testid='Apis']", { timeout: 30000 }).should('exist');

    cy.get("[data-testid='Webhooks-Nav']", { timeout: 30000 })
      .should('exist')
      .click();
    cy.get("[data-testid='Webhooks']", { timeout: 30000 }).should('exist');

    cy.get("[data-testid='Settings-Nav']", { timeout: 30000 })
      .should('exist')
      .click();
    cy.get("[data-testid='Settings']", { timeout: 30000 }).should('exist');

    cy.get("[data-testid='user-avatar']", { timeout: 30000 })
      .should('exist')
      .click();

    cy.get("[data-testid='Profile-dropdown']", { timeout: 30000 })
      .should('exist')
      .click();

    cy.wait(3000);
    cy.get("[data-testid='Profile']", { timeout: 30000 }).should('exist');

    cy.get("[title='Security']", { timeout: 30000 }).should('exist').click();

    cy.get("[data-testid='Security']", { timeout: 30000 }).should('exist');

    cy.get("[title='Preferences']", { timeout: 30000 }).should('exist').click();

    cy.get("[data-testid='Preference']", { timeout: 30000 }).should('exist');

    cy.get("[data-testid='user-avatar']", { timeout: 30000 })
      .should('exist')
      .click();

    cy.get("[data-testid='Logout-dropdown']", { timeout: 30000 })
      .should('exist')
      .click();

    cy.get("[data-testid='signout-page']", { timeout: 30000 }).should('exist');
  });
});
