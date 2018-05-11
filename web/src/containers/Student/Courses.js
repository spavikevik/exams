import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { enrollCourse } from '../../actions/student';

import Courses from '../../components/Student/Courses';

const mapStateToProps = state => ({
  courses: state.studentState.student.enrolledCourses,
  authUser: state.sessionState.authUser,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  enrollCourse,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Courses);
