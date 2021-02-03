import { commitmentsRepo } from '../../repositories';
import { commitmentsService } from '../commitments.service';

const database = [
  {
    id: 1,
    name: 'test1',
    start_date: new Date('2020-01-01'),
    end_date: new Date('2020-01-03'),
    user_id: 1,
    challenge_id: 1,
    is_done: 1,
  },
  {
    id: 2,
    name: 'test1',
    start_date: new Date('2020-01-04'),
    end_date: new Date('2020-01-06'),
    user_id: 1,
    challenge_id: 1,
    is_done: 0,
  },
  {
    id: 3,
    name: 'test2',
    start_date: new Date('2020-01-01'),
    end_date: new Date('2020-01-03'),
    user_id: 1,
    challenge_id: 1,
    is_done: 0,
  },
  {
    id: 4,
    name: 'test3',
    start_date: new Date('2020-01-01'),
    end_date: new Date('2020-01-03'),
    user_id: 2,
    challenge_id: 1,
    is_done: 0,
  },
  {
    id: 5,
    name: 'test3',
    start_date: new Date('2020-01-04'),
    end_date: new Date('2020-01-06'),
    user_id: 2,
    challenge_id: 1,
    is_done: 0,
  },
];

describe('getCommitments tests', () => {
  test('throws error when no commitments available', async () => {
    commitmentsRepo.getCommitments = jest.fn(() => []);
    let thrownError;
    try {
      await commitmentsService.getCommitments();
    } catch (err) {
      thrownError = err;
    }
    expect(thrownError).toEqual({
      message: 'No commitments available',
      status: 404,
    });
  });
  test('getCommitments returns array of commitments', async () => {
    const formattedCommitments = database.map((commitment) => (
      commitmentsService.formatCommitment(commitment)
    ));
    commitmentsRepo.getCommitments = jest.fn(() => database);
    const result = await commitmentsService.getCommitments();
    expect(result).toEqual(formattedCommitments);
  });
});

describe('addCommitment tests', () => {
  test('adding commitment returns the added commitment', async () => {
    commitmentsRepo.addCommitment = jest.fn(() => ({
      results: {
        insertId: 1,
      },
    }));
    commitmentsRepo.getCommitment = jest.fn((id) => {
      const commitment = database.find((commit) => commit.id === id);
      return commitment;
    });
    const addedCommitment = commitmentsService.formatCommitment({
      id: 1,
      name: 'test1',
      start_date: new Date('2020-01-01'),
      end_date: new Date('2020-01-03'),
      user_id: 1,
      challenge_id: 1,
      is_done: 1,
    });
    const result = await commitmentsService.addCommitment('somedata');
    expect(result).toEqual(addedCommitment);
  });
});

describe('removeCommitment tests', () => {
  test('returns message object after successfully removeing commitment', async () => {
    commitmentsRepo.removeCommitment = jest.fn(() => null);
    const result = await commitmentsService.removeCommitment('some', 'data');
    expect(commitmentsRepo.removeCommitment).toHaveBeenCalled();
    expect(result).toEqual({ message: 'Commitment removed' });
  });
});

describe('removeCommitmentGroup tests', () => {
  test('returns message object after successfully removeing commitment group', async () => {
    commitmentsRepo.removeCommitmentGroup = jest.fn(() => null);
    const result = await commitmentsService.removeCommitmentGroup('some', 'data');
    expect(commitmentsRepo.removeCommitmentGroup).toHaveBeenCalled();
    expect(result).toEqual({ message: 'Commitments removed' });
  });
});

describe('updateCommitment tests', () => {
  test('returns updated commitment as object', async () => {
    commitmentsRepo.updateCommitment = jest.fn(() => null);
    commitmentsRepo.getCommitment = jest.fn((id) => database.find((commit) => commit.id === id));
    const result = await commitmentsService.updateCommitment({ id: 1 });
    expect(result).toEqual(commitmentsService.formatCommitment({
      id: 1,
      name: 'test1',
      start_date: new Date('2020-01-01'),
      end_date: new Date('2020-01-03'),
      user_id: 1,
      challenge_id: 1,
      is_done: 1,
    }));
  });
});
