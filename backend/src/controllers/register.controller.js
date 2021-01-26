import { registerService } from '../services';

export const registerController = {
  async post(req, res, next) {
    const { username, password, email } = req.body;
    try {
      const token = await registerService.insertNewUser(username, password, email);
      res.status(200).json(token);
    } catch (err) {
      next(err);
    }
  },
  async verifyUser(req, res, next) {
    try {
      const userId = req.verify.id;
      await registerService.verifyUser(userId);
      res.status(200).json({ message: 'Your account has been successfully verified' });
    } catch (error) {
      next(error);
    }
  },
  async getVerificationEmail(req, res, next) {
    try {
      const { email } = req.params;
      await registerService.getVerificationEmail(email);
      res.status(200).json({ message: 'New verification email has been sent to your Email address' });
    } catch (error) {
      next(error);
    }
  },
};
