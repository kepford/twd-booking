import { createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import clientsReducer from '../reducers/clients';
import sponsorshipsReducer from '../reducers/sponsorships';
import filtersReducer from '../reducers/filters';
import userReducer from '../reducers/user';
import usersReducer from '../reducers/users';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      clients: clientsReducer,
      sponsorships: sponsorshipsReducer,
      filters: filtersReducer,
      user: userReducer,
      users: usersReducer,
      auth: authReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
