import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';

// SCREENS
import SignUp from './screens/SignUp';
import SignIn from './screens/SignIn';
import Statistics from './screens/Statistics';
import Settings from './screens/Settings';
import Register from './screens/Register';

// HELPERS & THEME
import { AppColors } from './theme';

const headerStyle = {
  marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
};

export const SignedOut = StackNavigator({
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      title: 'Sign In',
      headerStyle,
      header: false
    }
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      title: 'Sign Up',
      headerStyle,
      header: false
    }
  }
});

export const SignedIn = TabNavigator(
  {
    Statistics: {
      screen: Statistics
    },
    Register: {
      screen: Register
    },
    Settings: {
      screen: Settings
    }
  },
  {
    tabBarOptions: {
      style: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: AppColors.tabbar.background, borderTopColor: AppColors.tabbar.border
      },
      showLabel: false,
    }
  }
);

export const createRootNavigator = (signedIn = false) => {
  return StackNavigator(
    {
      SignedIn: {
        screen: SignedIn,
        navigationOptions: {
          gesturesEnabled: false
        }
      },
      SignedOut: {
        screen: SignedOut,
        navigationOptions: {
          gesturesEnabled: false
        }
      }
    },
    {
      headerMode: 'none',
      mode: 'modal',
      initialRouteName: signedIn ? 'SignedIn' : 'SignedOut'
    }
  );
};