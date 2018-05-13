export function createExam(item) {
  return {
    type: 'CREATING_ITEM',
    payload: { item, table: 'exams' },
  };
}

export function updateExam(id, fields) {
  return {
    type: 'UPDATING_ITEM',
    payload: { id, fields, table: 'exams' },
  };
}

export function toggleRegisterStudentForExam(examId, studentId, toggle) {
  return {
    type: 'REGISTERING_STUDENT_FOR_EXAM',
    payload: { examId, studentId, toggle },
  };
}
