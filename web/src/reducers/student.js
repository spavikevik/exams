import { List } from 'immutable';
import Course from '../models/course';
import Student from '../models/student';

const INITIAL_STATE = {
  student: new Student(),
  students: new List(),
};

function studentReducer(state = INITIAL_STATE, action) {
  let studentIndex = -1;
  let students;
  switch (action.type) {
    case 'UPDATING_STUDENT':
      if (action.key === 'enrolledCourses') {
        const courses = Object.entries(action.data).reduce((result, [key, value]) => {
          if (key !== 'enrollmentKey') {
            return [
              ...result,
              Course.fromObject(key, value),
            ];
          }
          return result;
        }, []);
        const student = state.student.set('enrolledCourses', new List(courses));
        return Object.assign({}, state, { student });
      }
      return state;
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
