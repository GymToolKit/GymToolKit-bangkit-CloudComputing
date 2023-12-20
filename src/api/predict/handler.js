const autoBind = require('auto-bind');

class PredictHandler {
  constructor(predictService, validator) {
    this._predictService = predictService;
    this._validator = validator;

    autoBind(this);
  }

  async postPredictHandler(request, h) {
    try {
      const { image } = request.payload;
      this._validator.validateImageHeaders(image.hapi.headers);

      const predictions = await this._predictService.predictImageUsingTFJS(image);
  
      const response = h.response({
        status: 'success',
        data: {
          predictions,
        },
      });
  
      return response.code(201);
    } catch (error) {
      console.error('Error in postUploadImageHandler:', error.message);
  
      const response = h.response({
        status: 'fail',
        message: 'Failed to process image',
      }).code(500);
  
      return response;
    }
  }
}

module.exports = PredictHandler;
