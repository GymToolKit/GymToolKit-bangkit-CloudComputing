const UploadsHandler = require('./handler');
const routes = require('./routes');
 
module.exports = {
  name: 'uploads',
  version: '1.0.0',
  register: async (server, { storageService, validator }) => {
    const uploadsHandler = new UploadsHandler(storageService, validator);
    server.route(routes(uploadsHandler));
  },
};