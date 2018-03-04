import moment from 'moment';

// Get sponsorships

export default (sponsorships) => {
  return sponsorships.filter((sponsorship) => {
    const now = moment().valueOf();
    const sponsorshipDate = sponsorship.date;
    const future = sponsorshipDate > now ? true : false;
    return future;
  }).sort((a, b) => {
    return a.date > b.date ? 1 : -1;
  });
};
