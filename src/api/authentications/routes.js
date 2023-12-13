const routes = (handler) => [
  {
    method: 'POST',
    path: '/authentications/login',
    handler: handler.postAuthenticationHandler,
  },
  {
    method: 'PUT',
    path: '/authentications/refresh-token',
    handler: handler.putAuthenticationHandler,
  },
  {
    method: 'DELETE',
    path: '/authentications/logout',
    handler: handler.deleteAuthenticationHandler,
  },
];

module.exports = routes;