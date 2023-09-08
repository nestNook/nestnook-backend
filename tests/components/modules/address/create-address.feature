Feature: Address
  
  Scenario: Create a new Address
    When a user send a post request to "/api/v1/address"
    Then the response status should be 201
    And the response body should return a JSON with the address created