import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import AddClientPage from '../components/AddClientPage';
import AddUserPage from '../components/AddUserPage';
import AddSponsorshipPage from '../components/AddSponsorshipPage';
import EditClientPage from '../components/EditClientPage';
import EditSponsorshipPage from '../components/EditSponsorshipPage';
import EditUserPage from '../components/EditUserPage';
import ClientListPage from '../components/ClientListPage';
import UserListPage from '../components/UserListPage';
import DashboardPage from '../components/DashboardPage';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';
import PublicRoute from './PublicRoute';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path="/" component={LoginPage} exact={true} />
        <PrivateRoute path="/dashboard" component={DashboardPage} />
        <AdminRoute path="/clients" component={ClientListPage} />
        <AdminRoute path="/create/client" component={AddClientPage} />
        <AdminRoute path="/edit/client/:id" component={EditClientPage} />
        <AdminRoute path="/create/user" component={AddUserPage} />
        <AdminRoute path="/edit/user/:id" component={EditUserPage} />
        <AdminRoute path="/users" component={UserListPage} />
        <AdminRoute path="/create/sponsorship" component={AddSponsorshipPage} />
        <PrivateRoute path="/edit/Sponsorship/:id" component={EditSponsorshipPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
