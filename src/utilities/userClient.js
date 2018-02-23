export const userClient = (uid, users) => {
  let user = users.filter((user) => user.userUid === uid);
  const clientId = user.length > 0 ? user[0].clientId : '';
  return clientId;
};
