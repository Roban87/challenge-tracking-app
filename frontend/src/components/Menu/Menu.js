import React from 'react';
import {
  useSelector,
  useDispatch,
} from 'react-redux';
import { NavLink } from 'react-router-dom';
import './Menu.css';
import logo from '../../assets/accepted-logo.svg';
import { sessionLogout } from '../../redux/session/session.actions';

function Menu() {
  const dispatch = useDispatch();
  const isAdmin = useSelector((state) => state.user.isAdmin);

  function logOut() {
    dispatch(sessionLogout());
  }

  return (
    <div className="menu">
      <img src={logo} alt="accepted logo" className="logo" />

      <div className="nav-btns">
        <div className="commitments-btn btn">
          <NavLink to="/challenge/commitments">Commitments</NavLink>
        </div>

        <div className="statistics-btn btn">
          <NavLink to="/challenge/statistics">Statistics</NavLink>
        </div>
        <div className="final-statistics-btn btn">
          <NavLink to="/challenge/final-statistics">All Statistics</NavLink>
        </div>

        {
        isAdmin
          ? (
            <div className="setting-btn btn">
              <NavLink to="/admin">Settings</NavLink>
            </div>
          )
          : null
        }
      </div>

      <div className="logout-btn btn">
        <a href="/" onClick={() => logOut()}>Logout</a>
      </div>
    </div>
  );
}

export default Menu;
