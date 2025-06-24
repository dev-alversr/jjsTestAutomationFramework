// cypress/support/utils/apiUtils.ts

/**
 * Utility functions for REST API interactions.
 */
export const apiUtils = {
  /**
   * Performs a GET request.
   * @param url - The endpoint URL.
   * @param headers - Optional headers for the request.
   * @param qs - Optional query string parameters.
   * @returns Cypress.Chainable<Cypress.Response<any>>
   * @example
   *  apiUtils.get('/users', { 'Authorization': 'Bearer TOKEN' }, { page: 1 })
   *    .then(response => expect(response.status).to.eq(200));
   */
  get: (
    url: string,
    headers?: Record<string, string>,
    qs?: Record<string, any>
  ): Cypress.Chainable<Cypress.Response<any>> => {
    return cy.request({
      method: 'GET',
      url,
      headers: headers || {},
      qs: qs || {},
      failOnStatusCode: false, // Allow handling of non-2xx responses in tests
    });
  },

  /**
   * Performs a POST request.
   * @param url - The endpoint URL.
   * @param body - The request body.
   * @param headers - Optional headers for the request.
   * @returns Cypress.Chainable<Cypress.Response<any>>
   * @example
   *  apiUtils.post('/users', { name: 'John Doe' }, { 'Authorization': 'Bearer TOKEN' })
   *    .then(response => expect(response.status).to.eq(201));
   */
  post: (
    url: string,
    body: any,
    headers?: Record<string, string>
  ): Cypress.Chainable<Cypress.Response<any>> => {
    return cy.request({
      method: 'POST',
      url,
      body,
      headers: headers || {},
      failOnStatusCode: false,
    });
  },

  /**
   * Performs a PUT request.
   * @param url - The endpoint URL.
   * @param body - The request body.
   * @param headers - Optional headers for the request.
   * @returns Cypress.Chainable<Cypress.Response<any>>
   * @example
   *  apiUtils.put('/users/1', { name: 'Jane Doe' }, { 'Authorization': 'Bearer TOKEN' })
   *    .then(response => expect(response.status).to.eq(200));
   */
  put: (
    url: string,
    body: any,
    headers?: Record<string, string>
  ): Cypress.Chainable<Cypress.Response<any>> => {
    return cy.request({
      method: 'PUT',
      url,
      body,
      headers: headers || {},
      failOnStatusCode: false,
    });
  },

  /**
   * Performs a DELETE request.
   * @param url - The endpoint URL.
   * @param headers - Optional headers for the request.
   * @returns Cypress.Chainable<Cypress.Response<any>>
   * @example
   *  apiUtils.delete('/users/1', { 'Authorization': 'Bearer TOKEN' })
   *    .then(response => expect(response.status).to.eq(204));
   */
  delete: (
    url: string,
    headers?: Record<string, string>
  ): Cypress.Chainable<Cypress.Response<any>> => {
    return cy.request({
      method: 'DELETE',
      url,
      headers: headers || {},
      failOnStatusCode: false,
    });
  },

  /**
   * A generic request function for more complex scenarios.
   * @param options - Cypress request options.
   * @returns Cypress.Chainable<Cypress.Response<any>>
   * @example
   *  apiUtils.request({ method: 'PATCH', url: '/users/1', body: { status: 'active' }})
   *    .then(response => expect(response.status).to.eq(200));
   */
  request: (
    options: Partial<Cypress.RequestOptions>
  ): Cypress.Chainable<Cypress.Response<any>> => {
    return cy.request(options);
  },
};

// Example of how to add these to Cypress commands if desired, though direct import is often cleaner for utils.
// Cypress.Commands.add('apiGet', apiUtils.get);
// Cypress.Commands.add('apiPost', apiUtils.post);
