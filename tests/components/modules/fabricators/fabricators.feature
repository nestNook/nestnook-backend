Feature: Fabricators

    Scenario: Create fabricator
      Given an admin send a post request to "/api/v1/fabricators" to create a new fabricator
      Then the create fabricator response status code should be 201
      And the response body should contain the fabricator data

    Scenario: Find fabricator by id
      Given an admin send a get request to "/api/v1/fabricators" to find a fabricator
      When the find fabricator by id response status code should be 200
      Then the response body shuld contain the fabricator data

    Scenario: Update a fabricator
      Given an admin send a patch request to "/api/v1/fabricators" to update a fabricator
      When the update fabricator response status code is 200
      Then the response body should contain new fabricator data

    Scenario: Delete a fabricator
      Given an admin send a delete request to "/api/v1/fabricators" to delete a fabricator
      When the delete fabricator response status code is 200
      Then the delete fabricator response body should be empty