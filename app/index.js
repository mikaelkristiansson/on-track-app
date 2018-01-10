import React, { Component } from 'react';
import {View} from 'react-native';
import { createRootNavigator } from './router';
import moment from 'moment';

// SCREENS AND COMPONENTS
import Launch from './screens/Launch';
import RegisterButton from './components/registerButton';

import userStore from './stores/userStore';
import exerciseStore from './stores/exerciseStore';

// HELPERS & THEME
import { AppConfig } from './helpers';
import { AppColors } from './theme';

export default class App extends Component {
  constructor(props) {
    super(props);
    const now = moment();
    this.state = {
      signedIn: false,
      checkedSignIn: false,
      exercises: [],
      exercisesLoaded: false,
      selectedYear: now.year()
    };
  }

  componentWillMount() {
    userStore.load().then((res) => {
      if(res) {
        const cred = {email: res.email, password: res.password};
        const hasCred = userStore.hasCredentials(cred);
        if(hasCred) {
          userStore.login(cred).then((signedIn) => {
            this.setState({ signedIn: signedIn, checkedSignIn: true});
          }).catch((error) => {
            this.setState({
              checkedSignIn: true
            });
            //alert(error);
          });
        } else {
          this.setState({
            checkedSignIn: true
          });
        }
      }
    });
  }

  loadExercises = async (year) => {
    exerciseStore.get(year).then((exercises) => {
      console.log('exercises: ',exercises);
      this.setState({
        exercises: exercises,
        exercisesLoaded: true,
        selectedYear: year
      });
    });
    return true;
  }

  registerExercise = () => {
    //alert('register');
    exerciseStore.save().then((exercise) => {
      const exercises = this.state.exercises.concat([exercise]);
      this.setState({
        exercises: exercises
      });
    });
    // exerciseStore.save().then((exercise) => {
    //   Actions.app();
    // });
  }

  signIn = (email, password) => {
    // TODO: add loading indicator
    userStore.login({email: email, password: password}).then((res) => {
      if(res) {
        this.setState({
          signedIn: res
        });
      }
    }).catch((error) => {
      // TODO: setup error handler
    });
  }

  signOut = () => {
    userStore.logout();
    this.setState({
      signedIn: false
    });
  }

  _renderRegister() {
    if (this.state.signedIn) {
      return (
        <RegisterButton registerExercise={this.registerExercise} />
      );
    } else {
      return null;
    }
  }

  render() {
    const { checkedSignIn, signedIn } = this.state;

    // If we haven't checked AsyncStorage yet, don't render anything (better ways to do this)
    if (!checkedSignIn) {
      return <Launch />;
    }

    const Layout = createRootNavigator(signedIn);
    return (
      <View style={{flex: 1}}>
        <Layout screenProps={
          {
            loadExercises: (year) => this.loadExercises(year), 
            registerExercise: () => this.registerExercise(),
            signIn: (email, password) => this.signIn(email,password),
            signOut: () => this.signOut(),
            exercisesLoaded: this.state.exercisesLoaded, 
            exercises: this.state.exercises,
            selectedYear: this.state.selectedYear,
            inputProps: {
              fontSize: 14,
              textColor: AppColors.input,
              baseColor: AppColors.textSecondary,
              tintColor: AppColors.brand.secondary
            },
          }
        } />
        {this._renderRegister()}
      </View>
    );
  }
}


// import React, {Component} from 'react';
// import {Router, Scene, Lightbox, Stack, Actions} from 'react-native-router-flux';
// import {Text, View, AsyncStorage} from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import moment from 'moment';

// // API
// import userStore from './stores/userStore';
// import exerciseStore from './stores/exerciseStore';

// // ROUTES
// import Launch from './routes/Launch';
// import Login from './routes/Login';
// import SignUp from './routes/SignUp';
// import Statistics from './routes/Statistics';
// import Settings from './routes/Settings';
// import Register from './routes/Register';


// // HELPERS & THEME
// import { AppConfig } from './helpers';
// import { AppColors } from './theme';

// class App extends Component {

//   constructor(prop) {
//     super(prop);
//     console.log(prop);
//     const now = moment();
//     this.weekOfMonth = this.setWeekOfMonth(now);
//     if (this.weekOfMonth === 5) this.weekOfMonth = 4;
//     this.currentMonth = now.month();
//     this.currentYear = now.year();
//     this.state = {
//       inputProps: {
//         fontSize: 14,
//         textColor: AppColors.input,
//         baseColor: AppColors.textSecondary,
//         tintColor: AppColors.brand.secondary
//       },
//       test: {
//         test: []
//       },
//       exercises: [],
//       exercisesLoaded: false,
//       selectedYear: now.year()
//     };

