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
    path: '/tools/{id}/detail-tools',
    handler: handler.getToolsByIdHandler,
  },
  {
    method: 'GET',
    path: '/tools/search',
    handler: handler.searchToolsHandler,
  },
  {
    method: 'PUT',
    path: '/tools/{id}/update-tools',
    handler: handler.putToolsByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/tools/{id}/delete-tools',
    handler: handler.deleteToolsByIdHandler,
  },
  
];

module.exports = routes;