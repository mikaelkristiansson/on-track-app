import React, {Component} from 'react';
import {Image, Text, TextInput, TouchableOpacity, View, Button} from 'react-native';
import {Actions} from 'react-native-router-flux';
import styles from '../styles';
import { AppColors } from '../theme';

import logo from '../images/logo.png';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {email: null, password: null};
  }

  userLogin() {
    if (!this.state.email || !this.state.password) return;
    this.props.onLogin({ email: this.state.email, password: this.state.password });
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
            ref='email'
            returnKeyType={'next'}
            autoCapitalize={'none'}
            autoCorrect={false}
            keyboardType={'email-address'}
            onSubmitEditing={() => this.refs.password.focus()}
            style={styles.inputText}
            value={this.state.email}
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
            <Text style={styles.buttonText}> SIGN IN </Text>
          </TouchableOpacity>
          <Button color={AppColors.brand.secondary} outlined title={'Sign Up'} onPress={this.props.onSignUp} />
        </View>
      </View>
    );
  }
}

export default Login;