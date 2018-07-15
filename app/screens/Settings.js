import React, { Component } from 'react';
import {Text, TouchableOpacity, View, ScrollView} from 'react-native';
import { Gravatar } from 'react-native-gravatar';
import { TextField } from 'react-native-material-textfield';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';

import { AppColors, AppStyles } from '../theme';

import userStore from '../stores/userStore';

class Settings extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editable: false,
      email: userStore.email, 
      firstName: userStore.firstName, 
      lastName: userStore.lastName
    };
  }

  static navigationOptions = {
    tabBarLabel: 'Statistics',
    tabBarIcon: ({ focused, tintColor }) => (
      <Ionicon name={focused ? 'ios-settings' : 'ios-settings-outline'} size={36} color={focused ? AppColors.tabbar.iconSelected : AppColors.tabbar.iconDefault} />
    ),
    showLabel: false,
  };

  toggleEdit() {
    this.setState({
      editable: !this.state.editable,
      email: userStore.email, 
      firstName: userStore.firstName, 
      lastName: userStore.lastName
    });
    setTimeout(() => {
      this.refs.firstName.focus();
    },100);
  }

  updateProfile(email, firstName, lastName) {
    userStore.update({ email: email, firstName: firstName, lastName: lastName });
    this.setState({
      editable: false,
    });
  }

  userLogOut() {
    this.props.screenProps.signOut();
  }

  _renderSave() {
    if (this.state.editable) {
      return (
        <View style={[AppStyles.rightContent, {marginBottom: 20}]}>
          <TouchableOpacity style={AppStyles.smallButtonWrapper} onPress={() => this.updateProfile(this.state.email, this.state.firstName, this.state.lastName)}>
            <Text style={AppStyles.smallButtonText}> SAVE </Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return null;
    }
  }

  _renderIcon() {
    if(!this.state.editable) {
      return (
        <Icon name={'account-edit'} size={28} color={AppColors.tabbar.iconSelected} />
      );
    } else {
      return (
        <Ionicon name={'ios-close-circle-outline'} size={28} color={AppColors.tabbar.iconSelected} />
      );
    }
  }

  render() {
    return (
      <View style={AppStyles.settings}>
        <View style={AppStyles.centerContent}>
          <Gravatar
            options={{
              email: userStore.email,
              parameters: { "size": "200", "d": "mm" },
              secure: true
            }}
            style={AppStyles.roundedProfileImage} 
          />
        </View>
        <ScrollView style={AppStyles.profile}>
          <TouchableOpacity
            style={{alignSelf: 'flex-end'}}
            onPress={() => this.toggleEdit()}
          >
            {this._renderIcon()}
          </TouchableOpacity>
          <TextField
            {...this.props.screenProps.inputProps}
            label='FIRST NAME'
            editable={this.state.editable}
            value={this.state.firstName}
            onChangeText={(firstName) => this.setState({firstName})}
            ref={'firstName'}
          />
          <TextField
            {...this.props.screenProps.inputProps}
            label='LAST NAME'
            editable={this.state.editable}
            value={this.state.lastName}
            onChangeText={(lastName) => this.setState({lastName})}
            ref={'lastName'}
          />
          <TextField
            {...this.props.screenProps.inputProps}
            label='EMAIL'
            editable={this.state.editable}
            onChangeText={(email) => this.setState({email})}
            value={this.state.email}
          />
          {/* <TextField
            label='DEFAULT EXERCISE TYPE'
            baseColor={AppColors.textSecondary}
            tintColor={AppColors.brand.secondary}
            editable={this.state.editable}
          /> */}
          {this._renderSave()}
        </ScrollView>
        <View style={[AppStyles.centerContent, {marginBottom: 20}]}>
          <TouchableOpacity style={AppStyles.buttonWrapper} onPress={this.userLogOut.bind(this)}>
            <Text style={AppStyles.buttonText}> SIGN OUT </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Settings;