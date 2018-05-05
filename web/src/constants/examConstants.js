const examTypes = [
  { key: 0, value: 0, text: 'First midterm' },
  { key: 1, value: 1, text: 'Second midterm' },
  { key: 2, value: 2, text: 'Final Exam' },
];

const questionTypes = [
  { key: 0, value: 0, text: 'Multiple choice' },
  { key: 1, value: 1, text: 'Essay' },
  { key: 2, value: 2, text: 'Short answer' },
  { key: 3, value: 3, text: 'Code' },
];

const examDurations = [
  { key: 0, value: 1, text: '1 hour' },
  { key: 1, value: 1.5, text: '1 hour 30 minutes' },
  { key: 2, value: 2, text: '2 hours' },
  { key: 3, value: 2.5, text: '2 hours 30 minutes' },
  { key: 4, value: 3, text: '3 hours' },
  { key: 5, value: 3.5, text: '3 hours 30 minutes' },
];

export {
  examTypes,
  questionTypes,
  examDurations,
};
