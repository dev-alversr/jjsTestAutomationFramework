# Cypress BDD Test Automation Framework

This project provides a comprehensive test automation framework using Cypress, BDD (Cucumber), and TypeScript. It's designed for UI and API (REST & GraphQL) testing, focusing on scalability, reusability, and CI/CD readiness.

## Table of Contents

- [Features](#features)
- [Folder Structure](#folder-structure)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Running Tests](#running-tests)
  - [Locally](#locally)
  - [With Tags](#with-tags)
  - [Specific Browsers](#specific-browsers)
- [Reporting](#reporting)
  - [Allure Reports](#allure-reports)
  - [Native Cypress Reports](#native-cypress-reports)
- [Configuration](#configuration)
  - [Environment Variables](#environment-variables)
  - [Cypress Configuration](#cypress-configuration)
- [Key Capabilities](#key-capabilities)
  - [BDD with Cucumber](#bdd-with-cucumber)
  - [UI Testing](#ui-testing)
  - [API Testing (REST & GraphQL)](#api-testing-rest--graphql)
  - [Custom Cypress Commands](#custom-cypress-commands)
  - [Test Data Management](#test-data-management)
  - [Authentication](#authentication)
- [CI/CD Integration](#cicd-integration)
  - [Jenkins](#jenkins)
  - [Slack Notifications](#slack-notifications)
- [Advanced Topics & Scalability](#advanced-topics--scalability)
  - [Modular Architecture (Multiple Applications)](#modular-architecture-multiple-applications)
  - [Self-Healing Locators](#self-healing-locators)
  - [Database Validation & Data Seeding](#database-validation--data-seeding)
  - [Parallel Test Execution](#parallel-test-execution)
  - [Secret Masking](#secret-masking)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Multi-Browser Execution:** Supports Chrome, Firefox, Edge.
- **BDD with `cypress-cucumber-preprocessor`:** Write tests in Gherkin syntax.
- **UI Testing:** Robust UI test capabilities with custom commands.
- **API Testing:**
  - **RESTful APIs:** Utilities for common HTTP methods.
  - **GraphQL APIs:** Utilities for queries, mutations, and schema introspection.
- **Authentication:** Examples for token-based and session-based authentication.
- **Reporting:**
  - **Allure Reports:** Detailed and interactive test reports.
  - **Native Cypress HTML Reports:** Default HTML reports from Cypress.
- **Test Data Management:** Load test data from external structured files (JSON fixtures).
- **CI/CD Ready:** Includes a `Jenkinsfile` for pipeline integration.
- **Environment Configuration:** Uses `.env` files for environment-specific settings.
- **Test Retries:** Configured for handling flaky tests.
- **Test Tagging:** Filter test execution using tags (e.g., `@smoke`, `@regression`).
- **Custom Cypress Commands:** Reusable commands for common actions.
- **Utility Functions:** Helpers for API interactions, authentication, etc.
- **TypeScript:** Enhanced code quality and developer experience.

## Folder Structure

```
.
├── cypress/
│   ├── e2e/                     # End-to-end tests (feature files)
│   │   ├── ui/                  # UI related feature files
│   │   │   └── login.feature
│   │   └── data/                # Data related feature files
│   │       └── fixtureDemo.feature
│   ├── fixtures/                # Test data files (e.g., users.json)
│   │   └── users.json
│   ├── support/                 # Helper files, custom commands, plugins
│   │   ├── commands/            # Custom Cypress command files
│   │   │   └── commands.ts
│   │   ├── step_definitions/    # Cucumber step definition files
│   │   │   ├── loginSteps.ts
│   │   │   └── fixtureDemoSteps.ts
│   │   ├── utils/               # Utility functions (API, Auth, GraphQL)
│   │   │   ├── apiUtils.ts
│   │   │   ├── authUtils.ts
│   │   │   └── graphqlUtils.ts
│   │   ├── e2e.ts               # Global before/after hooks, imports
│   │   └── index.d.ts           # (Optional) Global type declarations for JS projects
│   ├── screenshots/             # Screenshots on failure (auto-generated)
│   ├── videos/                  # Videos of test runs (auto-generated)
│   └── downloads/               # Downloaded files during tests (auto-generated)
├── allure-results/              # Raw Allure report data (generated)
├── allure-report/               # Generated HTML Allure report (generated)
├── cypress-cucumber-json/       # Cucumber JSON reports (for Allure)
├── node_modules/                # Project dependencies
├── .env.example                 # Example environment variables
├── .eslintrc.js                 # ESLint configuration
├── .gitignore                   # Files to ignore in Git
├── .prettierrc.json             # Prettier configuration
├── cypress.config.ts            # Cypress main configuration file
├── Jenkinsfile                  # Example Jenkins pipeline script
├── package.json                 # Project metadata and dependencies
├── package-lock.json            # Exact dependency versions
├── README.md                    # This file
└── tsconfig.json                # TypeScript compiler options
```

## Prerequisites

- [Node.js](https://nodejs.org/) (v16.x or higher recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- A Java Development Kit (JDK) to generate Allure reports (Allure is Java-based).

## Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-name>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```
    For CI environments, `npm ci` is recommended if `package-lock.json` is committed.

3.  **Set up environment variables:**
    Copy the `.env.example` file to `.env`:
    ```bash
    cp .env.example .env
    ```
    Edit the `.env` file and provide the necessary values for your test environment (e.g., `CYPRESS_BASE_URL`).
    **Important:** Ensure `.env` is in your `.gitignore` file and never commit actual secrets. For CI/CD, configure these variables directly in the CI system.

## Running Tests

### Locally

-   **Open Cypress Test Runner (headed mode):**
    ```bash
    npm run test:headed
    # or
    npx cypress open
    ```
    This allows you to select and run tests interactively.

-   **Run all tests in headless mode (CLI):**
    ```bash
    npm test
    # or
    npx cypress run
    ```

### With Tags

You can filter test execution based on tags defined in your `.feature` files.

-   **Run tests with a specific tag (e.g., `@smoke`):**
    ```bash
    npm run test:smoke
    # or
    npx cypress run --env tags=@smoke
    ```

-   **Run tests with a combination of tags (e.g., `@smoke` AND `@login`):**
    ```bash
    npm run test:smokeAndLogin
    # or
    npx cypress run --env tags='@smoke and @login'
    ```

-   **Run tests with other tag expressions (e.g., `@smoke or @regression`):**
    ```bash
    npx cypress run --env tags='@smoke or @regression'
    ```

-   **Run tests excluding a tag (e.g., not `@wip`):**
    ```bash
    npx cypress run --env tags='not @wip'
    ```

### Specific Browsers

By default, tests run on Electron or the browser specified in `cypress.config.ts`. You can specify a different browser:

-   **Run tests in Chrome:**
    ```bash
    npm run test:chrome
    # or
    npx cypress run --browser chrome
    ```

-   **Run tests in Firefox:**
    ```bash
    npm run test:firefox
    # or
    npx cypress run --browser firefox
    ```

-   **Run tests in Edge:**
    ```bash
    npm run test:edge
    # or
    npx cypress run --browser edge
    ```
    (Ensure the browser is installed on your system.)

## Reporting

### Allure Reports

Allure provides rich, interactive HTML reports.

1.  **Run your tests:**
    Test execution will automatically generate raw Allure results in the `allure-results` directory (and Cucumber JSON in `cypress-cucumber-json`).

2.  **Generate and open the Allure report:**
    ```bash
    npm run report:allure
    ```
    This command cleans previous report data, generates a new report in `allure-report`, and opens it in your browser.

3.  **Clean report files:**
    ```bash
    npm run report:clean
    ```

### Native Cypress Reports

Cypress provides default HTML reports, screenshots on failure, and video recordings.
-   **Screenshots:** Saved in `cypress/screenshots/` for failed tests.
-   **Videos:** Saved in `cypress/videos/` (can be disabled in `cypress.config.ts` - currently set to `video: false`).
-   **Cypress Cloud / Dashboard:** For more advanced reporting, analytics, and parallelization, consider integrating with Cypress Cloud.

## Configuration

### Environment Variables

Environment-specific configurations are managed using `.env` files, loaded by `dotenv` in `cypress.config.ts`.
-   See `.env.example` for available options.
-   Variables are accessible in tests via `Cypress.env('VARIABLE_NAME')`.
-   For CI, set these variables directly in the CI/CD system's environment settings.

### Cypress Configuration

The main Cypress configuration is in `cypress.config.ts`. It includes:
-   Preprocessor setup for Cucumber.
-   Allure plugin integration.
-   Default timeouts, viewport settings.
-   Test retry policies (`retries: { runMode: 1, openMode: 0 }`).
-   Environment variable loading.

## Key Capabilities

### BDD with Cucumber

-   Feature files are written in Gherkin syntax (`.feature`) in `cypress/e2e/`.
-   Step definitions are implemented in TypeScript (`.ts`) files in `cypress/support/step_definitions/`.
-   The `cypress-cucumber-preprocessor` configuration is in `package.json` and `cypress.config.ts`.

### UI Testing

-   Leverages Cypress's powerful commands for interacting with web elements.
-   Custom commands in `cypress/support/commands.ts` enhance reusability (e.g., `cy.safeClick()`).
-   Placeholder tests are in `cypress/e2e/ui/login.feature`.

### API Testing (REST & GraphQL)

-   **REST APIs:**
    -   Utility functions in `cypress/support/utils/apiUtils.ts` provide methods like `apiUtils.get()`, `apiUtils.post()`, etc.
    -   These use `cy.request()` for making HTTP calls.
-   **GraphQL APIs:**
    -   Utility functions in `cypress/support/utils/graphqlUtils.ts` include `graphqlUtils.query()` for sending GraphQL queries/mutations and `graphqlUtils.introspectSchema()` for schema introspection.
-   Tests can directly call these utilities to validate API responses.

### Custom Cypress Commands

Located in `cypress/support/commands.ts`. Examples:
-   `cy.safeClick()`: Ensures an element is visible and enabled before clicking.
-   `cy.retryUntilVisible()`: Retries getting an element until it's visible.
-   `cy.login()`: Placeholder for a UI login flow.
-   TypeScript definitions for custom commands are included for better IntelliSense.

### Test Data Management

-   Uses Cypress fixtures (JSON files in `cypress/fixtures/`).
-   Example: `cypress/fixtures/users.json`.
-   Load fixtures in tests using `cy.fixture('fixtureName')`.
-   Demonstrated in `cypress/e2e/data/fixtureDemo.feature` and `cypress/support/step_definitions/fixtureDemoSteps.ts`.
-   For more complex data needs or dynamic data, consider generating data programmatically or using external data sources via `cy.task()`.

### Authentication

-   Handled via `cypress/support/utils/authUtils.ts`.
-   Includes placeholder functions for:
    -   `authUtils.getSessionToken()`: Simulates getting a session token.
    -   `authUtils.getApiToken()`: Simulates getting an API bearer token.
    -   `authUtils.loginViaApi()`: Example of logging in via an API call and storing the token.
    -   `authUtils.clearTokens()`: Clears stored tokens from `Cypress.env()`.
-   These can be adapted for token-based or session-based authentication flows.
-   Prefer API-based login for speed and stability over UI login for test setup where possible.

## CI/CD Integration

### Jenkins

-   A sample `Jenkinsfile` is provided for declarative pipelines.
-   It includes stages for:
    -   Checkout
    -   Install Dependencies (`npm ci`)
    -   Run Cypress Tests (with placeholders for tag-based execution using job parameters)
    -   Generate and Archive Allure Report
-   Environment variables (like `CYPRESS_BROWSER`) can be configured in the Jenkinsfile or Jenkins job.
-   The `Allure Jenkins Plugin` can be used for better visualization of Allure reports directly in Jenkins.

### Slack Notifications

-   The `Jenkinsfile` includes a commented-out placeholder stage for sending Slack notifications about build status.
-   This typically requires the `Slack Notification Plugin` in Jenkins and configuring credentials for your Slack workspace.
-   Alternatively, custom scripts using Slack webhooks can be added.

## Advanced Topics & Scalability

### Modular Architecture (Multiple Applications)

To scale the framework for multiple applications under test (AUTs):

1.  **Directory Structure:**
    -   Create subdirectories under `cypress/e2e/` for each application:
        ```
        cypress/e2e/
        ├── app1/
        │   ├── features/
        │   └── step_definitions/ (if app-specific steps are numerous)
        ├── app2/
        │   ├── features/
        │   └── step_definitions/
        └── shared_step_definitions/ (for common steps)
        ```
    -   Similarly, organize `cypress/support/commands/` and `cypress/support/utils/` if there are app-specific commands or utilities.
        ```
        cypress/support/
        ├── commands/
        │   ├── commonCommands.ts
        │   ├── app1Commands.ts
        │   └── app2Commands.ts
        ├── utils/
        │   ├── commonUtils.ts
        │   ├── app1Utils.ts
        ```
2.  **Configuration:**
    -   Use environment variables or separate Cypress config files per application if configurations differ significantly (though a single, flexible config is often manageable).
3.  **Shared Components:**
    -   Identify and create shared step definitions, commands, and utilities to avoid duplication.
4.  **Page Object Model (POM) / App Actions:**
    -   Consider implementing a POM-like structure or "App Actions" layers for each application to encapsulate page-specific logic and improve maintainability. These can reside in `cypress/support/pages/app1/` or `cypress/support/actions/app1/`.

### Self-Healing Locators

The goal is to make tests more resilient to minor UI changes.
-   **Strategy:**
    1.  **Prioritize Robust Locators:** Use `data-testid`, `data-cy`, `id`, or other unique, test-specific attributes as primary locators.
    2.  **Fallback Locators:** Define a sequence of fallback locators (e.g., `name`, `class`, text, XPath).
    3.  **Custom Command (`cy.getElement()`):** Create a custom command that tries the primary locator first. If it fails, it iterates through fallback locators.
        ```typescript
        // Conceptual example in commands.ts
        // Cypress.Commands.add('getElement', (locators: Array<{type: string, value: string}>) => { ... });
        ```
    4.  **Logging:** Log when fallback locators are used to identify potentially brittle tests or UI changes.
-   The current framework includes a conceptual outline in `cypress/support/commands.ts`. A full implementation requires careful design based on application structure.

### Database Validation & Data Seeding

For tests requiring database interaction (validation or setup/teardown):

1.  **`cy.task()`:** Use Cypress's `cy.task()` to execute Node.js code from your tests. This allows you to run database queries, seed data, or perform other backend operations.
    -   Define tasks in `cypress.config.ts` under `setupNodeEvents`.
        ```typescript
        // In cypress.config.ts
        // on('task', {
        //   queryDb: (query) => {
        //     return db.query(query); // Assuming 'db' is your DB connection client
        //   },
        //   seedData: (data) => { /* ... */ }
        // });
        ```
    -   Call tasks from tests: `cy.task('queryDb', 'SELECT * FROM users').then(results => ...);`
2.  **Data Seeding Strategies:**
    -   **Before Hooks (`beforeEach`, `before`):** Seed data required for tests.
    -   **API Calls:** Use API endpoints to create necessary test data if available. This is often faster and more reliable than UI-based data creation.
    -   **Fixture Files:** For static seed data, fixtures can be used in conjunction with `cy.task()` or API calls.
3.  **Teardown:**
    -   Use `afterEach` or `after` hooks with `cy.task()` or API calls to clean up created data and restore state.

### Parallel Test Execution

Cypress supports running tests in parallel, significantly reducing execution time for large test suites.

1.  **Cypress Cloud:** The easiest way to run tests in parallel. It automatically balances specs across available CI machines.
    ```bash
    npx cypress run --parallel --record --key <your_cypress_cloud_key>
    ```
2.  **Open-Source Alternatives:** Tools like `sorry-cypress` provide an open-source alternative to the Cypress Dashboard for parallelization and result viewing.
3.  **Framework Design for Parallelism:**
    -   Ensure tests are atomic and independent (no shared state between tests that could cause conflicts when run in parallel).
    -   Manage test data carefully to avoid collisions.

### Secret Masking

-   **`.env` files:** Ensure `.env` (containing actual secrets) is in `.gitignore`.
-   **CI/CD:** Store secrets in the CI/CD system's secret management (e.g., Jenkins Credentials, GitHub Secrets). These are injected as environment variables during the build.
-   **Cypress Cloud:** Automatically masks environment variables that are configured as secrets in the dashboard logs.
-   **Logging:** Be cautious about logging `Cypress.env()` directly or any object that might contain sensitive data. The `hideXHRInCommandLog` option in `cypress.config.ts` (or `e2e.ts`) can hide XHR requests from the command log, but it's not a complete solution for all types of sensitive data exposure.

## Contributing

Please read `CONTRIBUTING.md` for details on our code of conduct and the process for submitting pull requests. (Note: `CONTRIBUTING.md` would need to be created).

## License

This project is licensed under the MIT License - see the `LICENSE.md` file for details. (Note: `LICENSE.md` would need to be created).