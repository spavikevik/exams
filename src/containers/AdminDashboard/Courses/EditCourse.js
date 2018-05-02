import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import EditCourses from '../../../components/AdminDashboard/Courses/EditCourse';
import { updateFaculty } from '../../../actions/faculty';

const mapStateToProps = state => ({
  courses: state.courseState.courses,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  updateFaculty,
}, dispatch);

const onSubmit = (values, dispatch, props) => {
  props
    .updateFaculty(
      props.facultyId,
      { courseIds: props.courseIds.push(values.course).toArray() },
    );
};

const Form = reduxForm({
  form: 'editCoursesForm',
  onSubmit,
})(EditCourses);


export default connect(mapStateToProps, mapDispatchToProps)(Form);
