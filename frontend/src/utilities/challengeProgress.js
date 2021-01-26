import { store } from '../redux/store';

export default function defineChallengeProgress() {
  const state = store.getState();
  const { startDate, endDate } = state.challenge;

  const challengeStartTimestamp = new Date(startDate).getTime();
  const challengeEndTimestamp = new Date(endDate).getTime();
  const currentTimestamp = Date.now();

  if (currentTimestamp < challengeStartTimestamp) {
    return 'startSoon';
  }
  if (currentTimestamp < challengeEndTimestamp) {
    return 'started';
  }
  if (currentTimestamp > challengeEndTimestamp) {
    return 'ended';
  }
  return null;
}
