import React, { useState } from 'react';
import Attendance from './attendance/Attendance';
import Schedule from './schedule/Schedule';
import { PROFESSORS } from '../../data/professors';
import styles from './HogwartsSchedule.module.css';

const HogwartsSchedule = () => {
  const [professors, setProfessors] = useState(PROFESSORS);

  const handleAttendance = (profId, isPresent) => {
    // TODO - better way to update the object in the list
    const profMatchIdx = professors.find((prof) => prof.id === profId);
    profMatchIdx.isPresent = isPresent;
    setProfessors([...professors]);
  };

  console.log('Render Parent');

  // Subject filter can come here, based on selected subjects professor and students allocation has to be maintained

  return (
    <div className={styles.wrapper}>
      <Attendance
        professors={professors}
        onAttendanceChange={handleAttendance}
      />
      <Schedule professors={professors} />
    </div>
  );
};

export default HogwartsSchedule;
