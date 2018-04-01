export function createExam(exam) {
  return {
    type: 'CREATING_EXAM',
    payload: { exam },
  };
}

export function updateExam(id, fields) {
  return {
    type: 'UPDATING_EXAM',
    payload: { id, fields },
  };
}
