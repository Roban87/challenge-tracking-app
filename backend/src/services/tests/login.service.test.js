import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { loginService } from '../login.service';
import { usersRepo } from '../../repositories/users.repository';

let testPassword;
beforeAll(async () => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash('password', saltRounds);
  testPassword = hashedPassword;
});

describe('validateUser tests', () => {
  test('missing password', () => {
    const result = loginService.validateUser('user', undefined);
    expect(result).toEqual({ message: 'Password is required', status: 400 });
  });
  test('missing username', () => {
    const result = loginService.validateUser(undefined, 'password');
    expect(result).toEqual({ message: 'Username is required', status: 400 });
  });
  test('missing password', () => {
    const result = loginService.validateUser(undefined, undefined);
    expect(result).toEqual({ message: 'All fields required', status: 400 });
  });
  test('user and password provided', () => {
    const result = loginService.validateUser('user', 'password');
    expect(result).toEqual(false);
  });
});

describe('getToken test', () => {
  const testToken = jwt.sign({ id: 1 }, 'somesecret');
  test('returns token when ID is provided', async () => {
    const token = await loginService.getToken(1);
    expect(token).toEqual(testToken);
  });
});

describe('loginUser tests', () => {
  test('throws error when validation fails', async () => {
    let thrownError;
    try {
      await loginService.loginUser('user', undefined);
    } catch (err) {
      thrownError = err;
    }
    expect(thrownError).toEqual({ message: 'Password is required', status: 400 });
  });
  test('no user found', async () => {
    usersRepo.getUser = jest.fn(() => ({ results: [] }));
    let thrownError;
    try {
      await loginService.loginUser('username', 'password');
    } catch (err) {
      thrownError = err;
    }
    expect(thrownError).toEqual({ message: 'Username or password is incorrect', status: 400 });
  });
  test('bad password', async () => {
    usersRepo.getUser = jest.fn(() => ({ results: [{ password: 'badpassword' }] }));
    let thrownError;
    try {
      await loginService.loginUser('username', 'badpassword');
    } catch (err) {
      thrownError = err;
    }
    expect(thrownError).toEqual({ message: 'Username or password is incorrect', status: 400 });
  });
  test('good signin', async () => {
    const testToken = jwt.sign({ id: 1 }, 'somesecret');
    usersRepo.getUser = jest.fn(() => ({
      results: [{
        password: testPassword,
        id: 1,
        username: 'username',
        is_admin: 0,
        is_validated: 0,
      }],
    }));
    const result = await loginService.loginUser('username', 'password');
    expect(result).toEqual({
      userId: 1,
      username: 'username',
      isAdmin: 0,
      isValidated: 0,
      token: testToken,
    });
  });
});
