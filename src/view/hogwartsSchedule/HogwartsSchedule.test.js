import { render, screen, within } from '@testing-library/react';
import HogwartsSchedule from './HogwartsSchedule';
import user from '@testing-library/user-event';
import { getProfessorName } from '../../data/professors';

const validateStudentsProfessor = async (studentArray, professorName) => {
  const allocationTable = await screen.findByRole('table', {
    name: /allocation-table/i,
  });
  expect(allocationTable).toBeInTheDocument();

  for (let student in studentArray) {
    const studentAllocationRow = await within(allocationTable).findByRole(
      'row',
      {
        name: new RegExp(`allocation for ${student}`),
      }
    );
    expect(studentAllocationRow).toBeInTheDocument();

    const professor = within(studentAllocationRow).getByRole('cell', {
      name: professorName,
    });
    expect(professor).toBeInTheDocument();
  }
};

const markProferssorAbsent = async (professor) => {
  const professorDropdown = await screen.findByRole('combobox', {
    name: new RegExp(`${professor}-attendance-dropdown`),
  });
  expect(professorDropdown).toBeInTheDocument();
  expect(professorDropdown).toHaveValue('true');
  await user.selectOptions(professorDropdown, 'false');
  expect(professorDropdown).toHaveValue('false');
};

test('should change allocated professor onChange of attendance', async () => {
  render(<HogwartsSchedule />);

  const students = ['Harry Potter', 'Draco Malfoy'];
  validateStudentsProfessor(students, 'Horace Slughorn');

  // if Horace is absent then next available professor should be Rubeus Hagrid
  markProferssorAbsent('Horace Slughorn');
  validateStudentsProfessor(students, 'Rubeus Hagrid');

  // if Rubeus is absent then next available professor should be Minerva
  markProferssorAbsent('Rubeus Hagrid');
  validateStudentsProfessor(students, 'Minerva McGonagall');

  // if Minerva McGonagall is absent then next available professor should be Professor Dumbledore
  markProferssorAbsent('Minerva McGonagall');
  validateStudentsProfessor(students, 'Professor Dumbledore');

  // if Dubledore is absent then put Not Assigned to students
  markProferssorAbsent('Professor Dumbledore');
  validateStudentsProfessor(students, 'Not Assigned');
});

test('should return empty if professor id is not in professor array', () => {
  const name = getProfessorName(10);
  expect(name).toBe('');
});

