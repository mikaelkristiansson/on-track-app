import { API_URL } from '../settings.json';
import { ErrorMessages, Firebase } from '../helpers';

class ExerciseStore {

  token = async () => {
   return Firebase.auth().currentUser.getIdToken().then((token) => token);
  };

  headers = async () => {
    const token = await this.token();
    return new Headers({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
      //'Cache-Control': 'no-cache'
    });
  };

  get = async (year) => {
    const url = year ? `exercises?date=${year}` : 'exercises';
    const headers = await this.headers();
    return fetch(`${API_URL}/${url}`, {method:'GET', headers: headers})
      .then(res => res.json());
  };

  getTotalCount = async () => {
    const headers = await this.headers();
    return fetch(`${API_URL}/exercises/total`, {method:'GET', headers: headers})
      .then(res => res.json());
  };

  save = async () => {
    const headers = await this.headers();
    return fetch(`${API_URL}/exercises`, 
      {
        method:'POST', 
        headers: headers, 
        body: JSON.stringify({
          type: 'gym'
        })
      }
    )
      .then(res => res.json());
  };
}

export default new ExerciseStore();