const InvariantError = require('../../exception/InvariantError');
const { ToolsPayloadSchema, ToolsQueryParamSchema } = require('./schema');

const ToolsValidator = {
  validateToolsPayload: (payload) => {
    const validationResult = ToolsPayloadSchema.validate(payload);
    
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validateToolsQueryParam: (query) => {
    const validationResult = ToolsQueryParamSchema.validate(query);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = ToolsValidator;