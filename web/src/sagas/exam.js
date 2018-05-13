import { call, takeLatest } from 'redux-saga/effects';
import { registerExamStudent } from '../firebase/functions';

export function* registerStudentForExam(action) {
  const { examId, studentId, toggle } = action.payload;
  try {
    yield call(registerExamStudent, { examId, studentId, toggle });
  } catch (e) {
    // do nothing
  }
}

export function* watchExamSaga() {
  yield takeLatest('REGISTERING_STUDENT_FOR_EXAM', registerStudentForExam);
}
