import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';
import isAdmin from '../utilities/isAdmin';

export const Header = ({ startLogout }) => (
  <header className="header">
    <div className="content-container">
      <div className="header__content">
        <Link className="header__title" to="/dashboard">
          <h1>TheWeeklyDrop</h1>
        </Link>
        <button className="button button--link" onClick={startLogout}>Logout</button>
      </div>
    </div>
    {
      isAdmin() ?
        <div>
          <Link to="/create/sponsorship" >
            <button className="button button--link">
              Add Sponsorship
            </button>
          </Link>
          <Link to="/create/client" >
            <button className="button button--link">
              Add Client
            </button>
          </Link>
          <Link to="/clients" >
            <button className="button button--link">
              Clients
            </button>
          </Link>
        </div>
        :
        <Link to="/dashboard" >
          <button className="button button--link">
            Dashboard
          </button>
        </Link>
    }
  </header>
);

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);
