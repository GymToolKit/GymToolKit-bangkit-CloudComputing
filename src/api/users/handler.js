const autoBind = require('auto-bind');

class UsersHandler {
  constructor( usersService, validator) {
    this._usersService = usersService;
    this._validator = validator;
    
    autoBind(this);
  }

  async postUserHandler(request, h) {
    this._validator.validateUserPayload(request.payload);
    const { username, email, password } = request.payload;

    const userId = await this._usersService.addUser({ username, email, password });

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
    const user = await this._usersService.getUserById(id);

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
    await this._usersService.editUserById(id, {username, email });
  
    return {
      status: 'success',
      message: 'Data Berhasil Di Update',
    };
  }
  async deleteUsersHandler(request) {
    this._validator.validateUserDeletePayload(request.payload);
    const { id } = request.params;
    const { username, password } = request.payload;
    await this._usersService.verifyUserCredential(username, password);
    await this._usersService.deleteUsersById(id);

    return {
      status: 'success',
      message: 'Delete Account Successful',
    };
  }
}
module.exports = UsersHandler;
