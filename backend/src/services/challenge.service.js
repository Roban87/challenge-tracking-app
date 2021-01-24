import moment from 'moment';
import { challengeRepo } from '../repositories';

export const challengeService = {
  async getChallenge() {
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
      startDate: moment(challenge.start_date).format('YYYY-MM-DD'),
      endDate: moment(challenge.end_date).format('YYYY-MM-DD'),
      minCommit: challenge.min_commitments,
    };
  },

  async postChallenge(challengeDetails) {
    return await challengeRepo.postChallenge(challengeDetails);
  },

  async putChallenge(challengeDetails) {
    return await challengeRepo.putChallenge(challengeDetails);
  },
};
