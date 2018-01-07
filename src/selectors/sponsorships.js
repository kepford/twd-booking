// Get sponsorships

export default (sponsorships, { text }) => {
  return sponsorships.filter((sponsorship) => {
    const textMatch = sponsorship.title.toLowerCase().includes(text.toLowerCase());

    return textMatch;
  });
};
