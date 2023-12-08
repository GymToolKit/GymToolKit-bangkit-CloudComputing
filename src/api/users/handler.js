const autoBind = require('auto-bind');

class UsersHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
    
    autoBind(this);
  }

  async postUserHandler(request, h) {
    this._validator.validateUserPayload(request.payload);
    const { username, email, password } = request.payload;

    const userId = await this._service.addUser({ username, email, password });

    const response = h.response({
      status: 'success',
      message: 'User berhasil ditambahkan',
      data: {
        userId,
      },
    });
    response.code(201);
    return response;
  }

  async getUserByIdHandler(request) {
    const { id } = request.params;
    const user = await this._service.getUserById(id);

    return {
      status: 'success',
      data: {
        user,
      },
    };
  }
  async putUsersByIdHandler(request) {
    const { id } = request.params;
    const { username, email } = request.payload;
  
    // Validate the update payload
    this._validator.validateUserUpdatePayload({ username, email });
  
    // Call the service method to update user details
    await this._service.editUserById(id, {username, email });
  
    return {
      status: 'success',
      message: 'Data Berhasil Di Update',
    };
  }
}
module.exports = UsersHandler;
