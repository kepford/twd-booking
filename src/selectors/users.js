// Get users.

export default (users, { text }) => {
  return users.filter((user) => {
    const textMatch = user.userDisplayName.toLowerCase().includes(text.toLowerCase());

    return textMatch;
  });
};
