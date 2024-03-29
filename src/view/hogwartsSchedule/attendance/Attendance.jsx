import React from 'react';
import { Switch } from 'antd';
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
          {professors?.length ? (
            professors.map((prof) => (
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
                  {/* Since Dropdown only had 2 options, to save user clicks Switch/ Radio Button is best choice */}
                  <Switch
                    id={`attendance-for-${prof.id}`}
                    aria-label={`${prof.name}-attendance-dropdown`}
                    checkedChildren='Present'
                    unCheckedChildren='Absent'
                    defaultChecked
                    onChange={(checked) => {
                      onAttendanceChange(prof.id, checked);
                    }}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2} style={{ textAlign: 'center' }}>
                Professors not found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Attendance;
