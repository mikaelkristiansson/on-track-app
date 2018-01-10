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
import { AppColors } from './theme';

class App extends Component {
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
    exerciseStore.save().then((exercise) => {
      const exercises = this.state.exercises.concat([exercise]);
      this.setState({
        exercises: exercises
      });
    });
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

  signUp = (email, password, firstName, lastName) => {
    // TODO: add loading indicator
    userStore.signUp({email: email, password: password, firstName: firstName, lastName: lastName}).then((res) => {
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
            signUp: (email, password, firstName, lastName) => this.signUp(email,password, firstName, lastName),
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

export default App;