import jwt from 'jsonwebtoken';
import config from '../config';

export default async (req, res, next) => {
  try {
    if (!req.headers.verification) {
      throw { status: 401, message: 'Your verification link may have expired. Please click on resend for verify your Email' };
    }
    const token = req.headers.verification.split(' ')[1];
    const verified = jwt.verify(token, config.secret, { algorithms: ['HS256'] });
    req.verify = verified;
    next();
  } catch (err) {
    next(err);
  }
};
