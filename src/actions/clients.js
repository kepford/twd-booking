import database from '../firebase/firebase';

// ADD_Client
export const addClient = (client) => ({
  type: 'ADD_CLIENT',
  client
});

export const startAddClient = (clientData = {}) => {
  return (dispatch) => {
    const {
      clientName = ''
    } = clientData;
    const client = { clientName };

    return database.ref(`clients`).push(client).then((ref) => {
      dispatch(addClient({
        id: ref.key,
        ...client
      }));
    });
  };
};

// REMOVE_CLIENT
export const removeClient = ({ id } = {}) => ({
  type: 'REMOVE_CLIENT',
  id
});

export const startRemoveClient = ({ id } = {}) => {
  return (dispatch) => {
    return database.ref(`clients/${id}`).remove().then(() => {
      dispatch(removeClient({ id }));
    });
  };
};

// EDIT_CLIENT
export const editClient = (id, updates) => ({
  type: 'EDIT_CLIENT',
  id,
  updates
});

export const startEditClient = (id, updates) => {
  return (dispatch) => {
    return database.ref(`clients/${id}`).update(updates).then(() => {
      dispatch(editClient(id, updates));
    });
  };
};

// SET_CLIENTS
export const setClients = (clients) => ({
  type: 'SET_CLIENTS',
  clients
});

export const startSetClients = () => {
  return (dispatch) => {
    return database.ref(`clients`).once('value').then((snapshot) => {
      const clients = [];

      snapshot.forEach((childSnapshot) => {
        clients.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });

      dispatch(setClients(clients));
    });
  };
};
