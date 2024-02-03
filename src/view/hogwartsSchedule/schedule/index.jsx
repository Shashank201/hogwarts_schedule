import React, {useEffect, useState} from 'react';
import {STUDENTS} from '../../../data/studentsAllocation';
import {getProfessorName} from '../../../data/professors';
import {
  SUBJECTS,
  SUBJECTS_MAPPING,
  UPPER_HIERARCHY
} from '../../../data/subjects';

const TARGETED_SUBJECTS = [...SUBJECTS]; // selecting all subjects, but any particular subject can also be select

const initAllocations = () => {
  const allocations = [];
  STUDENTS.forEach((st) => {
    TARGETED_SUBJECTS.forEach((sub) => {
      const prof = st?.allocations?.[sub];
      let professor = null;
      if (prof) {
        professor = {id: prof, name: getProfessorName(prof)};
      }

      allocations.push({
        key: `${st.id}-${sub}`,
        studentId: st.id,
        studentName: st.name,
        subject: sub,
        professor
      });
    });
  });
  return allocations;
};

const INITIAL_ALLOCATION = initAllocations();
const allocatedProfs = [
  ...new Set(
    INITIAL_ALLOCATION.filter((al) => !!al.professor).map(
      (al) => al.professor.id
    )
  )
];

export const Schedule = ({professors}) => {
  const [allocations, setAllocations] = useState(
    JSON.parse(JSON.stringify(INITIAL_ALLOCATION))
  );

  const isPresent = (id) => {
    const matchedProf = professors.find((item) => item.id === id);
    return matchedProf.isPresent;
  };

  const findAvailableProf = (subject) => {
    const teachers = [...SUBJECTS_MAPPING[subject], ...UPPER_HIERARCHY];
    const availableTeacherId = teachers.find(
      (teachId) =>
        isPresent(teachId) && !allocatedProfs.find((p) => p === teachId)
    );
    return availableTeacherId;
  };

  useEffect(() => {
    const newAllocation = allocations.map((al, idx) => {
      if (
        INITIAL_ALLOCATION[idx].professor &&
        isPresent(INITIAL_ALLOCATION[idx].professor.id)
      ) {
        al.professor = INITIAL_ALLOCATION[idx].professor;
        return al;
      }
      // logic
      const nextAvailableTeacherId = findAvailableProf(
        al.subject,
        allocatedProfs
      );
      if (nextAvailableTeacherId) {
        al.professor = {
          id: nextAvailableTeacherId,
          name: getProfessorName(nextAvailableTeacherId)
        };
      } else {
        al.professor = null;
      }

      return al;
    });
    setAllocations(newAllocation);
  }, [professors]);

  return (
    <div>
      <table width={'100%'}>
        <thead>
          <tr>
            <th>Student</th>
            <th>Subject</th>
            <th>Professor</th>
          </tr>
        </thead>
        <tbody>
          {allocations.map(({key, studentName, subject, professor}) => (
            <tr key={key}>
              <td>{studentName}</td>
              <td>{subject}</td>
              <td>
                {professor ? (
                  professor.name
                ) : (
                  <span style={{color: 'red'}}>Not available</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
