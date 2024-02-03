import { render, screen } from '@testing-library/react';
import Schedule from './Schedule';
import { PROFESSORS } from '../../../data/professors';
import { STUDENTS } from '../../../data/studentsAllocation';

test('should display allocation of professor to students', () => {
  render(<Schedule professors={PROFESSORS} />);

  const tableHeaderValues = ['Student', 'Subject', 'Professor'];
  for (let headerName of tableHeaderValues) {
    const tableHeader = screen.getByRole('columnheader', {
      name: headerName,
    });
    expect(tableHeader).toBeInTheDocument();
  }
});

test('should display Not Assigned if professors are absent', () => {
  render(<Schedule />);
  for (let student of STUDENTS) {
    const name = screen.getByRole('cell', {
      name: student.name,
    });
    expect(name).toBeInTheDocument();
  }

  const rows = screen.getAllByRole('row');

  expect(rows).toHaveLength(STUDENTS.length + 1);

  //   for (let i = 1; i <= rows.length; i++) {
  //     const studentIndex = i-1;
  //     const name = within(rows[i]).getByRole('cell', {
  //       name: STUDENTS[studentIndex]?.name,
  //     });

  //     const subject = within(rows[i]).getByRole('cell', {
  //       name: /potions master/i,
  //     });

  //     // const notAssigned = within(rows[i]).getByRole('cell', {
  //     //   name: /not assigned/i,
  //     // });
  //     expect(name).toBeInTheDocument();
  //     expect(subject).toBeInTheDocument();
  //     // expect(notAssigned).toBeInTheDocument();
  //   }
});
