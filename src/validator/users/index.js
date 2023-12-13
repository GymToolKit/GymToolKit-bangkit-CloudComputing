const InvariantError = require('../../exception/InvariantError');
const { UserPayloadSchema, UserUpdatePayloadSchema, UserDeletePayloadSchema, PasswordUpdatePayloadSchema } = require('./schema');

const UsersValidator = {
  validateUserPayload: (payload) => {
    const validationResult = UserPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },

  // New method for validating user update payload
  validateUserUpdatePayload: (payload) => {
    const validationResult = UserUpdatePayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  // New method for validating user Delete payload
  validateUserDeletePayload: (payload) => {
    const validationResult = UserDeletePayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
   // New method for validating password update payload
   validatePasswordUpdatePayload: (payload) => {
    const validationResult = PasswordUpdatePayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = UsersValidator;
