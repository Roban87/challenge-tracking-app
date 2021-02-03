import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { registerService } from '../register.service';
import { usersRepo } from '../../repositories/users.repository';

describe('validateUsernameAndPassword tests', () => {
  test('missing username', () => {
    let thrownError;
    try {
      registerService.validateUsernameAndPassword(undefined, 'password', 'email');
    } catch (err) {
      thrownError = err;
    }
    expect(thrownError).toEqual({
      status: 400,
      message: 'Missing username, email and/or password',
    });
  });
  test('missing password', () => {
    let thrownError;
    try {
      registerService.validateUsernameAndPassword('username', undefined, 'email');
    } catch (err) {
      thrownError = err;
    }
    expect(thrownError).toEqual({
      status: 400,
      message: 'Missing username, email and/or password',
    });
  });
  test('missing email', () => {
    let thrownError;
    try {
      registerService.validateUsernameAndPassword('username', 'password', undefined);
    } catch (err) {
      thrownError = err;
    }
    expect(thrownError).toEqual({
      status: 400,
      message: 'Missing username, email and/or password',
    });
  });
});

describe('hashUserPassword test', () => {
  test('returns hashed password', async () => {
    const hashedPassword = await registerService.hashUserPassword('password');
    expect(bcrypt.compareSync('password', hashedPassword)).toEqual(true);
  });
});

describe('insertNewUser tests', () => {
  test('new user object returned', async () => {
    const testToken = jwt.sign({ id: 1 }, 'somesecret');
    registerService.validateUsernameAndPassword = jest.fn(() => null);
    registerService.hashUserPassword = jest.fn(() => null);
    registerService.sendVerificationEmail = jest.fn(() => null);
    usersRepo.insertUser = jest.fn(() => ({
      results: {
        insertId: 1,
      },
    }));
    const result = await registerService.insertNewUser('username', 'password', 'email');
    expect(result).toEqual({
      userId: 1,
      token: testToken,
    });
  });
});
