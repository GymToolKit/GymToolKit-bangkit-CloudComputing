const FeedbackHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'feedback',
  version: '1.0.0',
  register: async (server, { feedbackService, validator }) => {
    const feedbackHandler = new FeedbackHandler(feedbackService, validator);
    server.route(routes(feedbackHandler));
  },
};