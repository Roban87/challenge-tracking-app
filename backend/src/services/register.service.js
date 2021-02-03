import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { usersRepo } from '../repositories';
import { loginService } from './login.service';
import config from '../config';
import { emailService } from './emailService';

export const registerService = {
  validateUsernameAndPassword(username, password, email) {
    if (!username || !password || !email) {
      throw {
        status: 400,
        message: 'Missing username, email and/or password',
      };
    }
    if (password.length < 8) {
      throw {
        status: 400,
        message: 'Password must be at least 8 characters',
      };
    }
  },
  async hashUserPassword(password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  },
  async insertNewUser(username, password, email, admin) {
    if (admin) {
      const hashedPassword = await this.hashUserPassword(password);
      return await usersRepo.insertAdmin(username, hashedPassword, email, 1);
    }
    this.validateUsernameAndPassword(username, password, email);
    const hashedPassword = await this.hashUserPassword(password);
    const userData = await usersRepo.insertUser(username, hashedPassword, email);
    await this.sendVerificationEmail(username, email);
    const token = await loginService.getToken(userData.results.insertId);
    return {
      token,
      userId: userData.results.insertId,
    };
  },

  async sendVerificationEmail(username, email) {
    const baseUrl = `${process.env.REACT_APP_FRONTEND}`;
    const getUserByEmail = await usersRepo.getUserByEmail(email);
    const userId = getUserByEmail.results[0].id;
    const date = new Date();
    const mailToken = {
      id: userId,
      created: date.toString(),
    };
    const tokenMailVerification = jwt.sign(mailToken, config.secret || 'someOtherSecret', { expiresIn: '540s' });
    await emailService.sendEmail({
      receiver: email, template: 'validation', username, link: `${baseUrl}/verification/:${userId}/:${tokenMailVerification}`,
    });
  },

  async verifyUserValidation(userId) {
    if (!userId) {
      throw { status: 403, message: 'We were unable to find a user for this verification. Please register!' };
    }
    const getUserById = await usersRepo.getUserById(userId);
    if (getUserById.results.length === 0) {
      throw { status: 403, message: 'We were unable to find a user for this verification. Please register!' };
    }
    const userStatus = getUserById.results[0].is_validated;
    if (userStatus) {
      throw { status: 200, message: 'User has been already verified. Please Log In!' };
    }
  },
  async verifyUser(userId) {
    this.verifyUserValidation(userId);
    await usersRepo.verifyUser(userId);
  },
  async getVerificationEmail(email) {
    const getUserByEmail = await usersRepo.getUserByEmail(email);
    if (getUserByEmail.results.length === 0) {
      throw { status: 403, message: 'You haven\'t registered with this email address. Please register!' };
    }
    const { username } = getUserByEmail.results[0];
    this.sendVerificationEmail(username, email);
  },
};
