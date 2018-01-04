import React, { Component } from 'react';
import {Text, TouchableOpacity, View, ScrollView} from 'react-native';
import styles from '../styles';
import {Actions} from 'react-native-router-flux';
import { Gravatar } from 'react-native-gravatar';
import { TextField } from 'react-native-material-textfield';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';

import { AppColors } from '../theme';

import userStore from '../stores/userStore';

class Settings extends Component {

  constructor() {
    super();
    this.state = {
      editable: false,
      email: userStore.email, 
      firstName: userStore.firstName, 
      lastName: userStore.lastName
    };
  }

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
    userStore.logout();
    Actions.logout();
  }

  _renderSave() {
    if (this.state.editable) {
      return (
        <View style={[styles.rightContent, {marginBottom: 20}]}>
          <TouchableOpacity style={styles.smallButtonWrapper} onPress={() => this.updateProfile(this.state.email, this.state.firstName, this.state.lastName)}>
            <Text style={styles.smallButtonText}> SAVE </Text>
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
      <View style={styles.settings}>
        <View style={styles.centerContent}>
          <Gravatar
            options={{
              email: userStore.email,
              parameters: { "size": "200", "d": "mm" },
              secure: true
            }}
            style={styles.roundedProfileImage} 
          />
        </View>
        <ScrollView style={styles.profile}>
          <TouchableOpacity
            style={{alignSelf: 'flex-end'}}
            onPress={() => this.toggleEdit()}
          >
            {this._renderIcon()}
          </TouchableOpacity>
          <TextField
            label='FIRST NAME'
            baseColor={AppColors.textSecondary}
            tintColor={AppColors.brand.secondary}
            editable={this.state.editable}
            value={this.state.firstName}
            onChangeText={(firstName) => this.setState({firstName})}
            ref={'firstName'}
          />
          <TextField
            label='LAST NAME'
            baseColor={AppColors.textSecondary}
            tintColor={AppColors.brand.secondary}
            editable={this.state.editable}
            value={this.state.lastName}
            onChangeText={(lastName) => this.setState({lastName})}
            ref={'lastName'}
          />
          <TextField
            label='EMAIL'
            baseColor={AppColors.textSecondary}
            tintColor={AppColors.brand.secondary}
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
        <View style={[styles.centerContent, {marginBottom: 20}]}>
          <TouchableOpacity style={styles.buttonWrapper} onPress={this.userLogOut}>
            <Text style={styles.buttonText}> SIGN OUT </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Settings;