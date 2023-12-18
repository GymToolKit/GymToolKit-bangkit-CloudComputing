const { nanoid } = require('nanoid');
const InvariantError = require('../../exception/InvariantError');
const NotFoundError = require('../../exception/NotFoundError');
const { mapDBToModelTools } = require('../../utils');
const database = require('../../config/database');

class ToolsService {
  constructor() {
    this._pool = database;
  }

  async addTools({ toolsName, videoUrl, headline, toolsStep }) {
    const id = `tools-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO tools VALUES($1, $2, $3, $4, $5) RETURNING id',
      values: [id, toolsName, videoUrl, headline, toolsStep],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Failed to add tool');
    }

    return mapDBToModelTools(result.rows[0]);
  }
  async getTools() {
    try {
      const query = 'SELECT * FROM tools';
      const result = await this._pool.query(query);
  
      if (!result.rows) {
        throw new NotFoundError('Tools Not Found.');
      }
  
      return result.rows.map(mapDBToModelTools);
    } catch (error) {
      console.error('Error fetching tools:', error.message);
      throw error;
    }
  }
  async getToolsById(id) {
    const query = {
      text: 'SELECT * FROM tools WHERE id=$1',
      values: [id],
    };
  
    const result = await this._pool.query(query);
  
    if (!result.rows.length) {
      throw new NotFoundError('Tools Not Found.');
    }
  
    return mapDBToModelTools(result.rows[0]); 
  }
  async editToolsById(id, { toolsName, videoUrl, headline, toolsStep }) {
    const query = {
      text: 'UPDATE tools SET tools_name=$1, video_url=$2, headline=$3, tools_step=$4 WHERE id=$5 RETURNING id',
      values: [toolsName, videoUrl, headline, toolsStep, id],
    };
  
    const result = await this._pool.query(query);
  
    if (!result.rows.length) {
      throw new NotFoundError('Gagal Edit Tools');
    }
  }
  async deleteToolsById(id) {
    const query = {
      text: 'DELETE FROM tools WHERE id=$1 RETURNING id',
      values: [id],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Tools gagal dihapus');
    }
  }
  async searchToolsByName(toolsName) {
    const query = {
      text: 'SELECT * FROM tools WHERE tools_name ILIKE $1',
      values: [`%${toolsName}%`],
    };
  
    const result = await this._pool.query(query);
  
    if (!result.rows.length) {
      throw new NotFoundError('Tools not found');
    }
  
    return result.rows.map(mapDBToModelTools);
  }  
}

module.exports = ToolsService;
