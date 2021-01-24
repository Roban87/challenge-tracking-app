import { db } from '../data/connection';

export const challengeRepo = {
  async getChallenge() {
    try {
      const sqlQuery = 'SELECT * FROM challenge ORDER BY id DESC LIMIT 1';
      const challengeQueryData = await db.query(sqlQuery);
      return challengeQueryData.results[0];
    } catch (err) {
      throw {
        status: 500,
        message: err.sqlMessage,
      };
    }
  },

  async postChallenge(challengeDetails) {
    const {
      challengeName,
      challengeDescription,
      startDate,
      endDate,
      minCommit,
    } = challengeDetails;
    try {
      const sqlQuery = 'INSERT INTO challenge (title, description, start_date, end_date, min_commitments) VALUES(?, ?, ?, ?, ?)';
      await db.query(sqlQuery, [
        challengeName,
        challengeDescription,
        startDate,
        endDate,
        minCommit,
      ]);
      const responseSqlQuery = 'SELECT * FROM challenge ORDER BY id DESC LIMIT 1';
      const challengeQueryData = await db.query(responseSqlQuery);
      return challengeQueryData;
    } catch (err) {
      throw {
        status: 500,
        message: err.sqlMessage,
      };
    }
  },
  async putChallenge(challengeDetails) {
    const {
      challengeName,
      challengeDescription,
      startDate,
      endDate,
      minCommit,
    } = challengeDetails;
    try {
      const sqlQuery = 'UPDATE challenge SET title=?, description=?, start_date=?, end_date=?, min_commitments=?';
      await db.query(sqlQuery, [
        challengeName,
        challengeDescription,
        startDate,
        endDate,
        minCommit,
      ]);
      const responseSqlQuery = 'SELECT * FROM challenge ORDER BY id DESC LIMIT 1';
      const challengeQueryData = await db.query(responseSqlQuery);
      return challengeQueryData.results[0];
    } catch (err) {
      throw {
        status: 500,
        message: err.sqlMessage,
      };
    }
  },
};
