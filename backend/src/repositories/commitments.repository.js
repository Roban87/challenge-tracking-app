/* eslint-disable max-len */
import { db } from '../data/connection';
import { challengeRepo } from './challenge.repository';

export const commitmentsRepo = {
  async getCommitments() {
    const challengeQuery = await challengeRepo.getChallenge();
    const challengeId = challengeQuery.id;
    const sqlQuery = 'SELECT * FROM commitments WHERE challenge_id = ?';
    try {
      const queryData = await db.query(sqlQuery, challengeId);
      return queryData.results;
    } catch (err) {
      throw {
        status: 500,
        message: err.sqlMessage,
      };
    }
  },
  async addCommitment(commitment) {
    const {
      userId,
      name,
      startDate,
      endDate,
    } = commitment;
    const challengeQuery = await challengeRepo.getChallenge();
    const challengeId = challengeQuery.id;
    const sqlQuery = 'INSERT INTO commitments (name, start_date, end_date, user_id, challenge_id) VALUES (?,?,?,?,?)';
    try {
      return await db.query(sqlQuery, [name, startDate, endDate, userId, challengeId]);
    } catch (err) {
      throw {
        status: 500,
        message: err.sqlMessage,
      };
    }
  },
  async getCommitment(id) {
    const sqlQuery = 'SELECT * FROM commitments WHERE id = ?';
    try {
      const queryData = await db.query(sqlQuery, id);
      return queryData.results[0];
    } catch (err) {
      throw {
        status: 500,
        message: err.sqlMessage,
      };
    }
  },
  async removeCommitment(id, userId) {
    const sqlQuery = 'DELETE FROM commitments WHERE id = ? AND user_id = ?';
    try {
      return await db.query(sqlQuery, [id, userId]);
    } catch (err) {
      throw {
        status: 500,
        message: err.sqlMessage,
      };
    }
  },
  async removeCommitmentGroup(commitmentName, userId) {
    const sqlQuery = 'DELETE FROM commitments WHERE name = ? AND user_id = ?';
    try {
      return await db.query(sqlQuery, [commitmentName, userId]);
    } catch (err) {
      throw {
        status: 500,
        message: err.sqlMessage,
      };
    }
  },
  async updateCommitment(commitment) {
    const {
      startDate,
      endDate,
      name,
      isDone,
      id,
      userId,
    } = commitment;
    const sqlQuery = 'UPDATE commitments SET name = ?, start_date = ?, end_date = ?, is_done = ? WHERE id = ? AND user_id = ?';
    try {
      return await db.query(sqlQuery, [
        name,
        startDate,
        endDate,
        isDone,
        id,
        userId,
      ]);
    } catch (err) {
      throw {
        status: 500,
        message: err.sqlMessage,
      };
    }
  },
};
