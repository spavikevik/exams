export function onFetchCourses(courses) {
  return {
    type: 'LOADING_COURSES',
    courses,
  };
}

export function createCourse(course) {
  return {
    type: 'CREATING_COURSE',
    payload: { course },
  };
}

export function updateCourse(id, fields) {
  return {
    type: 'UPDATING_COURSE',
    payload: { id, fields },
  };
}
