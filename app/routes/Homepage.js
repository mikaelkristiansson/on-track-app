import React from 'react';
import {Router, Scene} from "react-native-router-flux";
import Statistics from "./Statistics";
import Settings from "./Settings";
import {Text} from "react-native";

const TabIcon = ({ selected, title }) => {
    return (
        <Text style={{color: selected ? 'red' :'black'}}>{title}</Text>
    );
};

const HomePage = () => {
    return (
        <Router>
            <Scene key="root">
                {/* Tab Container */}
                <Scene
                    key="tabbar"
                    tabs={true}
                    tabBarStyle={{ backgroundColor: '#FFFFFF' }}
                >
                    {/* Tab and it's scenes */}
                    <Scene key="osu" title="OSU" icon={TabIcon}>
                        <Scene
                            key="scarlet"
                            component={Statistics}
                            title="Scarlet"
                        />
                        <Scene
                            key="gray"
                            component={Settings}
                            title="Gray"
                        />
                    </Scene>
                    {/* Removed for brevity */}
                </Scene>
            </Scene>
        </Router>
    );
};

export default HomePage;