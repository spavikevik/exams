import { List } from 'immutable';
import Student from '../models/student';

const INITIAL_STATE = {
  student: new Student(),
  students: new List(),
};

function studentReducer(state = INITIAL_STATE, action) {
  let studentIndex = -1;
  let students;
  let updatedStudent;
  switch (action.type) {
    case 'UPDATING_STUDENT':
      if (action.key === 'enrolledCourses') {
        updatedStudent = state.student.setEnrolledCourses(action.data);
      } else if (action.key === 'exams') {
        updatedStudent = state.student.setExams(action.data);
      } else {
        updatedStudent = state.student.set(action.key, action.data);
      }
      return Object.assign({}, state, { student: updatedStudent });
    case 'UPDATING_STUDENTS':
      studentIndex = state.students.findIndex(student => student.id === action.key);
      if (studentIndex >= 0) {
        students = state
          .students
          .set(studentIndex, Student.fromObject(action.key, action.item));
      } else {
        students = state.students.push(Student.fromObject(action.key, action.item));
      }
      return Object.assign({}, state, { students });
    default:
      return state;
  }
}

export default studentReducer;
