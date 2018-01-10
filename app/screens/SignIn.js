import React, {Component} from 'react';
import {Image, Text, TextInput, TouchableOpacity, View, Button} from 'react-native';
import {Actions} from 'react-native-router-flux';
import { TextField } from 'react-native-material-textfield';
import { AppColors, AppStyles } from '../theme';

import Indicator from '../components/activityIndicator';
import logo from '../images/logo.png';

class SignIn extends Component {

  constructor(props) {
    super(props);
    this.state = {email: null, password: null, loading: false};
  }

  userLogin() {
    if (!this.state.email || !this.state.password) return;
    this.setState({loading: true});
    this.props.screenProps.signIn(this.state.email, this.state.password);
  }

  backToSignUp() {
    this.props.navigation.navigate('SignUp');
  }

  _renderLoading() {
    if(this.state.loading) {
      return (
        <Indicator />
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <View style={AppStyles.container}>
        <Image source={logo} style={AppStyles.logo}/>
        <Text style={AppStyles.title}> ON TRACK </Text>

        <View style={AppStyles.form}>
          <TextField
            {...this.props.screenProps.inputProps}
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
            {...this.props.screenProps.inputProps}
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
          <Button color={AppColors.brand.secondary} outlined title={'Sign Up'} onPress={this.backToSignUp.bind(this)} />
        </View>
        {this._renderLoading()}
      </View>
    );
  }
}

export default SignIn;