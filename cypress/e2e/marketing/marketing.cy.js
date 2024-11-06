/* eslint-disable cypress/no-unnecessary-waiting */
/// <reference types="cypress" />

describe('test for built in marketing pages in app', () => {
  const urls = [
    '/',
    '/mindshare/',
    '/ai/',
    '/why-zesty/',
    '/marketplace/installed/',
    '/marketplace/register/',
    '/contact/',
    '/join/',
  ];

  urls.forEach((url) => {
    it(`should load URL: ${url} without encountering 404`, () => {
      cy.request({
        url: Cypress.config().baseUrl + url,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.not.equal(404);
        expect(response.body).not.to.contain('404 Not Found');
        expect(response.body).not.to.contain(/&rsquo;|&amp;|&nbsp;|&quot;/);
        cy.get('body').should('exist');
      });
    });
  });
});
