// SET_USER
export const setUser = (user) => ({
  type: 'SET_USER',
  user
});

export const startSetUser = (userData = {}) => {
  return (dispatch) => {
    const {
      userId = '',
      isAdmin = '',
      client = ''
    } = userData;
    const user = {
      userId,
      isAdmin,
      client
    };
    return dispatch(setUser({
      ...user
    }));
  };
};
