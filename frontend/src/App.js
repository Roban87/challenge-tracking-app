import React, { useEffect } from 'react';
import {
  BrowserRouter as
  Router,
  Switch,
  Route,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Challenge from './pages/Challenge';
import AdminPage from './pages/AdminPage';
import Statistics from './pages/Statistics';
import './App.css';
import { getChallenge } from './redux/challenge/challenge.action';
import FinalStatistics from './pages/FinalStatistics';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getChallenge());
  }, [dispatch]);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route path="/challenge" component={Challenge} />
          <Route exact path="/admin" component={AdminPage} />
          <Route exact path="/stats" component={Statistics} />
          <Route exact path="/finalstats" component={FinalStatistics} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
