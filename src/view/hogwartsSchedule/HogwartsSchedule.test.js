import { render, screen, within } from '@testing-library/react';
import HogwartsSchedule from './HogwartsSchedule';
import user from '@testing-library/user-event';
import { getProfessorName } from '../../data/professors';

test('should change allocated professor onChange of attendance', async () => {
  render(<HogwartsSchedule />);

  const allocationTable = await screen.findByRole('table', {
    name: /allocation-table/i,
  });
  expect(allocationTable).toBeInTheDocument();

  const harryPotterAllocationRow = await within(allocationTable).findByRole(
    'row',
    {
      name: /allocation for harry potter/i,
    }
  );

  expect(harryPotterAllocationRow).toBeInTheDocument();

  const harryPotterProfessorShouldBeHorace = within(
    harryPotterAllocationRow
  ).getByRole('cell', {
    name: /Horace Slughorn/i,
  });
  expect(harryPotterProfessorShouldBeHorace).toBeInTheDocument();

  const horaceDropdown = await screen.findByRole('combobox', {
    name: /Horace Slughorn-attendance-dropdown/i,
  });

  expect(horaceDropdown).toBeInTheDocument();
  expect(horaceDropdown).toHaveValue('true');

  // if Horace is absent assign Rubeus Hagrid to Harry
  await user.selectOptions(horaceDropdown, 'false');

  expect(horaceDropdown).toHaveValue('false');

  const harryPotterProfessorShouldBeRubeus = await within(
    harryPotterAllocationRow
  ).findByRole('cell', {
    name: /Rubeus Hagrid/i,
  });
  expect(harryPotterProfessorShouldBeRubeus).toBeInTheDocument();

  // if Rubeus is absent assign Minerva to Harry
  const rubeusDropdown = await screen.findByRole('combobox', {
    name: /Rubeus Hagrid-attendance-dropdown/i,
  });
  expect(rubeusDropdown).toHaveValue('true');
  await user.selectOptions(rubeusDropdown, 'false');
  expect(rubeusDropdown).toHaveValue('false');

  const harryPotterProfessorShouldBeMinerva = await within(
    harryPotterAllocationRow
  ).findByRole('cell', {
    name: /Minerva McGonagall/i,
  });
  expect(harryPotterProfessorShouldBeMinerva).toBeInTheDocument();

  // if Minerva McGonagall is absent assign Professor Dumbledore to Harry
  const minervaDropdown = await screen.findByRole('combobox', {
    name: /Minerva McGonagall-attendance-dropdown/i,
  });
  expect(minervaDropdown).toHaveValue('true');
  await user.selectOptions(minervaDropdown, 'false');
  expect(minervaDropdown).toHaveValue('false');

  const harryPotterProfessorShouldBeDubledore = await within(
    harryPotterAllocationRow
  ).findByRole('cell', {
    name: /Professor Dumbledore/i,
  });
  expect(harryPotterProfessorShouldBeDubledore).toBeInTheDocument();

  // if Dubledore is absent then put Not Assigned to Harry
  const dubledoreDropdown = await screen.findByRole('combobox', {
    name: /Professor Dumbledore-attendance-dropdown/i,
  });
  expect(dubledoreDropdown).toHaveValue('true');
  await user.selectOptions(dubledoreDropdown, 'false');
  expect(dubledoreDropdown).toHaveValue('false');

  const harryPotterProfessorShouldBeNotAssigned = await within(
    harryPotterAllocationRow
  ).findByRole('cell', {
    name: /Not Assigned/i,
  });
  expect(harryPotterProfessorShouldBeNotAssigned).toBeInTheDocument();
});

test('should return empty if professor id is not in professor array', () => {
  const name = getProfessorName(10);
  expect(name).toBe('');
});

// const pause = () => new Promise((resolve) => setTimeout(resolve, 100));
