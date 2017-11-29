import React, {Component} from 'react';
import {AsyncStorage, Text, TextInput, TouchableOpacity, View} from 'react-native';
import { API_URL } from 'react-native-dotenv';
import {Actions} from 'react-native-router-flux';
import styles from './styles';

class Authentication extends Component {

    constructor() {
        super();
        this.state = {username: null, password: null};
    }

    userSignup() {
        if (!this.state.username || !this.state.password) return;
        fetch(`${API_URL}/auth/sign_up`, {
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
            })
        })
            .then((response) => response.json())
            .then((responseData) => {
                this.saveItem('token', responseData.token);
                Actions.HomePage();
            })
            .done();
    }

    userLogin() {
        if (!this.state.username || !this.state.password) return;
        fetch(`${API_URL}/auth/sign_in`, {
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
            })
        })
            .then((response) => response.json())
            .then((responseData) => {
                this.saveItem('token', responseData.token);
                Actions.HomePage();
            })
            .done();
    }

    async saveItem(item, selectedValue) {
        try {
            await AsyncStorage.setItem(item, selectedValue);
        } catch (error) {
            console.error('AsyncStorage error: ' + error.message);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}> Welcome </Text>

                <View style={styles.form}>
                    <TextInput
                        editable={true}
                        onChangeText={(username) => this.setState({username})}
                        placeholder='Username'
                        ref='username'
                        returnKeyType='next'
                        style={styles.inputText}
                        value={this.state.username}
                    />

                    <TextInput
                        editable={true}
                        onChangeText={(password) => this.setState({password})}
                        placeholder='Password'
                        ref='password'
                        returnKeyType='next'
                        secureTextEntry={true}
                        style={styles.inputText}
                        value={this.state.password}
                    />

                    <TouchableOpacity style={styles.buttonWrapper} onPress={this.userLogin.bind(this)}>
                        <Text style={styles.buttonText}> Log In </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonWrapper} onPress={this.userSignup.bind(this)}>
                        <Text style={styles.buttonText}> Sign Up </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default Authentication;