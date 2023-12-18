const autoBind = require('auto-bind');

class UploadsHandler {
  constructor(storageService, validator) {
    this._storageService = storageService;
    this._validator = validator;

    autoBind(this);
  }

  async postUploadImageHandler(request, h) {
    try {
      const { image } = request.payload;
      this._validator.validateImageHeaders(image.hapi.headers);

      // Upload the image
      const imageUrl = await this._storageService.uploadImage(image, image.hapi);

      // Predict using the uploaded image
      const predictions = await this._storageService.predictImage(imageUrl);

      const response = h.response({
        status: 'success',
        data: {
          imageUrl,
          predictions, // You may adjust this based on your response structure
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      console.error('Error in postUploadImageHandler:', error.message);

      const response = h.response({
        status: 'fail',
        message: 'Failed to upload image',
      }).code(500);
      return response;
    }
  }
}

module.exports = UploadsHandler;
