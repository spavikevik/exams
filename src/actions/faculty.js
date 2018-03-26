export function onFetchFaculties(faculties) {
  return {
    type: 'LOADING_FACULTIES',
    faculties,
  };
}

export function createFaculty(faculty) {
  return {
    type: 'CREATING_FACULTY',
    faculty,
  };
}
