import React, { useEffect } from 'react';
import {
  BrowserRouter as 
  Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Challenge from './pages/Challenge';
import AdminPage from './pages/AdminPage';
import Statistics from './pages/Statistics';
import './App.css';
import { getChallenge } from './redux/challenge/challenge.action';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getChallenge());
  }, [dispatch]);
 
  const token = useSelector(state => state.session.token);
  return (
    <Router>
    <div className="App">
      <Switch>
        <Route exact path="/">
            {token ? <Redirect to="/challenge" /> : <Landing />}
        </Route>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route path="/challenge" component={Challenge} />
        <Route exact path="/admin" component={AdminPage}/>
        <Route exact path="/stats" component={Statistics}/>
        <Route exact path="/">
            {tokenExists() ? <Redirect to="/challenge" /> : <Redirect to="/" />}
        </Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
