import {API_URL} from 'react-native-dotenv';
//import Auth from '../auth';

class Exercises {
  constructor() {
    this.api = `${API_URL}/api`;
  }

  getAll(token) {
    return fetch(`${this.api}/exercises`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      },
    })
      .then((response) => {
        if (response.ok) return response.json();
        //Auth.signOut();
      });
  }

  getYear(token, date) {
    return fetch(`${this.api}/exercises/year?date=${date}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      },
    })
      .then((response) => {
        if (response.ok) return response.json();
        //Auth.signOut();
      });
  }

  checkUpdates(token) {
    return fetch(`${this.api}/exercises`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
    })
      .then((response) => {
        if (response.ok) return response.json();
        //Auth.signOut();
      });
  }

  create(token) {
    return fetch(`${this.api}/exercises/`, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'gym'
      })
    })
      .then((response) => {
        if (response.ok) return response.json();
        //Auth.signOut();
      });
  }
}

export default Exercises;