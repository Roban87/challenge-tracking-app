import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Menu from '../components/Menu/Menu';
import Counter from '../components/Counter/Counter';
import Statistics from './Statistics';
import FinalStatistics from './FinalStatistics';
import MessageBoard from '../components/MessageBoard/MessageBoard';
import { fetchCommitmentsAsync } from '../redux/commitments/commitments.actions';
import ChallengeOverview from '../components/challenge-overview/challenge-overview.component';
import '../styles/Challenge.css';

function Challenge() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCommitmentsAsync());
  }, [dispatch]);

  return (
    <div className="challenge-container">
      <nav>
        <Menu />
      </nav>

      <main>
        <div className="middle-content">
          <Counter />
          <div className="content-container" >
            <Switch>
              <Route exact path={["/challenge", "/challenge/commitments"]} component={ChallengeOverview} />
              <Route exact path="/challenge/statistics" component={Statistics}/>
              <Route exact path="/challenge/final-statistics" component={FinalStatistics}/>
            </Switch>
          </div>
        </div>
        
        < MessageBoard />
      </main>
    </div>
  );
}

export default Challenge;