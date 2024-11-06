/* eslint-disable cypress/no-unnecessary-waiting */
/// <reference types="cypress" />

describe('E2E docs page', () => {
  // it('test if docs landing page rendered ', () => {
  //   cy.visit('/docs');
  //   cy.get("[data-testid='docs-landing']", { timeout: 30000 }).should('exist');
  //   cy.algoliaNavigate();
  // });
  // it('test redirection to /docs/parsley', () => {
  //   cy.visit('/docs');
  //   cy.get("[data-testid='Parsley-btn']", { timeout: 30000 })
  //     .should('exist')
  //     .click();
  //   cy.location().should((loc) => {
  //     expect(loc.pathname).to.equal('/docs/parsley/');
  //   });
  // });
});

describe('test for built in docs pages in app', () => {
  const urls = [
    '/docs/accounts/api-reference/instances/domains/',
    '/docs/instances/api-reference/content/links/',
    '/docs/authentication/api-reference/',
    '/docs/parsley/tour/hello-world/',
    '/docs/parsley/api-reference/',
    '/docs/parsley/guides/',
    '/docs/parsley/guides/each-loop-deep-dive/',
    '/docs/accounts/api-reference/',
    '/docs/instances/api-reference/',
    '/docs/authentication/api-reference/',
    '/docs/media/api-reference/',
    '/docs/accounts/api-reference/instances/domains/',
  ];

  urls.forEach((url) => {
    it(`should load URL: ${url} without encountering 404`, () => {
      cy.request({
        url: Cypress.config().baseUrl + url,
        failOnStatusCode: false, // Prevent Cypress from failing the test on non-2xx status codes
      }).then((response) => {
        expect(response.status).to.not.equal(404); // Verify that the status code is not 404
        expect(response.body).not.to.contain('404 Not Found'); // Verify that the page content does not contain the 404 message
        cy.get('body').should('exist'); // Check if the body element exists, indicating the page loaded successfully
      });
    });
  });
});
