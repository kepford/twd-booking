import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import AddClientPage from '../components/AddClientPage';
import AddSponsorshipPage from '../components/AddSponsorshipPage';
import EditClientPage from '../components/EditClientPage';
import ClientListPage from '../components/ClientListPage';
import DashboardPage from '../components/DashboardPage';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path="/" component={LoginPage} exact={true} />
        <PrivateRoute path="/dashboard" component={DashboardPage} />
        <PrivateRoute path="/clients" component={ClientListPage} />
        <PrivateRoute path="/create/client" component={AddClientPage} />
        <PrivateRoute path="/edit/client/:id" component={EditClientPage} />
        <PrivateRoute path="/create/sponsorship" component={AddSponsorshipPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
