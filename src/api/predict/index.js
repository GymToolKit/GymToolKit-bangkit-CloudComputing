const PredictHandler = require('./handler');
const routes = require('./routes');
 
module.exports = {
  name: 'predict',
  version: '1.0.0',
  register: async (server, { predictService, validator }) => {
    const predictHandler = new PredictHandler(predictService, validator);
    server.route(routes(predictHandler));
  },
};