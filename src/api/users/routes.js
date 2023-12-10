const routes = (handler) => [
  {
    method: 'POST',
    path: '/users',
    handler: handler.postUserHandler,
  },
  {
    method: 'GET',
    path: '/users/{id}',
    handler: handler.getUserByIdHandler,
  },
  {
    method: 'PUT',
    path: '/users/{id}',
    handler: handler.putUsersByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/users/{id}',
    handler: handler.deleteUsersHandler,
  },
];

module.exports = routes;