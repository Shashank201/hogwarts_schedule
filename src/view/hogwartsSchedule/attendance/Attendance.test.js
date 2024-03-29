import { render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import Attendance from './Attendance';
import { PROFESSORS } from '../../../data/professors';

test('should have table with th values Professor Name and Attendance', () => {
  render(<Attendance />);

  const tableHeaderValues = ['Professor Name', 'Attendance'];
  for (let headerName of tableHeaderValues) {
    const tableHeader = screen.getByRole('columnheader', {
      name: headerName,
    });
    expect(tableHeader).toBeInTheDocument();
  }
});

test('should have with zero professors if professor array is empty', () => {
  render(<Attendance />);
  const thcount = screen.getAllByRole('columnheader');
  expect(thcount).toHaveLength(2);

  const headerForProfessor = screen.getByRole('columnheader', {
    name: /professor name/i,
  });
  const headerForAttendance = screen.getByRole('columnheader', {
    name: /attendance/i,
  });

  expect(headerForProfessor).toBeInTheDocument();
  expect(headerForAttendance).toBeInTheDocument();

  const noProfessorsFound = screen.getByRole('cell', {
    name: /professors not found/i,
  });

  expect(noProfessorsFound).toBeInTheDocument();
});

test('should display empty string if professor name is not given', () => {
  const professorArray = [
    {
      id: 1,
      role: 'Headmaster',
      isPresent: true,
    },
  ];

  render(<Attendance professors={professorArray} />);

  const column = screen.getByRole('cell', {
    name: '',
  });
  expect(column).toBeInTheDocument();
});

test('should render all professors', async () => {
  render(<Attendance professors={PROFESSORS} />);
  for (let professor of PROFESSORS) {
    const name = await screen.findByRole('cell', {
      name: professor.name,
    });
    expect(name).toBeInTheDocument();
  }
  const switchBtns = await screen.findAllByRole('switch');
  expect(switchBtns).toHaveLength(PROFESSORS.length);
});

test('should call a function on change of dropdown', async () => {
  const professorArray = [
    {
      id: 1,
      name: 'Professor Dumbledore',
      role: 'Headmaster',
      isPresent: true,
      avatar: 'avatar-Albus-Dumbledore',
    },
  ];
  const mockedFunction = jest.fn();
  render(
    <Attendance
      professors={professorArray}
      onAttendanceChange={mockedFunction}
    />
  );

  const name = await screen.findByRole('cell', {
    name: professorArray[0].name,
  });

  expect(name).toBeInTheDocument();
  const professorSwitch = await screen.findByRole('switch', {
    name: /Professor Dumbledore-attendance-dropdown/,
  });
  expect(professorSwitch).toBeInTheDocument();
  expect(professorSwitch).toBeChecked();

  await waitFor(async () => {
    await user.click(professorSwitch);
    expect(professorSwitch).not.toBeChecked();
  });
  expect(mockedFunction).toHaveBeenCalled();
});
