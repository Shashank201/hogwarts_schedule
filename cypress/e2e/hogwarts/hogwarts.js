/* eslint-disable no-undef */
import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

Given('I open hogwarts schedule page', () => {
  cy.visit('http://localhost:3000/');
});

When('I reload it should render attendance component', () => {
  cy.get('table[aria-label="attendance-table"]').should('exist');
});

Then('I should see list of professors', () => {
  cy.get('table[aria-label="attendance-table"]').should('exist');
});
