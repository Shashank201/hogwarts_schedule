import React from 'react';
import styles from '../HogwartsSchedule.module.css';
import NameCard from '../../../components/NameCard/NameCard';

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
                  <td>
                    <NameCard
                      avatarSrc={prof.avatar ? prof.avatar : ''}
                      customSize={50}
                      title={prof.name ? prof.name : ''}
                      customClass='professor-card'
                    />
                  </td>
                  <td>
                    {
                      // <Select
                    //   aria-label={`${prof.name}-attendance-dropdown`}
                    //   id={`attendance-for-${prof.id}`}
                    //   defaultValue='true'
                    //   style={{ width: '80%', paddingLeft: '40px' }}
                    //   onChange={(value) => {
                    //     onAttendanceChange(prof.id, value === 'true');
                    //   }}
                    //   options={[
                    //     { value: 'true', label: 'Present' },
                    //     { value: 'false', label: 'Absent' },
                    //   ]}
                    // />
                  }
                    <select
                      value={prof.isPresent}
                      onChange={({ target }) => {
                        onAttendanceChange(prof.id, target.value === 'true');
                      }}
                      aria-label={`${prof.name}-attendance-dropdown`}
                      id={`attendance-for-${prof.id}`}
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
