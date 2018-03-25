import { db } from './firebase';

// User API

export const createUser = (id, username, email) => {
  return db.ref(`users/${id}`).set({
    username,
    email,
  });
};

export const createFaculty = (name, shortName) => {
  const newFacultyRef = db.ref('faculties').push({
    name,
    shortName,
  });
};

export const createCourse = (name, code, semester, year, active = true) => {
  const newCourseRef = db.ref('courses').push({
    name,
    code,
    semester,
    year,
    active
  });
};

export const createExam = (courseId, questions) => {
  const newExamRef = db.ref('exams').push({
    courseId,
    questions,
  });
};

export const onceGetUsers = () => {
  return db.ref('users').once('value');
};

export const onceGetFaculties = () => {
  return db.ref('faculties').once('value');
};

export const onceGetCourses = () => {
  return db.ref('courses').once('value');
};

export const onceGetExams = () => {
  return db.ref('exams').once('value');
};
