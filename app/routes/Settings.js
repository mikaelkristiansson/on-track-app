import React, { Component } from 'react';
import {Text, TouchableOpacity, View, ScrollView} from 'react-native';
import styles from '../styles';
import {Actions} from 'react-native-router-flux';
import { Gravatar } from 'react-native-gravatar';
import { TextField } from 'react-native-material-textfield';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { AppColors } from '../theme';

import userStore from '../stores/userStore';

class Settings extends Component {

  constructor() {
    super();
    this.state = {
      editable: false,
      editIcon: 'account-edit'
    };
  }

  toggleEdit(editable) {
    this.setState({
      editable: editable ? false : true,
      editIcon: editable ? 'account-edit' : 'account-off'
    });
  }

  userLogOut() {
    userStore.logout();
    Actions.logout();
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
            onPress={() => this.toggleEdit(this.state.editable)}
          >
            <Icon name={this.state.editIcon} size={26} />
          </TouchableOpacity>
          <TextField
            label='FULL NAME'
            baseColor={AppColors.textSecondary}
            tintColor={AppColors.brand.secondary}
            editable={this.state.editable}
            value={userStore.firstName + ' ' + userStore.lastName}
            ref={'fullName'}
          />
          <TextField
            label='EMAIL'
            baseColor={AppColors.textSecondary}
            tintColor={AppColors.brand.secondary}
            editable={this.state.editable}
            value={userStore.email}
          />
          <TextField
            label='DEFAULT EXERCISE TYPE'
            baseColor={AppColors.textSecondary}
            tintColor={AppColors.brand.secondary}
            editable={this.state.editable}
          />
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