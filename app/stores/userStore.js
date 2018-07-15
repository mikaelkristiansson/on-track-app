import { AsyncStorage } from 'react-native';
//import moment from 'moment';
import { ErrorMessages, Firebase, FirebaseRef } from '../helpers';
//import auth from '../auth/index';

class UserStore {

  load = async () => {
    const values = await AsyncStorage.getItem('api/credentials');
    return JSON.parse(values) || {};
  };

  hasCredentials = ({ email, password }) => email && password && { email, password };

  save = async (email = '', password = '') => {
    await AsyncStorage.setItem('api/credentials', JSON.stringify({ email, password }));
  };

  // saveToken = async (token = '', expires_at = 0) => {
  //   await AsyncStorage.setItem('api/token', JSON.stringify({ token, expires_at }));
  // };

  // loadToken = async () => {
  //   const values = await AsyncStorage.getItem('api/token');
  //   const parsed = JSON.parse(values);
  //   return parsed.token || {};
  // };

  // loadExpiresAt = async () => {
  //   const values = await AsyncStorage.getItem('api/token');
  //   if (!values) return false;
  //   const parsed = JSON.parse(values);
  //   return parsed.expires_at || 0;
  // };

  remove = async () => {
    await AsyncStorage.removeItem('api/credentials');
    //await AsyncStorage.removeItem('api/token');
  };

  getUserData = () => new Promise((resolve, reject) => {
    if (Firebase === null) {
      reject(ErrorMessages.invalidFirebase);
    }

    const UID = Firebase.auth().currentUser.uid;
    if (!UID) return false;

    const ref = FirebaseRef.child(`users/${UID}`);
    return ref.on('value', (snapshot) => {
      const userData = snapshot.val() || [];
      resolve(userData);
    });
  });

  login = async ({ email, password }) => {
    if (email && password) {
      this.save(email, password);
    }
    if (Firebase === null) {
      throw ErrorMessages.invalidFirebase;
    }
    this.error = {};
    const { uid } = await Firebase.auth().signInWithEmailAndPassword(email, password)
    .catch((error) => {
      this.error = error;
    });
    if(uid) {
      this.uid = uid;
      const { firstName, lastName } = await this.getUserData();
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      return true;
    } else {
      return this.error;
    }
  };

  signUp = async ({ email, password, firstName, lastName }) => {
    if (Firebase === null) {
      throw ErrorMessages.invalidFirebase;
    }
    const { uid } = await Firebase.auth().createUserWithEmailAndPassword(email, password);
    await FirebaseRef.child(`users/${uid}`).set({
      firstName,
      lastName,
      signedUp: Firebase.database.ServerValue.TIMESTAMP,
      lastLoggedIn: Firebase.database.ServerValue.TIMESTAMP,
    });
    this.save(email, password);
    this.uid = uid;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    return true;
  };

  logout = async () => {
    if (Firebase === null) {
      throw ErrorMessages.invalidFirebase;
    }
    console.log("LOGOUT!");
    await Firebase.auth().signOut();
    await this.remove();
    this.email = null;
    this.uid = null;
    this.firstName = null;
    this.lastName = null;
    return true;
  };

  sleep = time => new Promise(resolve => setTimeout(resolve, time));

  update = async ({ email, firstName, lastName }) => {
    if (Firebase === null) {
      throw ErrorMessages.invalidFirebase;
    }
    const UID = Firebase.auth().currentUser.uid;
    if (!UID) {
      throw 'No uid!';
    }

    await Firebase.auth().currentUser.updateEmail(email);
    await FirebaseRef.child(`users/${UID}`).update({ firstName, lastName });
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
  };

  resetPassword = async ({ email }) => {
    await Firebase.auth().sendPasswordResetEmail(email);
    return true;
  };
}

export default new UserStore();
