// cypress/support/utils/authUtils.ts

/**
 * Utility functions for handling authentication.
 */
export const authUtils = {
  /**
   * Placeholder for getting a session token (e.g., from UI login or direct API call).
   * This would typically involve logging in via UI or an auth endpoint and storing the token.
   * @param username - Username for login.
   * @param password - Password for login.
   * @returns Cypress.Chainable<string> - Chainable yielding the token.
   * @example
   *  authUtils.getSessionToken('user', 'pass').then(token => {
   *    Cypress.env('SESSION_TOKEN', token);
   *  });
   */
  getSessionToken: (username?: string, password?: string): Cypress.Chainable<string> => {
    // Placeholder implementation:
    // In a real scenario, this might make an API request to a /login endpoint
    // or perform UI login steps and extract the token from cookies or local storage.
    cy.log('authUtils.getSessionToken called (placeholder)');
    if (username && password) {
      cy.log(`Simulating login for ${username}`);
      // Example: cy.request POST to /api/auth/login
    }
    const mockToken = 'mockSessionToken12345';
    Cypress.env('SESSION_TOKEN', mockToken); // Store it for potential use in other tests/requests
    return cy.wrap(mockToken, { log: false }); // {log: false} to avoid token in logs
  },

  /**
   * Placeholder for getting an API key or Bearer token.
   * This might involve fetching it from a secure source or an auth endpoint.
   * @param tokenName - Optional name or identifier for the token if multiple exist.
   * @returns Cypress.Chainable<string> - Chainable yielding the token.
   * @example
   *  authUtils.getApiToken().then(token => {
   *    Cypress.env('API_TOKEN', token);
   *  });
   */
  getApiToken: (tokenName?: string): Cypress.Chainable<string> => {
    // Placeholder implementation:
    // In a real scenario, this could fetch a pre-existing token from Cypress.env,
    // or make a request to an OAuth endpoint.
    cy.log(`authUtils.getApiToken called for ${tokenName || 'default'} (placeholder)`);
    const mockToken = `mockApiBearerTokenFor_${tokenName || 'default'}_${Date.now()}`;
    Cypress.env(tokenName || 'API_TOKEN', mockToken);
    return cy.wrap(mockToken, { log: false });
  },

  /**
   * Example of a custom command to perform login via API and store token.
   * This would be registered in commands.ts if used as a command.
   * @param username - Username
   * @param password - Password
   * @param loginUrl - URL for the login API endpoint
   * @example
   *  cy.loginViaApi('testuser', 'password123', '/api/v1/login');
   */
  loginViaApi: (username: string, password?: string, loginUrl?: string) => {
    const user = username || Cypress.env('TEST_USERNAME');
    const pass = password || Cypress.env('TEST_PASSWORD');
    const url = loginUrl || Cypress.env('API_LOGIN_URL');

    if (!user || !pass || !url) {
      throw new Error('Username, password, or login URL is missing for API login.');
    }

    cy.log(`Logging in as ${user} via API at ${url}`);
    return cy.request({
      method: 'POST',
      url: url,
      body: {
        username: user,
        password: pass,
      },
      failOnStatusCode: false, // So we can assert on the response
    }).then((response) => {
      if (response.status === 200 && response.body.token) {
        Cypress.env('AUTH_TOKEN', response.body.token);
        cy.log('API Login successful, token stored in Cypress.env("AUTH_TOKEN")');
      } else {
        cy.log('API Login failed');
        // Optionally, throw an error or let the test handle the failure
      }
      return cy.wrap(response); // Return the full response for assertions
    });
  },

  /**
   * Clears stored authentication tokens from Cypress.env.
   * Call this in a beforeEach or afterEach if tests should not share auth state.
   * @example
   *  authUtils.clearTokens();
   */
  clearTokens: () => {
    cy.log('Clearing stored authentication tokens from Cypress.env');
    // Clear specific tokens or loop through a predefined list
    const tokenKeys = ['AUTH_TOKEN', 'SESSION_TOKEN', 'API_TOKEN']; // Add any other token keys used
    tokenKeys.forEach(key => {
      if (Cypress.env(key)) {
        // @ts-ignore
        delete Cypress.env()[key]; // Undocumented way to clear, preferred over setting to null
      }
    });
  }
};

// Example of how to add loginViaApi to Cypress commands
// (in cypress/support/commands.ts):
// import { authUtils } from './utils/authUtils';
// Cypress.Commands.add('loginViaApi', authUtils.loginViaApi);
//
// And in type definitions:
// loginViaApi(username?: string, password?: string, loginUrl?: string): Chainable<Cypress.Response<any>>;
