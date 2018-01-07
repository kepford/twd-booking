// Sponsorships Reducer

const sponsorshipsReducerDefaultState = [];

export default (state = sponsorshipsReducerDefaultState, action) => {
  switch (action.type) {
  case 'ADD_SPONSORSHIP':
    return [
      ...state,
      action.sponsorship
    ];
  case 'REMOVE_SPONSORSHIP':
    return state.filter(({ id }) => id !== action.id);
  case 'EDIT_SPONSORSHIP':
    return state.map((sponsorship) => {
      if (sponsorship.id === action.id) {
        return {
          ...sponsorship,
          ...action.updates
        };
      }
      else {
        return sponsorship;
      }
    });
  case 'SET_SPONSORSHIPS':
    return action.sponsorships;
  default:
    return state;
  }
};
