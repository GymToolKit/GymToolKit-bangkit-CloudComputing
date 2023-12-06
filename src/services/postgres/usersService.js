const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const InvariantError = require('../../exception/InvariantError');
const NotFoundError = require('../../exception/notFoundError');
const AuthenticationError = require('../../exception/authenticationError');

class UsersService {
    constructor() {
        this._pool = new Pool();
    }
    async addUser({ username, email, password }) {
        await this.verifyNewUsername(username);
        await this.verifyNewEmail(email);
    
        const id = `user-${nanoid(16)}`;
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = {
          text: 'INSERT INTO users VALUES($1, $2, $3, $4) RETURNING id',
          values: [id, username, email, hashedPassword],
        };
    
    const result = await this._pool.query(query);
    
        if (!result.rows.length) {
          throw new InvariantError('User gagal ditambahkan');
        }

        return result.rows[0].id;
    }
    async verifyNewUsername(username) {
        const query = {
          text: 'SELECT username FROM users WHERE username = $1',
          values: [username],
        };
    
        const result = await this._pool.query(query);
    
        if (result.rows.length > 0) {
          throw new InvariantError('Gagal menambahkan user. Username sudah digunakan.');
        }
    }
    async verifyNewEmail(email) {
      const query = {
        text: 'SELECT email FROM users WHERE email = $1',
        values: [email],
      };
  
      const result = await this._pool.query(query);
  
      if (result.rows.length > 0) {
        throw new InvariantError('Gagal menambahkan email. email sudah digunakan.');
      }
    }
    async getUserById(userId) {
        const query = {
          text: 'SELECT id, username, email FROM users WHERE id = $1',
          values: [userId],
        };
    
        const result = await this._pool.query(query);
    
        if (!result.rows.length) {
          throw new NotFoundError('User tidak ditemukan');
        }
    
        return result.rows[0];
    }  
    async verifyUserCredential(username, password) {
        const query = {
          text: 'SELECT id, password FROM users WHERE username = $1',
          values: [username],
        };
        const result = await this._pool.query(query);
    
        if (!result.rows.length) {
          throw new AuthenticationError('Kredensial yang Anda berikan salah');
        }
    
        const { id, password: hashedPassword } = result.rows[0];
    
        const match = await bcrypt.compare(password, hashedPassword);
    
        if (!match) {
          throw new AuthenticationError('Kredensial yang Anda berikan salah');
        }
        return id;
    }
}
module.exports = UsersService;