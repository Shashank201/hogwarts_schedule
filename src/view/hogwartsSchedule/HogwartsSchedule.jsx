import React, { useState } from 'react';
import Attendance from './attendance/Attendance';
import Schedule from './schedule/Schedule';
import { PROFESSORS } from '../../data/professors';
import styles from './HogwartsSchedule.module.css';

const HogwartsSchedule = () => {
  const [professors, setProfessors] = useState(PROFESSORS);

  const handleAttendance = (profId, isPresent) => {
    const profMatchIdx = professors.find((prof) => prof.id === profId);
    profMatchIdx.isPresent = isPresent;
    setProfessors([...professors]);
  };

  // Subject filter can come here, based on selected subjects professor and students allocation has to be maintained

  return (
    <div>
      <div>
        <header className={styles.heading}>HOGWARTS SCHEDULE</header>
      </div>
      <div className={styles.wrapper}>
        <Attendance
          professors={professors}
          onAttendanceChange={handleAttendance}
        />
        <Schedule professors={professors} />
      </div>
    </div>
  );
};

export default React.memo(HogwartsSchedule);
