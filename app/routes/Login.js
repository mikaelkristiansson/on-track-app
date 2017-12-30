import React, {Component} from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {API_URL} from 'react-native-dotenv';
import {Actions} from 'react-native-router-flux';
import styles from '../styles';

import logo from '../images/logo.png';
import Auth from '../auth';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {username: null, password: null};
    //this.auth = new Auth();
  }

  // userSignUp() {
  //     if (!this.state.username || !this.state.password) return;
  //     this.auth.signUp(this.state.username, this.state.password)
  //         .catch(() => alert('Something went wrong'));
  // }

  userLogin() {
    if (!this.state.username || !this.state.password) return;
    this.props.onLogin({ username: this.state.username, password: this.state.password });
    // this.auth.signIn(this.state.username, this.state.password)
    //     .catch(() => Auth.signOut().then(() => alert('Something went wrong')));
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={logo} style={styles.logo}/>
        <Text style={styles.title}> On Track </Text>

        <View style={styles.form}>
          <TextInput
            editable={true}
            onChangeText={(username) => this.setState({username})}
            placeholder='Username'
            ref='username'
            returnKeyType={'next'}
            autoCapitalize={'none'}
            autoCorrect={false}
            keyboardType={'email-address'}
            onSubmitEditing={() => this.refs.password.focus()}
            style={styles.inputText}
            value={this.state.username}
          />

          <TextInput
            editable={true}
            onChangeText={(password) => this.setState({password})}
            placeholder='Password'
            ref='password'
            returnKeyType='go'
            onSubmitEditing={() => this.userLogin()}
            secureTextEntry={true}
            style={styles.inputText}
            value={this.state.password}
          />

          <TouchableOpacity style={styles.buttonWrapper} onPress={this.userLogin.bind(this)}>
            <Text style={styles.buttonText}> Log In </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Login;