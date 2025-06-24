// No longer trying to require 'cypress' for defineConfig
// const cypress = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor');
const esbuildPluginModule = require('@badeball/cypress-cucumber-preprocessor/esbuild');
const createEsbuildPlugin = esbuildPluginModule.default; // Correctly access the function
const dotenv = require('dotenv');
// const { allureCypress } = require('@shelex/cypress-allure-plugin/reporter'); // Temporarily disabling due to "Cypress is not defined"

// Load environment variables from .env file
dotenv.config();

// Export the configuration object directly
module.exports = {
  e2e: {
    specPattern: '**/*.feature', // Run .feature files
    async setupNodeEvents(on, config) {
      // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
      await addCucumberPreprocessorPlugin(on, config);

      on(
        'file:preprocessor',
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      // Allure Cypress plugin - Temporarily disabling due to "Cypress is not defined"
      // allureCypress(on, {
      //   allureReportPath: 'allure-results',
      //   clearFilesForPreviousAttempt: true,
      // });

      // Load environment variables
      config.env = {
        ...config.env,
        ...process.env,
      };

      return config;
    },
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    chromeWebSecurity: false,
    video: false,
  },
  component: {
    devServer: {
      framework: 'react',
      bundler: 'webpack',
    },
  },
  retries: {
    runMode: 1,
    openMode: 0,
  },
};
