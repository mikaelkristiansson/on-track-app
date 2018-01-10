import userStore from '../stores/userStore';

class Auth {
  
  signIn(email, password) {
    userStore.login({email: email, password: password}).then((res) => {
      alert(res);
    })
  }
}

export default new Auth();
