export function enrollCourse(enrollmentKey, studentId) {
  return {
    type: 'ENROLLING_STUDENT_COURSE',
    payload: { enrollmentKey, studentId },
  };
}

export function updateStudent(id, fields) {
  return {
    type: 'UPDATING_STUDENT',
    payload: { id, fields },
  };
}

