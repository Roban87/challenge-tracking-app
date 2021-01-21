import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { usersRepo } from '../repositories';
import config from '../config';

export const loginService = {
  validateUser(username, password) {
    if (!password) {
      return !username ? { message: 'All fields required', status: 400 } : { message: 'Password is required', status: 400 };
    }
    if (!username) {
      return { message: 'Username is required', status: 400 };
    }
    return false;
  },

  async getToken(id) {
    const token = jwt.sign({ id }, config.secret || 'somesecret');
    return token;
  },
  async loginUser(username, password) {
    const inputError = this.validateUser(username, password);
    if (inputError) {
      throw inputError;
    }
    const userData = await usersRepo.getUser(username);
    if (userData.results.length === 0
      || !bcrypt.compareSync(password, userData.results[0].password)) {
      throw { message: 'Username or password is incorrect', status: 400 };
    }
    const token = await this.getToken(userData.results[0].id);
    return {
      token,
      userId: userData.results[0].id,
      username: userData.results[0].username,
      isAdmin: userData.results[0].is_admin,
      isValidated: userData.results[0].is_validated,
    };
  },
};
