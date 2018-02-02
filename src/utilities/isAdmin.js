import firebase from 'firebase';

export default () => {
  const user = firebase.auth().currentUser;
  const adminUid = process.env.ADMIN_USER;
  return user.uid === adminUid ? true : false;
};
