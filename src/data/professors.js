export const PROFESSORS = [
  {
    id: 1,
    name: 'Professor Dumbledore',
    role: 'Headmaster',
    isPresent: true,
  },
  {
    id: 2,
    name: 'Minerva McGonagall',
    role: 'Headmistress',
    isPresent: true,
  },
  {
    id: 3,
    name: 'Horace Slughorn',
    role: 'Professor',
    subject: 'Potions Master',
    isPresent: true,
  },
  {
    id: 4,
    name: 'Severus Snape',
    role: 'Professor',
    subject: 'Potions Master',
    isPresent: true,
  },
  {
    id: 5,
    name: 'Rubeus Hagrid',
    role: 'Standby Professor',
    subject: 'Potions Master',
    isPresent: true,
  },
  // {
  //   id: 6,
  //   name: 'Remus Lupin',
  //   role: 'Professor',
  //   subject: 'Defense Against the Dark Arts',
  // isPresent : true
  // },
  // {
  //   id: 7,
  //   name: 'Gilderoy Lockhart',
  //   role: 'Professor',
  //   subject: 'Defense Against the Dark Arts',
  // isPresent : true
  // },
  // {
  //   id: 8,
  //   name: 'Alastor Moody',
  //   role: 'Standby Professor',
  //   subject: 'Defense Against the Dark Arts',
  // isPresent : true
  // }
];

export const getProfessorName = (id) =>
  PROFESSORS.find((item) => item.id === id)?.name || '';
