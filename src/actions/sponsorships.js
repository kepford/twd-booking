import database from '../firebase/firebase';

// ADD_SPONSORSHIP
export const addSponsorship = (sponsorship) => ({
  type: 'ADD_SPONSORSHIP',
  sponsorship
});

export const startAddSponsorship = (sponsorshipData = {}) => {
  return (dispatch) => {
    const {
      date = '',
      issue = '',
      client = '',
      title = '',
      type = '',
      url = '',
      sponsoredLinkBody = '',
      primaryBody = '',
      imageURL = '',
      image = '',
      status = ''
    } = sponsorshipData;
    const sponsorship = {
      date,
      issue,
      client,
      title,
      type,
      url,
      sponsoredLinkBody,
      primaryBody,
      imageURL,
      image,
      status
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

export const startSetSponsorships = (user) => {
  return (dispatch) => {
    return database.ref(`sponsorships`).once('value').then((snapshot) => {
      const isAdmin = user.isAdmin;
      const client = user.client;
      const sponsorships = [];
      snapshot.forEach((childSnapshot) => {
        isAdmin ?
          sponsorships.push(
            {
              id: childSnapshot.key,
              ...childSnapshot.val()
            }
          )
          : childSnapshot.val().client === client ?
            sponsorships.push(
              {
                id: childSnapshot.key,
                ...childSnapshot.val()
              }
            )
            : false;
      });

      dispatch(setSponsorships(sponsorships));
    });
  };
};
