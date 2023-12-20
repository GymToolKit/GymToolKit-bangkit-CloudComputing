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

      // Adjust the file storage method based on your new service
      const fileLocation = await this._storageService.writeFile(image, image.hapi);

      const response = h.response({
        status: 'success',
        data: {
          fileLocation,
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
