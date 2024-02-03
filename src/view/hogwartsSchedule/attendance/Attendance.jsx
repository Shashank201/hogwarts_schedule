import React from 'react';

const Attendance = ({ professors, onAttendanceChange }) => {
  console.log('Render Attendance');

  return (
    <div>
      <table width={'100%'} aria-label='attendance-table'>
        <thead>
          <tr>
            <th>Professor Name</th>
            <th>Attendance</th>
          </tr>
        </thead>
        <tbody>
          {professors ? professors.map((prof) => (
            <tr key={prof.id}>
              <td>{prof.name}</td>
              <td>
                <select
                  value={prof.isPresent}
                  onChange={({ target }) => {
                    onAttendanceChange(prof.id, target.value === 'true');
                  }}
                  aria-label={`${prof.name}-attendance-dropdown`}
                >
                  <option value={true}>Present</option>
                  <option value={false}>Absent</option>
                </select>
              </td>
            </tr>
          )) : null}
        </tbody>
      </table>
    </div>
  );
};

export default Attendance;
