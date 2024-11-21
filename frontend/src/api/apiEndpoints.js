// src/api/apiEndpoints.js
export const API_ENDPOINTS = {
    AUTH: {
      LOGIN: '/users/login',
      REGISTER: '/users/register',
    },
    TASKS: {
      GET_ALL: '/tasks',
      CREATE: '/tasks',
      UPDATE: (id) => `/tasks/${id}`,
      DELETE: (id) => `/tasks/${id}`,
    },
  };