const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');
const InvariantError = require('../../exception/InvariantError');
const NotFoundError = require('../../exception/notFoundError');
const AuthenticationError = require('../../exception/authenticationError');
const database = require('../../config/database');

class UsersService {
    constructor() {
        this._pool = database;
    }
    async addUser({ username, email, password }) {
      const isUsernameValid = await this.verifyNewUsername(username);
      const isEmailValid = await this.verifyNewEmail(email);

      if (isUsernameValid) {
        throw new InvariantError('Error, Username sudah digunakan.');
      }
      if (isEmailValid) {
        throw new InvariantError('Error, Email sudah digunakan.');
      }
    
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
    async editUserById(id, { username, email}) {
      const isUsernameValid = await this.verifyNewUsername(username);
      const isEmailValid = await this.verifyNewEmail(email);

      if (isUsernameValid && isEmailValid) {
        throw new InvariantError('Gagal melakukan update, Tidak Ada Perubahan Data');
      }
    
      const query = {
        text: 'UPDATE users SET username=$1, email=$2 WHERE id=$3 RETURNING id',
        values: [username, email, id],
      };
    
      const result = await this._pool.query(query);
    
      if (!result.rows.length) {
        throw new NotFoundError('Gagal Melakukan Update');
      }
    }
    async deleteUsersById(id) {
      const query = {
        text: 'DELETE FROM users WHERE id = $1 RETURNING id',
        values: [id],
      };
  
      const result = await this._pool.query(query);
  
      if (!result.rows.length) {
        throw new NotFoundError('User not found');
      }
    }
    async verifyNewUsername(username) {
      const query = {
        text: 'SELECT username FROM users WHERE username = $1',
        values: [username],
      };
  
      const result = await this._pool.query(query);
  
      if (result.rows.length > 0) {
        return true;
      }
    }
    async verifyNewEmail(email) {
    const query = {
      text: 'SELECT email FROM users WHERE email = $1',
      values: [email],
    };

    const result = await this._pool.query(query);

    if (result.rows.length > 0) {
      return true;
    }
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