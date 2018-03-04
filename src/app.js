import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetClients } from './actions/clients';
import { startSetUsers } from './actions/users';
import { startSetUser } from './actions/user';
import { startSetSponsorships } from './actions/sponsorships';
import { login, logout } from './actions/auth';
import isAdmin from './utilities/isAdmin';
import { userClient } from './utilities/userClient';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import {firebase } from './firebase/firebase';
import LoadingPage from './components/LoadingPage';

const store = configureStore();

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(login(user.uid));
    store.dispatch(startSetUsers()).then(() => {
      const state = store.getState();
      const userData = {
        userId: user.uid,
        isAdmin: isAdmin(),
        client: userClient(user.uid, state.users)
      };
      store.dispatch(startSetUser(userData));
    }).then(() => {
      const state = store.getState();
      store.dispatch(startSetSponsorships(state.user));
    });
    store.dispatch(startSetClients()).then(() => {
      renderApp();
      if (history.location.pathname === '/') {
        history.push('/dashboard');
      }
    });
  }
  else {
    store.dispatch(logout());
    renderApp();
    history.push('/');
  }
});
