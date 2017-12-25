// noinspection JSUnresolvedVariable
import {API_URL} from 'react-native-dotenv';
import {Actions} from 'react-native-router-flux';
import {AsyncStorage} from "react-native";

class Auth {
    constructor() {
        this.header = new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        });
        this.base = `${API_URL}/auth`;
        this.api = `${API_URL}/api`;
    }

    signIn(username, password) {
        return fetch(`${this.base}/sign_in`, {
            method: 'POST',
            headers: this.header,
            body: JSON.stringify({
                username: username,
                password: password,
            })
        })
            .then((response) => response.json())
            .then((responseData) => {
                Auth.saveItem('token', responseData.token).then(() => {
                    Auth.saveItem('ttl', String(responseData.expires_in)).then(() => this.checkIfLoggedIn());
                    Actions.Statistics();
                });
            });
    }

    signUp(username, password) {
        return fetch(`${this.base}/sign_up`, {
            method: 'POST',
            headers: this.header,
            body: JSON.stringify({
                username: username,
                password: password,
            })
        })
            .then((response) => response.json())
            .then((responseData) => {
                Auth.saveItem('token', responseData.token).then(() => {
                    Auth.saveItem('ttl', String(responseData.expires_in)).then(() => this.checkIfLoggedIn());
                    Actions.HomePage();
                });
            });
    }

    static signOut() {
        return Promise.resolve(AsyncStorage.removeItem('token'));
    }

    refreshToken() {
        return AsyncStorage.getItem('token').then((token) => {
            fetch(`${this.base}/refresh_token?token=${token}`, {
                method: 'GET',
                headers: this.header
            })
                .then((response) => response.json())
                .then((responseData) => {
                    Auth.saveItem('token', responseData.token).then();
                    Auth.saveItem('ttl', String(responseData.expires_in)).then();
                })
        });
    }

    checkIfLoggedIn() {
        return AsyncStorage.getItem('token').then((token) => {
            fetch(`${this.api}/test`, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Cache-Control': 'no-cache'
                }
            })
                .then((res) => {
                    if (!res.ok) {
                        Auth.signOut();
                        if (Actions.currentScene !== 'Authentication') Actions.Authentication();
                        token = null;
                    } else {
                        AsyncStorage.getItem('ttl').then((ttl) => {
                            setTimeout(() => {
                                this.refreshToken();
                            }, Number(ttl) * 1000); //Seconds into milli seconds
                        });
                    }
                });
            return token;
        });
    }

    static async saveItem(item, selectedValue) {
        try {
            await AsyncStorage.setItem(item, selectedValue);
        } catch (error) {
            console.error('AsyncStorage error: ' + error.message);
        }
    }
}

export default Auth;