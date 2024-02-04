import React from 'react';
import styles from '../HogwartsSchedule.module.css';

const Attendance = ({ professors, onAttendanceChange }) => {
  return (
    <div className={styles.scheduleContainer}>
      <table width={'100%'} aria-label='attendance-table'>
        <thead>
          <tr>
            <th>Professor Name</th>
            <th>Attendance</th>
          </tr>
        </thead>
        <tbody>
          {professors
            ? professors.map((prof) => (
                <tr key={prof.id}>
                  <td>{prof.name}</td>
                  <td className={styles.selectContainer}>
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
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default Attendance;
