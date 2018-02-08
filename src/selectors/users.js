// Get users.

export default (users, { text }) => {
  return users.filter((user) => {
    const textMatch = user.id.includes(text);


    return textMatch;
  });
};
