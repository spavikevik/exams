import React from 'react';
import PropTypes from 'prop-types';
import { Field, propTypes } from 'redux-form';
import { List as ImmutableList } from 'immutable';
import { List, Form, Button } from 'semantic-ui-react';

const DropdownField = props =>
  (
    <Form.Dropdown
      disabled={props.disabled}
      selection
      options={props.options}
      {...props.input}
      value={props.input.value}
      onChange={(param, data) => props.input.onChange(data.value)}
      placeholder={props.label}
    />
  );

DropdownField.propTypes = {
  ...propTypes,
};

const EditCourses = (props) => {
  const { courses, courseIds, handleSubmit } = props;
  const addedCourses = courses.filter(course => courseIds.contains(course.id));
  const courseOptions = courses.reduce((result, course) => {
    if (!courseIds.contains(course.id)) {
      return [
        ...result,
        { key: course.id, value: course.id, text: course.name },
      ];
    }
    return result;
  }, []);
  return (
    <div>
      <List divided relaxed size="large">
        {addedCourses.map(course => (
          <List.Item>
            <List.Icon name="graduation" />
            <List.Content>{course.name} ({course.code})</List.Content>
          </List.Item>
          ))}
      </List>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Field
            component={DropdownField}
            name="course"
            label="Add a new course"
            options={courseOptions}
            disabled={courseOptions.length === 0}
          />
          <Button type="submit" positive icon="add" disabled={courseOptions.length === 0} />
        </Form.Group>
      </Form>
    </div>
  );
};

EditCourses.propTypes = {
  courseIds: PropTypes.instanceOf(ImmutableList).isRequired,
  courses: PropTypes.instanceOf(ImmutableList).isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default EditCourses;
