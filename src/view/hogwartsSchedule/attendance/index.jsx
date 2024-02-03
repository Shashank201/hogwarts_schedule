import React from 'react';

export const Attendance = ({professors, onAttendanceChange}) => {
  return (
    <div>
      <h3>Attendance</h3>
      {professors.map((prof) => (
        <div
          key={prof.id}
          style={{
            display: 'flex',
            padding: 16,
            margin: 16,
            borderRadius: 16,
            boxShadow: '2px 2px 5px gray'
          }}
        >
          <div style={{flex: 1}}>{prof.name}</div>
          <select
            value={prof.isPresent}
            onChange={({target}) => {
              onAttendanceChange(prof.id, target.value === 'true');
            }}
          >
            <option value={true}>Present</option>
            <option value={false}>Absent</option>
          </select>
        </div>
      ))}
    </div>
  );
};
