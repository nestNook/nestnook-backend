Feature: Users

    Scenario: Create user
      When a user send a post request to "/api/v1/users" to create a new user profile
      Then the response status code should be 201
      And the response body should contain the access and refresh tokens
