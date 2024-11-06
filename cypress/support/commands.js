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
  cy.setCookie('PRODUCTION', 'true');
  cy.get("input[name='email']").should('exist').type(email);
  cy.get("input[name='password']").should('exist').type(password);
  cy.get("button[type='submit']").should('exist').click();

  cy.location().should((loc) => {
    expect(loc.pathname).to.equal('/dashboard/');
  });
  cy.get("[data-testid='instancesContainer']", { timeout: 30000 }).should(
    'exist',
  );
});
// Cypress.Commands.add('loginTestUser', () => {
//   const formBody = new FormData();

//   formBody.append('email', email);
//   formBody.append('password', password);

//   return cy
//     .request({
//       url: `https://auth.api.zesty.io/login`,
//       method: 'POST',
//       credentials: 'include',
//       body: formBody,
//     })
//     .then(async (res) => {
//       console.log(res);
//       // cy.setCookie('isAuthenticated', 'true', { domain: 'test.zesty.io' });
//       cy.setCookie('PRODUCTION', 'true', { domain: 'test.zesty.io' });

//       // const response = await new Response(res.body).json();
//       // We need the cookie value returned reset so it is unsecure and
//       // accessible by javascript
//       // cy.setCookie(Cypress.env("COOKIE_NAME"), response.meta.token);
//       cy.visit('/dashboard/');
//     });
// });

// Cypress.Commands.add('loginTestUser', () => {
//   cy.visit('/login/');
// cy.origin('https://8-aaeffee09b-7w6v22.manager.dev.zesty.io', {}, () => {
// const { email, password } = Cypress.env('user');
//   cy.visit('/launchpad');
//   cy.get("input[name='email']").should('exist').type(email);
//   cy.get("input[name='password']").should('exist').type(password);
//   cy.contains('Resume Session').click();
// });
// cy.visit('https://8-f48cf3a682-7fthvk.manager.dev.zesty.io/launchpad');
// cy.visit('/login/');
// cy.get("input[name='email']").should('exist').type(email);
// cy.get("input[name='password']").should('exist').type(password);
// cy.get("button[type='submit']").should('exist').click();
// cy.contains('Resume Session').click();

// cy.wait(5000);
// cy.visit('/login/');

// cy.wait(2000);
// cy.setCookie('isAuthenticated', true);
// cy.setCookie('PRODUCTION', false);

// Cypress.Cookies.defaults({
//   preserve: 'isAuthenticated',
// });

//   cy.location().should((loc) => {
//     expect(loc.pathname).to.equal('/dashboard/');
//   });
//   cy.get("[data-testid='instancesContainer']", { timeout: 30000 }).should(
//     'exist',
//   );
// });

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
