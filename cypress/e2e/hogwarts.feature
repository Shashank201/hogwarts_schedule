Feature: Attendance and allocation component rendered

  Scenario: Load component
    Given I open hogwarts schedule page
    When I should see attendance table
    Then I should see allocation table

