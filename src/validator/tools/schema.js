const Joi = require('joi');

const ToolsPayloadSchema = Joi.object({
  toolsName: Joi.string().required(),
  videoUrl: Joi.string().required(),
  headline: Joi.array().items(Joi.string()).required(),
  toolsStep: Joi.array().items(Joi.string()).required(),
});
const ToolsQueryParamSchema = Joi.object({
  toolsName: Joi.string().required(),
});

module.exports = { ToolsPayloadSchema, ToolsQueryParamSchema };
