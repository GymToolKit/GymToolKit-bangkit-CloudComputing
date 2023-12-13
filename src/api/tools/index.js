const ToolsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'tools', 
  version: '1.0.0',
  register: async (server, { toolsService, validator }) => {
    const toolsHandler = new ToolsHandler(toolsService, validator); 
    server.route(routes(toolsHandler)); 
  },
};
