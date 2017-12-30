import React, {Component} from 'react';
import {Router, Scene, Lightbox, Stack, Actions} from 'react-native-router-flux';
import {Text, View, AsyncStorage} from 'react-native';
// import {ActivityIndicator} from 'react-native';
// import Auth from "./auth";
// import RenderComponent from './components/render';
import Icon from "react-native-vector-icons/Ionicons";

import userStore from './stores/userStore';

import Launch from './routes/Launch';
import Login from './routes/Login';
import Statistics from './routes/Statistics';
import Settings from './routes/Settings';
import Register from './routes/Register';
import Exercises from "./api/exercises";

import { colors } from "./helpers/colors";

class App extends Component {

    constructor(prop) {
        super(prop);
        this.state = {
            newExercises: []
        };
        this.registerExercise = this.registerExercise.bind(this);
        this.test = this.test.bind(this);
        this.exercises = new Exercises();
    }

    registerExercise() {
        userStore.loadToken().then((token) => {
            this.exercises.create(token)
                .then((exercise) => {
                    // this.setState({
                    //     newExercises: [exercise]
                    // });
                    //Actions.pop();
                    Actions.app();
                    //Actions.refresh({newExercises: exercise});
                });
        });
    }

    test() {
        //alert('ttt');
        Actions.pop();
    }

    render() {
        const TabIcon = ({ focused, title }) => {
            let icon = '';
            let st = {};
            let color = focused ? colors.purple : colors.darkGray;
            switch (title) {
                case 'Statistics':
                    icon = focused ? 'ios-analytics' : 'ios-analytics-outline';
                    break;
                case 'Settings':
                    icon = focused ? 'ios-settings' : 'ios-settings-outline';
                    break;
                case 'Register':
                    icon = 'ios-checkmark';
                    color = '#fff';
                    st = {backgroundColor: colors.red, height: 56, width: 56, paddingLeft: 20, paddingTop: 10, borderRadius: 28, overflow: 'hidden', bottom: 5, position: 'absolute'};
            }
            return (
                <Text style={st}><Icon name={icon} size={36} color={color} /></Text>
            );
        };
        return (
            <Router {...this.state}>
                <Lightbox>
                    <Scene component={Launch} on={userStore.load} hideNavBar success="doCheck" failure="loginForm" />
                    <Stack>
                        <Scene
                            key="login"
                            component={Login}
                            type="reset"
                            title="Login"
                            onLogin="doAuth"
                            onSignUp="signUp"
                            onForgotPassword="passwordReset"
                            hideNavBar={true}
                        />
                        {/* <Scene key="signUp" component={SignUp} title="Sign Up" />
                        <Scene key="passwordReset" component={PasswordReset} title="Password Reset" /> */}
                        <Scene key="app" type="reset" tabs showLabel={false} hideNavBar={true} tabBarStyle={{ backgroundColor: colors.tabBackground, borderTopColor: colors.tabBorder }}>
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
                                    //registerExercise={this.registerExercise}
                                    //hideTabBar={true}
                                />
                            </Scene>
                            <Scene key="Settings" title="Settings" tabBarLabel={"Settings"} icon={TabIcon}>
                                <Scene
                                    hideNavBar={true}
                                    key="Settings"
                                    component={Settings}
                                    title="Settings"
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
    // constructor() {
    //     super();
    //     this.state = {hasToken: false, isLoaded: false};
    //     this.auth = new Auth();
    // }

    // componentWillMount() {
    //     this.auth.checkIfLoggedIn()
    //         .then((token) => {
    //             this.setState({hasToken: token !== null, isLoaded: true});
    //         });
    // }

    // render() {
    //     if(this.state.isLoaded) {
    //         return (
    //             <RenderComponent hasToken={this.state.hasToken} isLoaded={this.state.isLoaded}/>
    //         );
    //     } else {
    //         return <ActivityIndicator
    //         color={colors.purple}
    //         size="large"
    //         style={{flex: 1,
    //             justifyContent: 'center',
    //             alignItems: 'center',
    //             height: 80,
    //             }}
    //     />;
    //     }
    // }
}

export default App;