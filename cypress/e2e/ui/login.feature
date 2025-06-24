Feature: User Login
  As a user
  I want to log in to the application
  So that I can access my account

  @smoke @login
  Scenario: Successful login with valid credentials
    Given I am on the login page
    When I enter "testuser@example.com" in the "username" field
    And I enter "password123" in the "password" field
    And I click the "Login" button
    Then I should be redirected to the dashboard
    And I should see "Welcome, Test User"

  @login
  Scenario: Failed login with invalid credentials
    Given I am on the login page
    When I enter "wronguser@example.com" in the "username" field
    And I enter "wrongpassword" in the "password" field
    And I click the "Login" button
    Then I should see an error message "Invalid credentials, please try again."
