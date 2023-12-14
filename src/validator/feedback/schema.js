const Joi = require('joi');

const FeedbackPayloadSchema = Joi.object({
  userId: Joi.string().required(),
  rating: Joi.number().integer().required(),
  comment: Joi.string().allow(null, ''),
});

module.exports = { FeedbackPayloadSchema };
