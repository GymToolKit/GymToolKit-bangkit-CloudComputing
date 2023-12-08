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
];

module.exports = routes;