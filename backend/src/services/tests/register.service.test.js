import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { registerService } from '../register.service';
import { usersRepo } from '../../repositories/users.repository';
import { emailService } from '../emailService';

beforeEach(() => {
  jest.restoreAllMocks();
});

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
    const userValidateSpy = jest.spyOn(registerService, 'validateUsernameAndPassword').mockReturnValue(null);
    jest.spyOn(registerService, 'hashUserPassword').mockReturnValue(null);
    jest.spyOn(registerService, 'sendVerificationEmail').mockReturnValue('hello');
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
    expect(userValidateSpy).toBeCalled();
    expect(usersRepo.insertUser).toBeCalled();
  });
});

describe('sendVerificationEmail tests', () => {
  test('email is being sent', async () => {
    const sendEmailSpy = jest.spyOn(emailService, 'sendEmail').mockReturnValue(null);
    const repoSpy = jest.spyOn(usersRepo, 'getUserByEmail').mockReturnValue({
      results: [{ id: 1 }],
    });
    await registerService.sendVerificationEmail('kisborg', 'email');
    expect(sendEmailSpy).toBeCalled();
    expect(repoSpy).toBeCalled();
  });
});

describe('verifyUserValidation tests', () => {
  test('no user id throws error', async () => {
    let thrownError;
    try {
      await registerService.verifyUserValidation(undefined);
    } catch (err) {
      thrownError = err;
    }
    expect(thrownError).toEqual({
      status: 403,
      message: 'We were unable to find a user for this verification. Please register!',
    });
  });
  test('bad user id', async () => {
    jest.spyOn(usersRepo, 'getUserById').mockReturnValue({ results: [] });
    let thrownError;
    try {
      await registerService.verifyUserValidation(1);
    } catch (err) {
      thrownError = err;
    }
    expect(thrownError).toEqual({
      status: 403,
      message: 'We were unable to find a user for this verification. Please register!',
    });
  });
  test('user already validated', async () => {
    jest.spyOn(usersRepo, 'getUserById').mockReturnValue({ results: [{ is_validated: 1 }] });
    let thrownError;
    try {
      await registerService.verifyUserValidation(1);
    } catch (err) {
      thrownError = err;
    }
    expect(thrownError).toEqual({
      status: 200,
      message: 'User has been already verified. Please Log In!',
    });
  });
});

describe('getVerificationEmail tests', () => {
  test('no user found throws error', async () => {
    jest.spyOn(usersRepo, 'getUserByEmail').mockReturnValue({ results: [] });
    let thrownError;
    try {
      await registerService.getVerificationEmail(1);
    } catch (err) {
      thrownError = err;
    }
    expect(thrownError).toEqual({
      status: 403,
      message: 'You haven\'t registered with this email address. Please register!',
    });
  });
  test('send verification email if user found', async () => {
    jest.spyOn(usersRepo, 'getUserByEmail').mockReturnValue({ results: [{ username: 'user' }] });
    jest.spyOn(registerService, 'sendVerificationEmail').mockReturnValue(null);
    await registerService.getVerificationEmail('email');

    expect(registerService.sendVerificationEmail).toBeCalledWith('user', 'email');
  });
});
