import React, {Component} from 'react';
import {Router, Scene} from 'react-native-router-flux';
import {ActivityIndicator} from 'react-native';
import Authentication from "./routes/Authentication";
import HomePage from "./routes/Homepage";
import Auth from "./auth";

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
                            component={HomePage}
                            initial={this.state.hasToken}
                            hideNavBar={true}
                            key='HomePage'
                            title='Home Page'
                        />
                    </Scene>
                </Router>
            )
        }
    }
}

export default App;