//     // BINDS
//     this.registerExercise = this.registerExercise.bind(this);
//     this.loadExercises = this.loadExercises.bind(this);
//   }

//   componentDidMount() {
//     // this.setState({
//     //   test: {
//     //     test: ['1']
//     //   }
//     // })
//   }

//   registerExercise() {
//     this.setState({
//       test: {
//         test: ['1']
//       }
//     })
//     // exerciseStore.save().then((exercise) => {
//     //   Actions.app();
//     // });
//   }

//   loadExercises() {
//     alert('gg');
//     //console.log(this.state);
//     // exerciseStore.get(this.state.selectedYear).then((exercises) => {
//     //   console.log('exercises: ',exercises);
//     //   //exercises = this.formatDate(exercises);
//     //   this.setState({
//     //     exercises: exercises,
//     //     exercisesLoaded: true
//     //   });
//     // });
//   }

//   setWeekOfMonth(m) {
//     return m.isoWeek() - moment(m).startOf('month').isoWeek() + 1;
//   }

//   render() {
//     const TabIcon = ({ focused, title }) => {
//       let icon = '';
//       let style = {};
//       let color = focused ? AppColors.tabbar.iconSelected : AppColors.tabbar.iconDefault;
//       switch (title) {
//         case 'Statistics':
//           icon = focused ? 'ios-analytics' : 'ios-analytics-outline';
//           break;
//         case 'Settings':
//           icon = focused ? 'ios-settings' : 'ios-settings-outline';
//           break;
//         case 'Register':
//           icon = 'ios-checkmark';
//           color = AppColors.tabbar.iconMiddleColor;
//           style = {backgroundColor: AppColors.tabbar.iconMiddleBg, height: 56, width: 56, paddingLeft: 20, paddingTop: 10, borderRadius: 28, overflow: 'hidden', bottom: 5, position: 'absolute'};
//       }
//       return (
//         <Text style={style}><Icon name={icon} size={36} color={color} /></Text>
//       );
//     };
//     return (
//       <Router {...this.state}>
//         <Lightbox>
//           <Scene component={Launch} on={userStore.load} hideNavBar success="doCheck" failure="loginForm" />
//           <Stack>
//             <Scene
//               key="login"
//               component={Login}
//               type="reset"
//               title="Login"
//               onLogin="doAuth"
//               onSignUp="signUp"
//               onForgotPassword="passwordReset"
//               hideNavBar
//               title="SIGN IN"
//             />
//             <Scene key="signUp" type="reset" component={SignUp} hideNavBar title="Sign Up" />
//             {/* <Scene key="passwordReset" component={PasswordReset} title="Password Reset" /> */}
//             <Scene key="app" type="reset" tabs showLabel={false} hideNavBar={true} tabBarStyle={{ backgroundColor: AppColors.tabbar.background, borderTopColor: AppColors.tabbar.border }}>
//               <Scene key="Statistics" title="Statistics" tabBarLabel={'Statistics'} icon={TabIcon}>
//                 <Scene
//                   hideNavBar={true}
//                   icon={TabIcon}
//                   key="Statistics"
//                   component={Statistics}
//                   title="Statistics"
//                   loadExercises={this.loadExercises}
//                 />
//               </Scene>
//               <Scene key="Register" title="Register" icon={TabIcon}>
//                 <Scene
//                   hideNavBar={true}
//                   key="Register"
//                   component={Register}
//                   title="Register"
//                   onEnter={this.registerExercise}
//                   //hideTabBar={true}
//                 />
//               </Scene>
//               <Scene key="Settings" title="Settings" tabBarLabel={'Settings'} icon={TabIcon}>
//                 <Scene
//                   hideNavBar={true}
//                   key="Settings"
//                   component={Settings}
//                   title="SETTINGS"
//                 />
//               </Scene>
//             </Scene>
//           </Stack>
//           <Scene key="doCheck" on={userStore.hasCredentials} success="doAuth" failure="login" />
//           <Scene key="doAuth" on={userStore.login} success="app" failure="login" />
//           <Scene key="doSignUp" on={userStore.signUp} success="app" failure="signUp" />
//           <Scene key="logout" on={userStore.logout} success="login" />
//         </Lightbox>
//       </Router>
//     );
//   }
// }

// export default App;