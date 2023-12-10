const Joi = require('joi');

const UserPayloadSchema = Joi.object({
  username: Joi.string().max(50).required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});
const UserUpdatePayloadSchema = Joi.object({
  username: Joi.string().max(50).required(),
  email: Joi.string().required(),
});
const UserDeletePayloadSchema = Joi.object({
  username: Joi.string().max(50).required(),
  password: Joi.string().required(),
});

module.exports = { UserPayloadSchema, UserUpdatePayloadSchema, UserDeletePayloadSchema};