import { render, screen, within } from '@testing-library/react';
import Schedule from './Schedule';
import { PROFESSORS } from '../../../data/professors';

const allocations = [
  {
    key: '1-Potions Master',
    studentId: 1,
    studentName: 'Harry Potter',
    subject: 'Potions Master',
    professor: {
      id: 3,
      name: 'Horace Slughorn',
    },
  },
  {
    key: '2-Potions Master',
    studentId: 2,
    studentName: 'Hermione Granger',
    subject: 'Potions Master',
    professor: {
      id: 5,
      name: 'Rubeus Hagrid',
    },
  },
  {
    key: '3-Potions Master',
    studentId: 3,
    studentName: 'Ron Weasley',
    subject: 'Potions Master',
    professor: {
      id: 4,
      name: 'Severus Snape',
    },
  },
  {
    key: '4-Potions Master',
    studentId: 4,
    studentName: 'Draco Malfoy',
    subject: 'Potions Master',
    professor: {
      id: 3,
      name: 'Horace Slughorn',
    },
  },
  {
    key: '5-Potions Master',
    studentId: 5,
    studentName: 'Padma Patil',
    subject: 'Potions Master',
    professor: {
      id: 5,
      name: 'Rubeus Hagrid',
    },
  },
  {
    key: '6-Potions Master',
    studentId: 6,
    studentName: 'Luna Lovegood',
    subject: 'Potions Master',
    professor: {
      id: 4,
      name: 'Severus Snape',
    },
  },
];

test('should display allocation of professor to students', () => {
  render(<Schedule professors={PROFESSORS} />);

  const tableHeaderValues = ['Student', 'Subject', 'Professor'];
  for (let headerName of tableHeaderValues) {
    const tableHeader = screen.getByRole('columnheader', {
      name: headerName,
    });
    expect(tableHeader).toBeInTheDocument();
  }

  for (let allocation of allocations) {
    const allocationRow = screen.getByRole('row', {
      name: new RegExp(`allocation for ${allocation.studentName}`),
    });

    expect(allocationRow).toBeInTheDocument();

    const renderedStudentNmae = within(allocationRow).getByRole('cell', {
      name: allocation.studentName,
    });

    const subject = within(allocationRow).getByRole('cell', {
      name: allocation.subject,
    });

    const professor = within(allocationRow).getByRole('cell', {
      name: allocation.professor.name,
    });

    expect(renderedStudentNmae).toBeInTheDocument();
    expect(subject).toBeInTheDocument();
    expect(professor).toBeInTheDocument();
  }
});

test('should display Not Assigned if professors are absent', () => {
  render(<Schedule />);

  for (let allocation of allocations) {
    const allocationRow = screen.getByRole('row', {
      name: new RegExp(`allocation for ${allocation.studentName}`),
    });

    expect(allocationRow).toBeInTheDocument();

    const renderedStudentNmae = within(allocationRow).getByRole('cell', {
      name: allocation.studentName,
    });

    const subject = within(allocationRow).getByRole('cell', {
      name: allocation.subject,
    });

    const professor = within(allocationRow).getByRole('cell', {
      name: /Not Assigned/,
    });

    expect(renderedStudentNmae).toBeInTheDocument();
    expect(subject).toBeInTheDocument();
    expect(professor).toBeInTheDocument();
  }
});
