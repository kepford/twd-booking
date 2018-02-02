import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import isAdmin from '../utilities/isAdmin';
import Header from '../components/Header';

export const AdminRoute = ({
  isAuthenticated,
  isAdmin,
  component: Component,
  ...rest
}) => (
  <Route {...rest} component={(props) => (
    isAdmin ? (
      <div>
        <Header />
        <Component {...props} />
      </div>
    ) : (
      <Redirect to="/" />
    )
  )} />
);

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.uid,
  isAdmin: isAdmin()
});

export default connect(mapStateToProps)(AdminRoute);
