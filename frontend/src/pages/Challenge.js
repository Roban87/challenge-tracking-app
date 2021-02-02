import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Menu from '../components/Menu/Menu';
import Counter from '../components/Counter/Counter';
import Statistics from './Statistics';
import FinalStatistics from './FinalStatistics';
import MessageBoard from '../components/MessageBoard/MessageBoard';
import { fetchCommitmentsAsync } from '../redux/commitments/commitments.actions';
import ChallengeOverview from '../components/ChallengeOverview/ChallengeOverview';
import '../styles/Challenge.css';

function Challenge() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCommitmentsAsync());
  }, [dispatch]);

  return (
    <div className="challenge-container">
      <Menu />

      <main>
        <Counter />
        <section className="content-container">
          <Switch>
            <Route exact path={['/challenge', '/challenge/commitments']} component={ChallengeOverview} />
            <Route exact path="/challenge/statistics" component={Statistics} />
            <Route exact path="/challenge/final-statistics" component={FinalStatistics} />
          </Switch>
        </section>
      </main>

      <MessageBoard />

    </div>
  );
}

export default Challenge;
