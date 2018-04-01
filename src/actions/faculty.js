export function onFetchFaculties(faculties) {
  return {
    type: 'LOADING_FACULTIES',
    faculties,
  };
}

export function createFaculty(faculty) {
  return {
    type: 'CREATING_FACULTY',
    payload: { faculty },
  };
}

export function updateFaculty(id, fields) {
  return {
    type: 'UPDATING_FACULTY',
    payload: { id, fields },
  };
}
