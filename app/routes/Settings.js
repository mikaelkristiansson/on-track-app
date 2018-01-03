import React, { Component } from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from '../styles';
import {Actions} from 'react-native-router-flux';

class Settings extends Component {
  userLogOut() {
    Actions.logout();
    // Auth.signOut()
    //     .then(() => Actions.Authentication());
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.buttonWrapper} onPress={this.userLogOut}>
          <Text style={styles.buttonText}> SIGN OUT </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Settings;