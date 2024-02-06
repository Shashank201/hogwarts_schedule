import React, { useState } from 'react';
import Attendance from './attendance/Attendance';
import Schedule from './schedule/Schedule';
import { PROFESSORS } from '../../data/professors';
import styles from './HogwartsSchedule.module.css';
import imgURL from '../../lib/imgURL';

const HogwartsSchedule = () => {
  const [professors, setProfessors] = useState(PROFESSORS);

  const handleAttendance = (profId, isPresent) => {
    const profMatchIdx = professors.find((prof) => prof?.id === profId);
    profMatchIdx.isPresent = isPresent;
    setProfessors([...professors]);
  };

  // Subject filter can come here, based on selected subjects professor and students allocation has to be maintained

  return (
    <div
      className={styles.hogwartsContainer}
      style={{
        background: `url(${imgURL['hogwarts-background']}) no-repeat center`,
        backgroundSize: 'cover',
      }}
    >
      <header className={styles.heading}>
        <img src={imgURL['hogwarts-logo']} alt='hogwarts logo' width={'4%'} />
        <div>HOGWARTS SCHEDULE</div>
      </header>
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
