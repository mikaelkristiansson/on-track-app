import React, {Component} from 'react';
import {Router, Scene, Actions} from 'react-native-router-flux';
import {ActivityIndicator, Text, View} from 'react-native';
import Authentication from "./routes/Authentication";
import Auth from "./auth";
import Statistics from "./routes/Statistics";
import Settings from "./routes/Settings";
import Icon from "react-native-vector-icons/Ionicons";
import RegisterButton from './components/registerButton';
import RenderComponent from './components/render';

const purple = "#673AB7";
const red = "#FA3D4B";

class App extends Component {
    constructor() {
        super();
        this.state = {hasToken: false, isLoaded: false};
        this.auth = new Auth();
    }

    componentWillMount() {
        this.auth.checkIfLoggedIn()
            .then((token) => {
                this.setState({hasToken: token !== null, isLoaded: true});
            });
    }

    render() {
        if(this.state.isLoaded) {
            return (
                <RenderComponent hasToken={this.state.hasToken} isLoaded={this.state.isLoaded}/>
            );
        } else {
            return <ActivityIndicator
            color={purple}
            size="large"
            style={{flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                height: 80,
                }}
        />;
        }
    }
}

export default App;