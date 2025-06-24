Feature: Test Data Management Demo
  Demonstrates loading test data from fixture files

  @data @fixture
  Scenario: Load user data from fixture
    Given I load the "users.json" fixture
    Then I should be able to access the user data
    And the first user's email should be "testuser1@example.com"
