import { challengeRepo } from '../../repositories';
import { challengeService } from '../challenge.service';

describe('getChallenge tests', () => {
  test('getChallene returns error if no challenge is available', async () => {
    challengeRepo.getChallenge = jest.fn(() => null);
    let thrownError = {};
    try {
      await challengeService.getChallenge();
    } catch (err) {
      thrownError = err;
    }
    expect(thrownError.message).toEqual('No challenge available');
    expect(thrownError.status).toEqual(404);
  });
  test('getChallenge returns challenge object if challenge exists', async () => {
    challengeRepo.getChallenge = jest.fn(() => ({
      title: 'Test',
      description: 'test challenge',
      start_date: new Date('2020-01-02'),
      end_date: new Date('2020-01-03'),
      min_commitments: 8,
    }));
    const challenge = await challengeService.getChallenge();
    expect(challenge).toEqual({
      title: 'Test',
      description: 'test challenge',
      startDate: '2020-01-02',
      endDate: '2020-01-03',
      minCommit: 8,
    });
  });
});

describe('postChallenge tests', () => {
  test('postCHallenge returns new challenge object', async () => {
    let fakeChallenge = {};
    challengeRepo.postChallenge = jest.fn((challengeDetails) => {
      fakeChallenge = challengeDetails;
      return fakeChallenge;
    });
    challengeService.getChallenge = jest.fn(() => fakeChallenge);
    const challenge = await challengeService.postChallenge({
      title: 'Test',
      description: 'test challenge',
      startDate: '2020-01-02',
      endDate: '2020-01-03',
      minCommit: 8,
    });
    expect(challenge).toEqual({
      title: 'Test',
      description: 'test challenge',
      startDate: '2020-01-02',
      endDate: '2020-01-03',
      minCommit: 8,
    });
  });
});

describe('putChallenge tests', () => {
  test('postCHallenge returns new challenge object', async () => {
    let fakeChallenge = {};
    challengeRepo.putChallenge = jest.fn((challengeDetails) => {
      fakeChallenge = challengeDetails;
      return fakeChallenge;
    });
    challengeService.getChallenge = jest.fn(() => fakeChallenge);
    const challenge = await challengeService.putChallenge({
      title: 'Test',
      description: 'test challenge',
      startDate: '2020-01-02',
      endDate: '2020-01-03',
      minCommit: 8,
    });
    expect(challenge).toEqual({
      title: 'Test',
      description: 'test challenge',
      startDate: '2020-01-02',
      endDate: '2020-01-03',
      minCommit: 8,
    });
  });
});
