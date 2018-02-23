// User Reducer

const userReducerDefaultState = [];

export default (state = userReducerDefaultState, action) => {
  switch (action.type) {
  case 'SET_USER':
    return action.user;
  default:
    return state;
  }
};
