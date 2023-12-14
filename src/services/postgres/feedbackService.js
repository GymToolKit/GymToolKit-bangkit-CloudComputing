const { nanoid } = require('nanoid');
const InvariantError = require('../../exception/InvariantError');
const database = require('../../config/database');

class FeedbackService {
  constructor() {
    this._pool = database;
  }

  async addFeedback(userId, rating, comment) {
   const id = `feedback-${nanoid(16)}`;
   const query = {
     text: 'INSERT INTO feedback VALUES ($1, $2, $3, $4) RETURNING id',
     values: [id, userId, rating, comment],
   };

   const result = await this._pool.query(query);

   if (!result.rows[0].id) {
     throw new InvariantError('Failed to add feedback');
   }
  }
  async getAllFeedback() {
    const query = {
      text: 'SELECT * FROM feedback',
    };
  
    const result = await this._pool.query(query);
  
    if (result.rows.length === 0) {
      throw new NotFoundError('No feedback found.');
    }
  
    return result.rows;
  }
  async checkFeedbackStatus(userId) {
    const query = {
      text: 'SELECT id FROM feedback WHERE user_id = $1',
      values: [userId],
    };

    const existingFeedbackResult = await this._pool.query(query);

    if (existingFeedbackResult.rows.length > 0) {
      throw new InvariantError('User has already provided feedback');
    }
  }
}

module.exports = FeedbackService;
