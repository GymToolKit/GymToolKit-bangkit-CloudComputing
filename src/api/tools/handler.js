const autoBind = require('auto-bind');

class ToolsHandler {
  constructor( toolsService, validator) {
    this._toolsService = toolsService;
    this._validator = validator;
    
    autoBind(this);
  }

  async postToolsHandler(request, h) {
    this._validator.validateToolsPayload(request.payload);
    const { toolsName, videoUrl, headline, toolsStep } = request.payload;

    const userId = await this._toolsService.addTools({toolsName, videoUrl, headline, toolsStep });

    const response = h.response({
      status: 'success',
      message: 'Tools berhasil ditambahkan',
      data: {
        userId,
      },
    });
    response.code(201);
    return response;
  }
  async getToolsHandler(request, h) {
    const tools = await this._toolsService.getTools();
      return h.response({
        status: 'success',
        data: {
          tools,
        },
    }); 
  }
  async getToolsByIdHandler(request) {
    const { id } = request.params;
    const tools = await this._toolsService.getToolsById(id);
    return {
      status: 'success',
      data: {
        tools,
      },
    };
  }
  async putToolsByIdHandler(request) {
    this._validator.validateToolsPayload(request.payload);
    const { id } = request.params;
    await this._toolsService.editToolsById(id, request.payload);

    return {
      status: 'success',
      message: 'Tools berhasil diperbarui',
    };
  }
  async deleteToolsByIdHandler(request) {
    const { id } = request.params;
    await this._toolsService.deleteToolsById(id);
    return {
      status: 'success',
      message: 'Tools berhasil dihapus',
    };
  }
  async searchToolsHandler(request, h) {
    this._validator.validateToolsQueryParam(request.query);
    const { toolsName } = request.query;
    const tools = await this._toolsService.searchToolsByName(toolsName);
      return h.response({
        status: 'success',
        data: {
        tools,
      },
    });
  }
}
module.exports = ToolsHandler;
