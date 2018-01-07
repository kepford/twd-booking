// Get sponsorships

export default (sponsorships, { text }) => {
  return sponsorships.filter((sponsorship) => {
    const textMatch = sponsorship.issue.toLowerCase().includes(text.toLowerCase());

    return textMatch;
  });
};
