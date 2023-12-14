const routes = (handler) => [
  {
    method: 'POST',
    path: '/feedback/{id}',
    handler: handler.postFeedbackHandler,
    options: {
      auth: 'gym_jwt',
    },
  },
  {
    method: 'GET',
    path: '/feedback/list-feedback',
    handler: handler.getFeedbackHandler,
  },
];

module.exports = routes;