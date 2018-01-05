import React, {Component} from 'react';
import {Image, Text, TextInput, TouchableOpacity, View, Button} from 'react-native';
import {Actions} from 'react-native-router-flux';
import { TextField } from 'react-native-material-textfield';
import { AppColors, AppStyles } from '../theme';

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
      <View style={AppStyles.container}>
        <Image source={logo} style={AppStyles.logo}/>
        <Text style={AppStyles.title}> ON TRACK </Text>

        <View style={AppStyles.form}>
          <TextField
            {...this.props.inputProps}
            onChangeText={(email) => this.setState({email})}
            label='EMAIL'
            ref='signEmail'
            returnKeyType={'next'}
            autoCapitalize={'none'}
            autoCorrect={false}
            keyboardType={'email-address'}
            onSubmitEditing={() => this.refs.signFirstName.focus()}
          />

          <TextField
            {...this.props.inputProps}
            onChangeText={(firstName) => this.setState({firstName})}
            label='FIRST NAME'
            ref='signFirstName'
            returnKeyType={'next'}
            autoCorrect={false}
            onSubmitEditing={() => this.refs.signLastName.focus()}
          />

          <TextField
            {...this.props.inputProps}
            onChangeText={(lastName) => this.setState({lastName})}
            label='LAST NAME'
            ref='signLastName'
            returnKeyType={'next'}
            autoCorrect={false}
            onSubmitEditing={() => this.refs.signPassword.focus()}
          />

          <TextField
            {...this.props.inputProps}
            onChangeText={(password) => this.setState({password})}
            label='PASSWORD'
            ref='signPassword'
            returnKeyType='go'
            secureTextEntry={true}
          />

          <TouchableOpacity style={AppStyles.buttonWrapper} onPress={this.userSignUp.bind(this)}>
            <Text style={AppStyles.buttonText}> SIGN UP </Text>
          </TouchableOpacity>
          <Button
            title="Back to Sign in"
            color={AppColors.brand.secondary}
            onPress={() => Actions.login()}
          />
        </View>
      </View>
    );
  }
}

export default SignUp;