const routes = (handler) => [
  {
    method: 'POST',
    path: '/tools/register-tools',
    handler: handler.postToolsHandler,
  },
  {
    method: 'GET',
    path: '/tools/list-tools',
    handler: handler.getToolsHandler,
  },
  {
    method: 'GET',
    path: '/tools/detail-tools/{id}',
    handler: handler.getToolsByIdHandler,
  },
  {
    method: 'GET',
    path: '/tools/search',
    handler: handler.searchToolsHandler,
  },
  {
    method: 'PUT',
    path: '/tools/update-tools/{id}',
    handler: handler.putToolsByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/tools/delete-tools/{id}',
    handler: handler.deleteToolsByIdHandler,
  },
  
];

module.exports = routes;