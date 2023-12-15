/* eslint-disable no-unused-vars */
const autoBind = require('auto-bind');

class FeedbackHandler {
  constructor( feedbackService, validator) {
    this._feedbackService = feedbackService;
    this._validator = validator;

    autoBind(this);
  }
  async postFeedbackHandler(request, h) {
    this._validator.validateFeedbackPayload(request.payload);
    const { id: userId } = request.params; 
    const { id: credentialId } = request.auth.credentials;
    const { rating, comment } = request.payload;

    await this._feedbackService.checkFeedbackStatus(userId);
    await this._feedbackService.addFeedback(userId, rating, comment);
    
    const response = h.response({
      status: 'success',
      message: 'Thankyou for giving feedback.',
    });
    response.code(201);
    return response;
  }
  async getFeedbackHandler(request, h) {
    const feedback = await this._feedbackService.getAllFeedback();
      return h.response({
        status: 'success',
        data: {
          feedback,
        },
    }); 
  }
}


module.exports = FeedbackHandler;
