import { commitmentsService } from '../services';

export const commitmentsController = {
  async getAll(req, res, next) {
    const commitments = await commitmentsService.getCommitments();
    try {
      res.status(200).json(commitments);
    } catch (err) {
      next(err);
    }
  },
  async post(req, res, next) {
    const { name, startDate, endDate } = req.body;
    console.log(startDate, endDate);
    const userId = req.user.id;
    try {
      const newCommitment = await commitmentsService.addCommitment({
        name, startDate, endDate, userId,
      });
      res.status(200).json(newCommitment);
    } catch (err) {
      next(err);
    }
  },
  async delete(req, res, next) {
    const { id } = req.body;
    const userId = req.user.id;
    try {
      const responseObj = await commitmentsService.removeCommitment(id, userId);
      res.status(200).json(responseObj);
    } catch (err) {
      next(err);
    }
  },
  async deleteGroup(req, res, next) {
    const { commitmentName } = req.params;
    const userId = req.user.id;
    try {
      const responseObj = await commitmentsService.removeCommitmentGroup(commitmentName, userId);
      res.status(200).json(responseObj);
    } catch (err) {
      next(err);
    }
  },
  async put(req, res, next) {
    const {
      name,
      startDate,
      id,
      endDate,
      isDone,
    } = req.body;
    const userId = req.user.id;
    try {
      const updatedCommitment = await commitmentsService.updateCommitment({
        name, startDate, endDate, id, isDone, userId,
      });
      res.status(200).json(updatedCommitment);
    } catch (err) {
      next(err);
    }
  },
};
