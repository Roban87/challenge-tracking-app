import { usersService } from '../services';

export const usersController = {
  async get(req, res, next) {
    try {
      const users = await usersService.getUsers();
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  },
};
