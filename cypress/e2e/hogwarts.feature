Feature: Attendance component should load

  Scenario: Load component
    Given I open hogwarts schedule page
    When I reload it should render attendance component
    Then I should see list of professors
