import { usersRepo } from '../repositories';

export const usersService = {
  async getUsers() {
    return await usersRepo.getUsers();
  },
};
