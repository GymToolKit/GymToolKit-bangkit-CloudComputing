const InvariantError = require('../../exception/InvariantError');
const { FeedbackPayloadSchema } = require('./schema');

const FeedbackValidator = {
  validateFeedbackPayload: (payload) => {
    const validationResult = FeedbackPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError('Please, provide a rating between 1 to 5');
    }
  },
};

module.exports = FeedbackValidator;
