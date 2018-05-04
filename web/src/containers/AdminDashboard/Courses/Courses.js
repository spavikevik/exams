import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Courses from '../../../components/AdminDashboard/Courses/Courses';
import { createCourse } from '../../../actions/course';

const mapStateToProps = state => ({
  courses: state.courseState.courses,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  createCourse,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Courses);
