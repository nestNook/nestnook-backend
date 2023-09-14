Feature: Fabricators

    Scenario: Create fabricator
      Given an admin send a post request to "/api/v1/fabricators" to create a new fabricator
      Then the create fabricator response status code should be 201
      And the response body should contain the fabricator data

    Scenario: Find fabricator by id
      Given an admin send a get request to "/api/v1/fabricators" to find a fabricator
      When the find fabricator by id response status code should be 200
      Then the response body shuld contain the fabricator data
