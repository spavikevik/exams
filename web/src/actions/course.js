export function onFetchCourses(courses) {
  return {
    type: 'LOADING_COURSES',
    courses,
  };
}

export function createCourse(item) {
  return {
    type: 'CREATING_ITEM',
    payload: { item, table: 'courses' },
  };
}

export function updateCourse(id, fields) {
  return {
    type: 'UPDATING_ITEM',
    payload: { id, fields, table: 'courses' },
  };
}
