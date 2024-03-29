/* eslint-disable no-undef */
import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

Given('I open hogwarts schedule page', () => {
  cy.visit('http://localhost:3000/');
  cy.get('#assigned-professor-3').should('have.text', 'Horace Slughorn');
});

When('I mark Professor Horace absent', () => {
  cy.get('table[aria-label="attendance-table"]').should('exist');
  cy.get('#attendance-for-3').click();
});

Then('I should see Rubeus Hagrid as professor of Harry', () => {
  cy.get('#assigned-professor-5').should('have.text', 'Rubeus Hagrid');
});
