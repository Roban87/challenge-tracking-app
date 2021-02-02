import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
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

  function setActive() {
    const navigation = document.querySelector('.nav-btns');
    navigation.classList.toggle('active');
  }
  function setNotActive() {
    const navigation = document.querySelector('.nav-btns');
    navigation.classList.remove('active');
  }

  return (
    <nav>
      <img src={logo} alt="accepted logo" />

      <button type="button" className="dropdown" onClick={setActive}>
        <span />
        <span />
        <span />
      </button>

      <div className="nav-btns">
        <div className="commitments-btn btn">
          <NavLink to="/challenge/commitments" onClick={setNotActive}>Commitments</NavLink>
        </div>

        <div className="statistics-btn btn">
          <NavLink to="/challenge/statistics" onClick={setNotActive}>Statistics</NavLink>
        </div>
        <div className="final-statistics-btn btn">
          <NavLink to="/challenge/final-statistics" onClick={setNotActive}>Final Results</NavLink>
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
        <div className="logout-btn btn">
          <a href="/" onClick={() => logOut()}>Logout</a>
        </div>
      </div>

    </nav>
  );
}

export default Menu;
