/* eslint-disable cypress/no-unnecessary-waiting */
/// <reference types="cypress" />

const { email, password } = Cypress.env('user');

describe('test for VALID token ', () => {
  it('APP_SID should NOT be removed when user go to homepage', () => {
    cy.visit('/login/');
    cy.get("input[name='email']").should('exist').type(email);
    cy.get("input[name='password']").should('exist').type(password);
    cy.get("button[type='submit']").should('exist').click();
    cy.wait(2000);

    cy.getCookie('APP_SID').should('exist');
    cy.get("[data-testid='instancesContainer']", { timeout: 30000 }).should(
      'exist',
    );

    cy.visit('/');

    cy.wait(1000);

    cy.getCookie('APP_SID').should('exist');
  });
});

describe('test for login redirect  to /docs/', () => {
  it('should go back to /docs/ after login ', () => {
    cy.visit('/docs');
    cy.get("[data-testid='login-btn']", { timeout: 30000 })
      .should('exist')
      .click({ force: true });

    cy.location().should((loc) => {
      expect(loc.pathname).to.equal('/login/');
    });

    cy.get("input[name='email']").should('exist').type(email);
    cy.get("input[name='password']").should('exist').type(password);
    cy.get("button[type='submit']").should('exist').click({ force: true });

    cy.location().should((loc) => {
      expect(loc.pathname).to.equal('/docs/');
    });
  });
});

describe(' login redirect for /product', () => {
  it('should go not back to /product after login ', () => {
    cy.visit('/product');
    cy.get("[data-testid='login-btn']", { timeout: 30000 })
      .should('exist')
      .click({ force: true });

    cy.location().should((loc) => {
      expect(loc.pathname).to.equal('/login/');
    });

    cy.get("input[name='email']").should('exist').type(email);
    cy.get("input[name='password']").should('exist').type(password);
    cy.get("button[type='submit']").should('exist').click({ force: true });

    cy.location().should((loc) => {
      expect(loc.pathname).to.equal('/dashboard/');
    });
  });
});
