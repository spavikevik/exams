export function onFetchFaculties(faculties) {
  return {
    type: 'LOADING_FACULTIES',
    faculties,
  };
}

export function createFaculty(item) {
  return {
    type: 'CREATING_ITEM',
    payload: { item, table: 'faculties' },
  };
}

export function updateFaculty(id, fields) {
  return {
    type: 'UPDATING_ITEM',
    payload: { id, fields, table: 'faculties' },
  };
}
