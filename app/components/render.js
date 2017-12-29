import React, {Component} from 'react';
import {Router, Scene, Actions} from 'react-native-router-flux';
import {ActivityIndicator, Text, View, AsyncStorage} from 'react-native';
import Authentication from "../routes/Authentication";
import Statistics from "../routes/Statistics";
import Settings from "../routes/Settings";
import Exercises from "../api/exercises";
import Icon from "react-native-vector-icons/Ionicons";
import RegisterButton from './registerButton';

const purple = "#673AB7";
const red = "#FA3D4B";

class RenderComponent extends Component {

    constructor(prop) {
        super(prop);
        this.state = {
            hasToken: prop.hasToken,
            isLoaded: prop.isLoaded,
            isAuthenticated: prop.hasToken,
            newExercises: []
        };
        this.registerExercise = this.registerExercise.bind(this);
        this.exercises = new Exercises();
    }

    registerExercise() {
        AsyncStorage.getItem('token').then((token) => {
            this.exercises.create(token)
                .then((exercise) => {
                    this.setState({
                        newExercises: [exercise]
                    });
                    //Actions.refresh({newExercises: exercise});
                });
        });
    }

    render() {
        const TabIcon = ({ focused, title }) => {
            let icon = '';
            switch (title) {
                case 'Statistics':
                    icon = focused ? 'ios-analytics' : 'ios-analytics-outline';
                    break;
                case 'Settings':
                    icon = focused ? 'ios-settings' : 'ios-settings-outline';
                    break;
            }
            let color = focused ? purple : '#333';
            return (
                <Text><Icon name={icon} size={36} color={color} /></Text>
            );
        };
        return (
            <View style={{flex: 1}}>
            <Router {...this.state}>
                <Scene key='root'>
                    <Scene
                        component={Authentication}
                        hideNavBar={true}
                        initial={!this.state.hasToken}
                        key='Authentication'
                        title='Authentication'
                        onEnter={(route) => this.state.isAuthenticated ? this.setState({isAuthenticated:false}) : '' }
                    />
                    <Scene
                        key="tabbar"
                        tabs={true}
                        tabBarStyle={{ backgroundColor: '#fff', borderTopColor: "#eee" }}
                        initial={this.state.hasToken}
                        hideNavBar={true}
                        activeTintColor={purple}
                        showLabel={false}
                    >
                        {/* Tab and it's scenes */}
                        <Scene key="Statistics" title="Statistics" tabBarLabel={"Statistics"} icon={TabIcon}>
                            <Scene
                                hideNavBar={true}
                                key="Statistics"
                                component={Statistics}
                                title="Statistics"
                                onEnter={(route) => {
                                    console.log('route:',route, this.state);
                                    if(!this.state.isAuthenticated) {
                                        this.setState({isAuthenticated:true});
                                    }
                                }}
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
                </Scene>
            </Router>
            {this.state.isAuthenticated ?
            <RegisterButton registerExercise={this.registerExercise}/>
            :
            <Text style={{display: 'none'}} />
            }
            </View>
        );
    }
}

export default RenderComponent;