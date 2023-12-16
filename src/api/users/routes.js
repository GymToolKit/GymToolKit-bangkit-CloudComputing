const routes = (handler) => [
  {
    method: 'POST',
    path: '/users/register',
    handler: handler.postUserHandler,
  },
  {
    method: 'GET',
    path: '/users/view',
    handler: handler.getUsersHandler,
  },
  {
    method: 'GET',
    path: '/users/view/{id}',
    handler: handler.getUserByIdHandler,
    options: {
      auth: 'gym_jwt',
    },
  },
  {
    method: 'PUT',
    path: '/users/edit-users/{id}',
    handler: handler.putUsersByIdHandler,
    options: {
      auth: 'gym_jwt',
    },
  },
  {
    method: 'PUT',
    path: '/users/change-password/{id}',
    handler: handler.patchPasswordHandler,
    options: {
      auth: 'gym_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/users/delete-account/{id}',
    handler: handler.deleteUsersHandler,
  },
];

module.exports = routes;