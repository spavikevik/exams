import { db } from './firebase';

// User API

export const usersRef = db.ref('users');
export const facultiesRef = db.ref('faculties');
export const coursesRef = db.ref('courses');
export const examsRef = db.ref('exams');
export const enrollmentKeysRef = db.ref('enrollmentKeys');
export const studentsRef = db.ref('students');

// export const createUser = (id, username, email) => usersRef.child(id).set({
//   username,
//   email,
// });

export const createFaculty = (faculty) => {
  facultiesRef.push({
    ...faculty,
  });
};

export const updateFaculty = (id, fields) => {
  facultiesRef.child(id).update(fields);
};

export const setStudent = (id, fields) => {
  studentsRef.child(id).set(fields);
};

export const createCourse = (attrs, active = true) => {
  coursesRef.push({
    ...attrs,
    active,
  });
};

export const createExam = (exam) => {
  examsRef.push({
    ...exam,
  });
};

export const getCourseIdByEnrollmentKey = secretKey =>
  enrollmentKeysRef.child(secretKey).once('value').then(snapshot => snapshot.val());

export const getCourseById = courseId =>
  coursesRef.child(courseId).once('value').then(snapshot => snapshot.val());

export const enrollCourse = (studentId, enrollmentKey) => {
  studentsRef
    .child(studentId)
    .child('enrolledCourses')
    .set({
      enrollmentKey,
    });
};

export const onceGetUsers = () => usersRef.once('value');

export const onceGetFaculties = () => facultiesRef.once('value');

export const onceGetCourses = () => coursesRef.once('value');

export const onceGetExams = () => examsRef.once('value');
