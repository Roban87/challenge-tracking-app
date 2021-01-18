import { challengeRepo } from '../repositories';

export const challengeService = {
  getChallenge: async () => {
    const challenge = await challengeRepo.getChallenge();
    if (!challenge) {
      throw {
        status: 404,
        message: 'No challenge available',
      };
    }
    const { title, description } = challenge;
    return {
      title,
      description,
      startDate: challenge.start_date,
      endDate: challenge.end_date,
    };
  },
};
