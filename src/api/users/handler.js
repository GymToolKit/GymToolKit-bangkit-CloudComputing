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

     await this._usersService.addUser({ username, email, password });

    const response = h.response({
      status: 'success',
      message: 'Account successfully registered. Please log in.',
    });
    response.code(201);
    return response;
  }
  async getUsersHandler(request, h) {
    const users = await this._usersService.getUsers();
      return h.response({
        status: 'success',
        data: {
          users,
        },
    }); 
  }
  async getUserByIdHandler(request) {
    const { id } = request.params;
    await request.auth.credentials;
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
    await request.auth.credentials;
  
    // Validate the update payload
    this._validator.validateUserUpdatePayload({ username, email });
  
    // Call the service method to update user details
    await this._usersService.editUserById(id, { username, email });
  
    return {
      status: 'success',
      message: 'Update account success.',
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
  async patchPasswordHandler(request) {
    const { id } = request.params;
    const { password, newPassword} = request.payload;
    await request.auth.credentials;
  
    // Validate the update payload
    this._validator.validatePasswordUpdatePayload({ password, newPassword });

    // Verify the old password and update to the new password
    await this._usersService.verifyOldPassword(id, password);
    await this._usersService.editPassword(id, {newPassword});

    return {
      status: 'success',
      message: 'Password change success',
    };
  }
}
module.exports = UsersHandler;
