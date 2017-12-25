import React, {Component} from 'react';
import {Router, Scene} from 'react-native-router-flux';
import {ActivityIndicator, Text} from 'react-native';
import Authentication from "./routes/Authentication";
import Auth from "./auth";
import Statistics from "./routes/Statistics";
import Settings from "./routes/Settings";
import Icon from "react-native-vector-icons/Ionicons";

class App extends Component {
    constructor() {
        super();
        this.state = {hasToken: false, isLoaded: false};
        this.auth = new Auth();
    }

    componentWillMount() {
        /*AsyncStorage.getItem('token').then((token) => {
            this.setState({ hasToken: token !== null, isLoaded: true });
        });*/
        this.auth.checkIfLoggedIn()
            .then((token) => {
                this.setState({hasToken: token !== null, isLoaded: true});
            });
    }

    render() {
        if (!this.state.isLoaded) {
            return (
                <ActivityIndicator/>
            )
        } else {
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
                let color = focused ? '#673AB7' : '#333';
                return (
                    <Text><Icon name={icon} size={36} color={color} /></Text>
                );
            };
            return (
                <Router>
                    <Scene key='root'>
                        <Scene
                            component={Authentication}
                            hideNavBar={true}
                            initial={!this.state.hasToken}
                            key='Authentication'
                            title='Authentication'
                        />
                        <Scene
                            key="tabbar"
                            tabs={true}
                            tabBarStyle={{ backgroundColor: '#F5FCFF', borderTopColor: "#eee" }}
                            initial={this.state.hasToken}
                            hideNavBar={true}
                            activeTintColor={"#673AB7"}
                            showLabel={false} 
                        >
                            {/* Tab and it's scenes */}
                            <Scene key="Statistics" title="Statistics" tabBarLabel={"Statistics"} icon={TabIcon}>
                                <Scene
                                    hideNavBar={true}
                                    key="Statistics"
                                    component={Statistics}
                                    title="Statistics"
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
                        {/*<Scene
                            component={HomePage}
                            initial={this.state.hasToken}
                            hideNavBar={true}
                            key='HomePage'
                            title='Home Page'
                        />*/}
                    </Scene>
                </Router>
            )
        }
    }
}

export default App;