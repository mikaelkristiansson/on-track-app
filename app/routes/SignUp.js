import React, {Component} from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {API_URL} from 'react-native-dotenv';
import {Actions} from 'react-native-router-flux';
import styles from '../styles';

import logo from '../images/logo.png';

class SignUp extends Component {

  constructor(props) {
    super(props);
    this.state = {username: null, password: null, firstName: null, lastName: null};
  }

  userSignUp() {
    if (!this.state.username || !this.state.password) return;
    Actions.doSignUp({
      username: this.state.username,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
    });  
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
            secureTextEntry={true}
            style={styles.inputText}
            value={this.state.password}
          />

          <TouchableOpacity style={styles.buttonWrapper} onPress={this.userSignUp.bind(this)}>
            <Text style={styles.buttonText}> Sign Up </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default SignUp;