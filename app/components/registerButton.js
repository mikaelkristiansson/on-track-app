import React, {Component} from 'react';
import {Text, View} from 'react-native';
import ActionButton from 'react-native-action-button';

const red = "#FA3D4B";

class RegisterButton extends Component {

    constructor(props) {
        super(props);
        this.registerExerciseFromChild = this.registerExerciseFromChild.bind(this);
    }

    registerExerciseFromChild() {
        this.props.registerExercise();
    }

    render() {
        return (
            // <View style={{zIndex: 99999999999999, position: 'absolute', bottom: 45}}>
            <ActionButton
                buttonColor={red} 
                position="center"
                offsetY={5}
                hideShadow={true}
                onPress={this.registerExerciseFromChild}
            />
            // </View>
        );
    }
}

export default RegisterButton;