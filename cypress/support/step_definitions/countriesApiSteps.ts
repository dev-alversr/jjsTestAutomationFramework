import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { graphqlUtils } from '../utils/graphqlUtils';

const COUNTRIES_API_URL = 'https://countries.trevorblades.com/';
let countriesResponse: Cypress.Response<any>;
let countryResponse: Cypress.Response<any>;

When('I fetch all countries', () => {
  const query = `{
    countries {
      code
      name
      continent { name }
    }
  }`;
  return graphqlUtils.query(COUNTRIES_API_URL, query).then((response) => {
    countriesResponse = response;
  });
});

Then('the response should contain a list of countries with code, name, and continent', () => {
  expect(countriesResponse.status).to.eq(200);
  const countries = countriesResponse.body.data.countries;
  expect(countries).to.be.an('array').and.not.be.empty;
  expect(countries[0]).to.have.property('code');
  expect(countries[0]).to.have.property('name');
  expect(countries[0]).to.have.nested.property('continent.name');
});

When('I fetch the country with code {string}', (code: string) => {
  const query = `query getCountry($code: ID!) {
    country(code: $code) {
      code
      name
      continent { name }
    }
  }`;
  return graphqlUtils.query(COUNTRIES_API_URL, query, { code }).then((response) => {
    countryResponse = response;
  });
});

Then("the returned country's name should be {string}", (name: string) => {
  expect(countryResponse.status).to.eq(200);
  expect(countryResponse.body.data.country).to.have.property('name', name);
});

Then("the returned country's continent should be {string}", (continent: string) => {
  expect(countryResponse.status).to.eq(200);
  expect(countryResponse.body.data.country).to.have.nested.property('continent.name', continent);
});
