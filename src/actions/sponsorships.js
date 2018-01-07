import database from '../firebase/firebase';

// ADD_SPONSORSHIP
export const addSponsorship = (sponsorship) => ({
  type: 'ADD_SPONSORSHIP',
  sponsorship
});

export const startAddSponsorship = (sponsorshipData = {}) => {
  return (dispatch) => {
    const {
      title = '',
      type = '',
      url = '',
      body = '',
      date = '',
      ready = ''
    } = sponsorshipData;
    const sponsorship = {
      title,
      type,
      url,
      body,
      date,
      ready
    };

    return database.ref(`sponsorships`).push(sponsorship).then((ref) => {
      dispatch(addSponsorship({
        id: ref.key,
        ...sponsorship
      }));
    });
  };
};

// REMOVE_SPONSORSHIP
export const removeSponsorship = ({ id } = {}) => ({
  type: 'REMOVE_SPONSORSHIP',
  id
});

export const startRemoveSponsorship = ({ id } = {}) => {
  return (dispatch) => {
    return database.ref(`sponsorships/${id}`).remove().then(() => {
      dispatch(removeSponsorship({ id }));
    });
  };
};

// EDIT_SPONSORSHIP
export const editSponsorship = (id, updates) => ({
  type: 'EDIT_SPONSORSHIP',
  id,
  updates
});

export const startEditSponsorship = (id, updates) => {
  return (dispatch) => {
    return database.ref(`sponsorships/${id}`).update(updates).then(() => {
      dispatch(editSponsorship(id, updates));
    });
  };
};

// SET_SPONSORSHIPS
export const setSponsorships = (sponsorships) => ({
  type: 'SET_SPONSORSHIPS',
  sponsorships
});

export const startSetSponsorships = () => {
  return (dispatch) => {
    return database.ref(`sponsorships`).once('value').then((snapshot) => {
      const sponsorships = [];

      snapshot.forEach((childSnapshot) => {
        sponsorships.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });

      dispatch(setSponsorships(sponsorships));
    });
  };
};
