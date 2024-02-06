Feature: Marking professor absent should display next available professor in front of student

  Scenario: Rubeus Hagrid will be professor if professor Horace is absent
    Given I open hogwarts schedule page
    When I mark Professor Horace absent
    Then I should see Rubeus Hagrid as professor of Harry
