import React, { Component } from 'react';
import {
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { colors } from '../helpers/colors';

/* Component ==================================================================== */
export default class Launch extends Component {
  componentDidMount = () => {
    // Show status bar on app launch
    StatusBar.setHidden(false, true);
  };

  render = () => (
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
      color={colors.red}
    />
  );
}