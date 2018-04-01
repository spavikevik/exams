import { db } from './firebase';

// User API

export const usersRef = db.ref('users');
export const facultiesRef = db.ref('faculties');
export const coursesRef = db.ref('courses');
export const examsRef = db.ref('exams');

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

export const onceGetUsers = () => usersRef.once('value');

export const onceGetFaculties = () => facultiesRef.once('value');

export const onceGetCourses = () => coursesRef.once('value');

export const onceGetExams = () => examsRef.once('value');
