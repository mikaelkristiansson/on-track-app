import React, {Component} from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// THEME
import { AppColors, AppStyles } from '../theme';

export default class Register extends Component {

  static navigationOptions = {
    tabBarLabel: 'Statistics',
    showLabel: false,
    //tabBarOnPress: () => {console.log('asf')}
  };

  render() {
    return (
      <View />
    );
  }
}