import database from '../firebase/firebase';

// ADD_USER
export const addUser = (user) => ({
  type: 'ADD_USER',
  user
});

export const startAddUser = (userData = {}) => {
  return (dispatch) => {
    const {
      userUid = '',
      clientId = '',
      userDisplayName = ''
    } = userData;
    const user = {
      userUid,
      clientId,
      userDisplayName
    };

    return database.ref(`users/` + user.userUid).set(user).then(() => {
      dispatch(addUser({
        ...user
      }));
    });
  };
};

// REMOVE_USER
export const removeUser = ({ id } = {}) => ({
  type: 'REMOVE_USER',
  id
});

export const startRemoveUser = ({ id } = {}) => {
  return (dispatch) => {
    return database.ref(`users/${id}`).remove().then(() => {
      dispatch(removeUser({ id }));
    });
  };
};

// EDIT_user
export const editUser = (id, updates) => ({
  type: 'EDIT_USER',
  id,
  updates
});

export const startEditUser = (id, updates) => {
  return (dispatch) => {
    return database.ref(`users/${id}`).update(updates).then(() => {
      dispatch(editUser(id, updates));
    });
  };
};

// SET_USERS
export const setUsers = (users) => ({
  type: 'SET_USERS',
  users
});

export const startSetUsers = () => {
  return (dispatch) => {
    return database.ref(`users`).once('value').then((snapshot) => {
      const users = [];

      snapshot.forEach((childSnapshot) => {
        users.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });

      dispatch(setUsers(users));
    });
  };
};
