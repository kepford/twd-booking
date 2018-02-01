import firebase from 'firebase';

export default () => {
  const user = firebase.auth().currentUser;
  const adminUid = 'YJ8P77ATwnVnWQvgo8Yy9i8bhPh1';
  return user.uid === adminUid ? true : false;
};
