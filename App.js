/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import App from "./app/index";
export default App;

/*import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Login from './app/screens/login.js';
import Secured from "./app/screens/secured.js";

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component<{}> {

  state = {
    isLoggedIn: false
  };
  render() {
    if(this.state.isLoggedIn) {
      return <Secured
          onLogoutPress={() => this.setState({isLoggedIn: false})}
      />;
    } else {
        return <Login
            onLoginPress={() => this.setState({isLoggedIn: true})}
        />;
    }
    /!*return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
      </View>
    );*!/
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});*/
