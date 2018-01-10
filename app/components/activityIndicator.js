import React, { Component } from 'react';
import {
  ActivityIndicator,
  View,
  Text
} from 'react-native';
import { AppColors, AppStyles } from '../theme';

/* Component ==================================================================== */
export default class Indicator extends Component {
  render = () => (
    <View style={{
      flex: 1,
      height: '110%',
      width: '100%',
      top: 0,
      position: 'absolute', 
      backgroundColor: 'rgba(0,0,0,.1)'
    }}>
      <ActivityIndicator
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: 100,
          width: 100,
          position: 'absolute', 
          left: '50%',
          marginLeft: -50,
          top: '45%',
          marginTop: -50,
          backgroundColor: 'rgba(255,255,255,.9)',
          borderRadius: 10
        }}
        animating
        size={'large'}
        color={AppColors.spinner}
      />
    </View>
  );
}