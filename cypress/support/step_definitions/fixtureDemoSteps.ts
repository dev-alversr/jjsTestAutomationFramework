import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';

// A simple way to store fixture data for access across steps in a scenario
let loadedFixtureData: any;

Given('I load the {string} fixture', (fixtureName: string) => {
  cy.fixture(fixtureName).then((data) => {
    cy.log(`Loaded fixture: ${fixtureName}`);
    console.log('Fixture Data:', data); // Also log to browser console for easy inspection
    loadedFixtureData = data; // Store it for later steps
  });
});

Then('I should be able to access the user data', () => {
  expect(loadedFixtureData).to.not.be.undefined;
  expect(Array.isArray(loadedFixtureData)).to.be.true;
  expect(loadedFixtureData.length).to.be.greaterThan(0);
  cy.log('User data is accessible and is an array with items.');
});

Then('the first user\'s email should be {string}', (expectedEmail: string) => {
  expect(loadedFixtureData).to.not.be.undefined;
  expect(loadedFixtureData[0]).to.have.property('email', expectedEmail);
  cy.log(`Verified first user's email is: ${expectedEmail}`);
});
