import { db } from './firebase';

export const facultiesRef = db.ref('faculties');
export const coursesRef = db.ref('courses');
export const examsRef = db.ref('exams');
export const enrollmentKeysRef = db.ref('enrollmentKeys');
export const studentsRef = db.ref('students');

export const tablesRefs = {
  courses: db.ref('courses'),
  faculties: db.ref('faculties'),
  exams: db.ref('exams'),
  students: db.ref('students'),
};

export const setStudent = (id, fields) => {
  studentsRef.child(id).set(fields);
};

export const createItem = (table, item) => {
  const ref = tablesRefs[table];
  ref.push({
    ...item,
  });
};

export const updateItem = (table, id, fields) => {
  const ref = tablesRefs[table];
  ref.child(id).update(fields);
};

export const getCourseIdByEnrollmentKey = secretKey =>
  enrollmentKeysRef.child(secretKey).once('value').then(snapshot => snapshot.val());

export const getCourseById = courseId =>
  coursesRef.child(courseId).once('value').then(snapshot => snapshot.val());

export const enrollCourse = (studentId, enrollmentKey) => {
  studentsRef
    .child(studentId)
    .child('enrolledCourses')
    .child('enrollmentKey')
    .set(enrollmentKey);
};
