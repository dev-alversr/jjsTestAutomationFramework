// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// -- This is a parent command --
Cypress.Commands.add('login', (email, password) => {
  cy.log(`Attempting to login with email: ${email}`);
  // This is a placeholder. In a real app, you would:
  // cy.visit('/login');
  // cy.get('input[name="email"]').type(email);
  // cy.get('input[name="password"]').type(password);
  // cy.get('button[type="submit"]').click();
});

/**
 * Custom command to safely click an element, ensuring it's visible and enabled.
 * @example cy.get('button').safeClick();
 */
Cypress.Commands.add('safeClick', { prevSubject: 'element' }, (subject, options) => {
  cy.wrap(subject)
    .should('be.visible')
    .and('be.enabled')
    .click(options);
  return cy.wrap(subject); // Return the subject for further chaining
});

/**
 * Custom command to retry clicking an element until it becomes visible or a timeout is reached.
 * This is a simplified version. A more robust solution might involve recursive retries with delays.
 * @example cy.retryUntilVisible('button#submit', { timeout: 10000 });
 */
Cypress.Commands.add('retryUntilVisible', (selector: string, options?: Partial<Cypress.Loggable & Cypress.Timeoutable & Cypress.Withinable & Cypress.Shadow>) => {
  const { timeout = Cypress.config('defaultCommandTimeout') } = options || {};

  cy.get(selector, { timeout }) // Use Cypress's built-in timeout for retrying .get()
    .should('be.visible', options);
});


// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

// Add type definitions for custom commands to make them available in Cypress namespace
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to login a user.
       * @example cy.login('user@example.com', 'password123')
       */
      login(email: string, password?: string): Chainable<void>;

      /**
       * Custom command to safely click an element, ensuring it's visible and enabled.
       * @example cy.get('button').safeClick();
       */
      safeClick(options?: Partial<Cypress.ClickOptions>): Chainable<JQuery<HTMLElement>>;

      /**
       * Custom command to get an element, retrying until it is visible.
       * @example cy.retryUntilVisible('button#submit', { timeout: 10000 });
       */
      retryUntilVisible(selector: string, options?: Partial<Cypress.Loggable & Cypress.Timeoutable & Cypress.Withinable & Cypress.Shadow & Cypress.Retryable>): Chainable<JQuery<HTMLElement>>;
    }
  }
}

// Self-Healing Locator Strategy (Conceptual Outline):
// 1. Primary Locator: Use the most robust locator available (e.g., data-testid, id).
// 2. Fallback Locators: Define a list of fallback locators (e.g., name, class, text, XPath).
// 3. Wrapper Function: Create a custom command (e.g., cy.getElement()) that tries the primary locator first.
//    If it fails, it iterates through fallback locators.
// 4. Logging/Reporting: Log when fallbacks are used, as this might indicate UI changes or brittle tests.
// 5. Dynamic Elements: For dynamic elements, consider strategies like:
//    - Using partial matches for attributes (e.g., `[id*="dynamic-part"]`).
//    - Traversing from stable parent elements.
//    - Using text content if it's unique and stable.
// 6. AI/ML (Advanced): Tools like Healenium or commercial solutions can offer more advanced self-healing
//    by learning from previous executions and adapting to changes. For this framework, we'll focus on
//    a rule-based approach initially.
//
// Example (pseudo-code for a custom command):
// Cypress.Commands.add('getElement', (locators: { primary: string; fallbacks: string[] }) => {
//   cy.get(locators.primary, { failOnStatusCode: false }).then($el => { // failOnStatusCode: false or check existence
//     if ($el.length) return $el;
//     for (const fallback of locators.fallbacks) {
//       // try to find element with fallback
//     }
//   });
// });
