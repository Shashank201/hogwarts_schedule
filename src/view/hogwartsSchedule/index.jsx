import React from 'react';
import styles from './HogwartsSchedule.module.css';
import {Attendance} from './attendance';
import {useState} from 'react';
import {Schedule} from './schedule';
import {PROFESSORS} from '../../data/professors';

const initProfessors = () => {
  return PROFESSORS.map((item) => ({...item, isPresent: true}));
};

export const HogwartsSchedule = () => {
  const [professors, setProfessors] = useState(initProfessors());

  const handleAttendance = (profId, isPresent) => {
    // TODO - better way to update the object in the list
    const profMatchIdx = professors.find((prof) => prof.id === profId);
    profMatchIdx.isPresent = isPresent;
    setProfessors([...professors]);
  };

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
