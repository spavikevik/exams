import { db } from './firebase';

// User API

export const createUser = (id, username, email) => db.ref(`users/${id}`).set({
  username,
  email,
});

export const createFaculty = ({ name, shortName }) => {
  const newFacultyRef = db.ref('faculties').push({
    name,
    shortName,
  });
  console.log(newFacultyRef);
};

export const createCourse = (name, code, semester, year, active = true) => {
  const newCourseRef = db.ref('courses').push({
    name,
    code,
    semester,
    year,
    active,
  });
  console.log(newCourseRef);
};

export const createExam = (courseId, questions) => {
  const newExamRef = db.ref('exams').push({
    courseId,
    questions,
  });
  console.log(newExamRef);
};

export const onceGetUsers = () => db.ref('users').once('value');

export const onceGetFaculties = () => db.ref('faculties').once('value');

export const onceGetCourses = () => db.ref('courses').once('value');

export const onceGetExams = () => db.ref('exams').once('value');
