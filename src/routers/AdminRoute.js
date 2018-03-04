import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';

export const AdminRoute = ({
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
  isAdmin: state.user.isAdmin
});

export default connect(mapStateToProps)(AdminRoute);
