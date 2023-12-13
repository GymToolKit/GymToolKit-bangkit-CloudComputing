const routes = (handler) => [
  {
    method: 'POST',
    path: '/users/register',
    handler: handler.postUserHandler,
  },
  {
    method: 'GET',
    path: '/users/{id}/view',
    handler: handler.getUserByIdHandler,
  },
  {
    method: 'PUT',
    path: '/users/{id}/edit-users',
    handler: handler.putUsersByIdHandler,
  },
  {
    method: 'PUT',
    path: '/users/{id}/change-password',
    handler: handler.patchPasswordHandler,
  },
  {
    method: 'DELETE',
    path: '/users/{id}/delete-account',
    handler: handler.deleteUsersHandler,
  },
];

module.exports = routes;