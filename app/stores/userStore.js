import { AsyncStorage } from 'react-native';
import moment from 'moment';
import auth from '../auth/index';

class UserStore {

  load = async () => {
    const values = await AsyncStorage.getItem('api/credentials');
    return JSON.parse(values) || {};
  };

  hasCredentials = ({ username, password }) => username && password && { username, password };

  save = async (username = '', password = '') => {
    await AsyncStorage.setItem('api/credentials', JSON.stringify({ username, password }));
  };

  saveToken = async (token = '', expires_at = 0) => {
    await AsyncStorage.setItem('api/token', JSON.stringify({ token, expires_at }));
  };

  loadToken = async () => {
    const values = await AsyncStorage.getItem('api/token');
    const parsed = JSON.parse(values);
    return parsed.token || {};
  };

  loadExpiresAt = async () => {
    const values = await AsyncStorage.getItem('api/token');
    if (!values) return false;
    const parsed = JSON.parse(values);
    return parsed.expires_at || 0;
  };

  remove = async () => {
    await AsyncStorage.removeItem('api/credentials');
    await AsyncStorage.removeItem('api/token');
  };

  getUserData = () => new Promise((resolve, reject) => {

    const TOKEN = '';//get token
    if (!TOKEN) return false;

    return resolve(TOKEN);
  });

  login = async ({ username, password }) => {
    if (username && password) {
      this.save(username, password);
    }
    let now = moment().format('YYYY-MM-DD HH:mm:ss');
    const willExpireAt = await this.loadExpiresAt() || moment().subtract(5, 'minutes').format('YYYY-MM-DD HH:mm:ss');
    if(moment(willExpireAt).isBefore(now)) {
      const { user, token, expires_in } = await auth.signIn(username, password);
      if (!token) return false;
      this.expiresAt = moment().add(parseInt(expires_in), 'seconds').format('YYYY-MM-DD HH:mm:ss');
      this.token = token;
      this.saveToken(token, String(this.expiresAt));
      this.username = user.username;     
    }
    return true;
  };

  signUp = async ({ username, password, firstName, lastName }) => {
    const user = await auth.signUp(username, password);
    this.save(username, password);
    // if (Firebase === null) {
    //   throw ErrorMessages.invalidFirebase;
    // }
    // const { uid } = await Firebase.auth().createUserWithEmailAndPassword(email, password);
    // await FirebaseRef.child(`users/${uid}`).set({
    //   firstName,
    //   lastName,
    //   signedUp: Firebase.database.ServerValue.TIMESTAMP,
    //   lastLoggedIn: Firebase.database.ServerValue.TIMESTAMP,
    // });
    // this.save(email, password);
    // this.uid = uid;
    // this.firstName = firstName;
    // this.lastName = lastName;
    // this.email = email;
    return true;
  };

  logout = async () => {
    // if (Firebase === null) {
    //   throw ErrorMessages.invalidFirebase;
    // }
    // await Firebase.auth().signOut();
    await this.remove();
    // this.email = null;
    // this.uid = null;
    // this.firstName = null;
    // this.lastName = null;
    return true;
  };

  sleep = time => new Promise(resolve => setTimeout(resolve, time));

  update = async ({ email, firstName, lastName }) => {
    // if (Firebase === null) {
    //   throw ErrorMessages.invalidFirebase;
    // }
    // const UID = Firebase.auth().currentUser.uid;
    // if (!UID) {
    //   throw Object('No uid!');
    // }

    // await Firebase.auth().currentUser.updateEmail(email);
    // await FirebaseRef.child(`users/${UID}`).update({ firstName, lastName });
    // this.email = email;
    // this.firstName = firstName;
    // this.lastName = lastName;
  };

  resetPassword = async ({ email }) => {
    // await Firebase.auth().sendPasswordResetEmail(email);
    return true;
  };
}

export default new UserStore();
