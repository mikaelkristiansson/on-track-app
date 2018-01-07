import React, {Component} from 'react';
import {Image, Text, TextInput, TouchableOpacity, View, Button} from 'react-native';
import {Actions} from 'react-native-router-flux';
import { TextField } from 'react-native-material-textfield';
import { AppColors, AppStyles } from '../theme';


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
      <View style={AppStyles.container}>
        <Image source={logo} style={AppStyles.logo}/>
        <Text style={AppStyles.title}> ON TRACK </Text>

        <View style={AppStyles.form}>
          <TextField
            {...this.props.inputProps}
            onChangeText={(email) => this.setState({email})}
            label='EMAIL'
            ref='email'
            returnKeyType={'next'}
            autoCapitalize={'none'}
            autoCorrect={false}
            keyboardType={'email-address'}
            onSubmitEditing={() => this.refs.password.focus()}
          />
          <TextField
            {...this.props.inputProps}
            onChangeText={(password) => this.setState({password})}
            label='PASSWORD'
            ref='password'
            returnKeyType='go'
            onSubmitEditing={() => this.userLogin()}
            secureTextEntry={true}
          />

          <TouchableOpacity style={AppStyles.buttonWrapper} onPress={this.userLogin.bind(this)}>
            <Text style={AppStyles.buttonText}> SIGN IN </Text>
          </TouchableOpacity>
          <Button color={AppColors.brand.secondary} outlined title={'Sign Up'} onPress={this.props.onSignUp} />
        </View>
      </View>
    );
  }
}

export default Login;