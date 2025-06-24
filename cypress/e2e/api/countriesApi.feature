Feature: Countries GraphQL API
  As an API consumer
  I want to retrieve country information
  So that I can verify the GraphQL endpoint

  Scenario: Fetch all countries with basic information
    When I fetch all countries
    Then the response should contain a list of countries with code, name, and continent

  Scenario: Fetch a specific country by code
    When I fetch the country with code "PH"
    Then the returned country's name should be "Philippines"
    And the returned country's continent should be "Asia"
