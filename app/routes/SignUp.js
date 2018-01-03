import React, {Component} from 'react';
import {Image, Text, TextInput, TouchableOpacity, View, Button} from 'react-native';
import {API_URL} from 'react-native-dotenv';
import {Actions} from 'react-native-router-flux';
import styles from '../styles';
import { AppColors } from '../theme';

import logo from '../images/logo.png';

class SignUp extends Component {

  constructor(props) {
    super(props);
    this.state = {email: null, password: null, firstName: null, lastName: null};
  }

  userSignUp() {
    if (!this.state.email || !this.state.password || !this.state.firstName || !this.state.lastName) return;
    Actions.doSignUp({
      email: this.state.email,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
    });  
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={logo} style={styles.logo}/>
        <Text style={styles.title}> ON TRACK </Text>

        <View style={styles.form}>
          <TextInput
            editable={true}
            onChangeText={(email) => this.setState({email})}
            placeholder='Email'
            ref='signEmail'
            returnKeyType={'next'}
            autoCapitalize={'none'}
            autoCorrect={false}
            keyboardType={'email-address'}
            onSubmitEditing={() => this.refs.signFirstName.focus()}
            style={styles.inputText}
            value={this.state.email}
          />

          <TextInput
            editable={true}
            onChangeText={(firstName) => this.setState({firstName})}
            placeholder='First name'
            ref='signFirstName'
            returnKeyType={'next'}
            autoCorrect={false}
            onSubmitEditing={() => this.refs.signLastName.focus()}
            style={styles.inputText}
            value={this.state.firstName}
          />

          <TextInput
            editable={true}
            onChangeText={(lastName) => this.setState({lastName})}
            placeholder='Last name'
            ref='signLastName'
            returnKeyType={'next'}
            autoCorrect={false}
            onSubmitEditing={() => this.refs.signPassword.focus()}
            style={styles.inputText}
            value={this.state.lastName}
          />

          <TextInput
            editable={true}
            onChangeText={(password) => this.setState({password})}
            placeholder='Password'
            ref='signPassword'
            returnKeyType='go'
            secureTextEntry={true}
            style={styles.inputText}
            value={this.state.password}
          />

          <TouchableOpacity style={styles.buttonWrapper} onPress={this.userSignUp.bind(this)}>
            <Text style={styles.buttonText}> SIGN UP </Text>
          </TouchableOpacity>
          <Button
            title="Back to Sign in"
            color={AppColors.brand.secondary}
            onPress={() => Actions.pop()}
          />
        </View>
      </View>
    );
  }
}

export default SignUp;