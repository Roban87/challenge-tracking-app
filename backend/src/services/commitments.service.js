import dayjs from 'dayjs';
import { commitmentsRepo } from '../repositories';

export const commitmentsService = {
  formatCommitment(commitment) {
    return {
      id: commitment.id,
      name: commitment.name,
      userId: commitment.user_id,
      challengeId: commitment.challenge_id,
      startDate: dayjs(commitment.start_date).format('YYYY-MM-DD'),
      endDate: dayjs(commitment.end_date).format('YYYY-MM-DD'),
      isDone: Boolean(commitment.is_done),
    };
  },

  async getCommitments() {
    const commitments = await commitmentsRepo.getCommitments();
    if (commitments.length === 0) {
      throw {
        message: 'No commitments available',
        status: 404,
      };
    }
    const formattedCommitments = commitments.map((commitment) => (
      this.formatCommitment(commitment)
    ));
    return formattedCommitments;
  },

  async addCommitment(commitment) {
    const queryData = await commitmentsRepo.addCommitment(commitment);
    const newCommitment = await commitmentsRepo.getCommitment(queryData.results.insertId);
    return this.formatCommitment(newCommitment);
  },
  async removeCommitment(id, userId) {
    await commitmentsRepo.removeCommitment(id, userId);
    return {
      message: 'Commitment removed',
    };
  },
  async removeCommitmentGroup(commitmentName, userId) {
    await commitmentsRepo.removeCommitmentGroup(commitmentName, userId);
    return {
      message: 'Commitments removed',
    };
  },
  async updateCommitment(commitment) {
    await commitmentsRepo.updateCommitment(commitment);
    const updatedCommitment = await commitmentsRepo.getCommitment(commitment.id);
    return this.formatCommitment(updatedCommitment);
  },
};
