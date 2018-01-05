import React, {Component} from 'react';
import {Router, Scene, Lightbox, Stack, Actions} from 'react-native-router-flux';
import {Text, View, AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// API
import userStore from './stores/userStore';
import exerciseStore from './stores/exerciseStore';

// ROUTES
import Launch from './routes/Launch';
import Login from './routes/Login';
import SignUp from './routes/SignUp';
import Statistics from './routes/Statistics';
import Settings from './routes/Settings';
import Register from './routes/Register';


// HELPERS & THEME
import { colors } from './helpers/colors';
import { AppConfig } from './helpers';
import { AppColors } from './theme';

class App extends Component {

  constructor(prop) {
    super(prop);
    this.registerExercise = this.registerExercise.bind(this);
    this.state = {
      inputProps: {
        fontSize: 14,
        textColor: AppColors.input,
        baseColor: AppColors.textSecondary,
        tintColor: AppColors.brand.secondary
      }
    };
  }

  registerExercise() {
    exerciseStore.save().then((exercise) => {
      Actions.app();
    });
  }

  render() {
    const TabIcon = ({ focused, title }) => {
      let icon = '';
      let style = {};
      let color = focused ? AppColors.tabbar.iconSelected : AppColors.tabbar.iconDefault;
      switch (title) {
        case 'Statistics':
          icon = focused ? 'ios-analytics' : 'ios-analytics-outline';
          break;
        case 'Settings':
          icon = focused ? 'ios-settings' : 'ios-settings-outline';
          break;
        case 'Register':
          icon = 'ios-checkmark';
          color = AppColors.tabbar.iconMiddleColor;
          style = {backgroundColor: AppColors.tabbar.iconMiddleBg, height: 56, width: 56, paddingLeft: 20, paddingTop: 10, borderRadius: 28, overflow: 'hidden', bottom: 5, position: 'absolute'};
      }
      return (
        <Text style={style}><Icon name={icon} size={36} color={color} /></Text>
      );
    };
    return (
      <Router {...this.state}>
        <Lightbox>
          <Scene component={Launch} on={userStore.load} hideNavBar success="doCheck" failure="loginForm" />
          <Stack {...AppConfig.navbarProps}>
            <Scene
              key="login"
              component={Login}
              type="reset"
              title="Login"
              onLogin="doAuth"
              onSignUp="signUp"
              onForgotPassword="passwordReset"
              hideNavBar
              title="SIGN IN"
            />
            <Scene key="signUp" type="reset" component={SignUp} hideNavBar title="Sign Up" />
            {/* <Scene key="passwordReset" component={PasswordReset} title="Password Reset" /> */}
            <Scene key="app" type="reset" tabs showLabel={false} hideNavBar={true} tabBarStyle={{ backgroundColor: AppColors.tabbar.background, borderTopColor: AppColors.tabbar.border }}>
              <Scene key="Statistics" title="Statistics" tabBarLabel={'Statistics'} icon={TabIcon}>
                <Scene
                  hideNavBar={true}
                  icon={TabIcon}
                  key="Statistics"
                  component={Statistics}
                  title="Statistics"
                />
              </Scene>
              <Scene key="Register" title="Register" icon={TabIcon}>
                <Scene
                  hideNavBar={true}
                  key="Register"
                  component={Register}
                  title="Register"
                  onEnter={this.registerExercise}
                  //hideTabBar={true}
                />
              </Scene>
              <Scene key="Settings" title="Settings" tabBarLabel={'Settings'} icon={TabIcon}>
                <Scene
                  hideNavBar={true}
                  key="Settings"
                  component={Settings}
                  title="SETTINGS"
                />
              </Scene>
            </Scene>
          </Stack>
          <Scene key="doCheck" on={userStore.hasCredentials} success="doAuth" failure="login" />
          <Scene key="doAuth" on={userStore.login} success="app" failure="login" />
          <Scene key="doSignUp" on={userStore.signUp} success="app" failure="signUp" />
          <Scene key="logout" on={userStore.logout} success="login" />
        </Lightbox>
      </Router>
    );
  }
}

export default App;