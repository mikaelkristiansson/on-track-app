import React, { Component } from 'react';
import {
  StatusBar,
  ActivityIndicator,
  View,
  Text
} from 'react-native';
import { AppColors } from '../theme';

/* Component ==================================================================== */
export default class Launch extends Component {
  componentDidMount = () => {
    // Show status bar on app launch
    StatusBar.setHidden(false, true);
  };

  render = () => (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '100%',
      position: 'absolute', 
      backgroundColor: AppColors.brand.primary
    }}>
      <Text style={{color: '#fff', fontSize: 26, paddingBottom: 140}}>LOADING EXERCISES</Text>
      <ActivityIndicator
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          width: '100%',
          position: 'absolute',
        }}
        animating
        size={'large'}
        color={AppColors.spinner}
      />
    </View>
  );
}