/* eslint-disable no-undef */
import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

Given('I open hogwarts schedule page', () => {
  cy.visit('http://localhost:3000/');
});

When('I should see attendance table', () => {
  cy.get('table[aria-label="attendance-table"]').should('exist');
});

Then('I should see allocation table', () => {
  cy.get('table[aria-label="allocation-table"]').should('exist');
});
