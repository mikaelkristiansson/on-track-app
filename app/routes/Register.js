import React, {Component} from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';

const { height: deviceHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      offset: new Animated.Value(-deviceHeight)
    };
  }

  componentDidMount() {
    Animated.timing(this.state.offset, {
      duration: 150,
      toValue: 0
    }).start();
  }

  closeModal() {
    this.props.registerExercise();
    Actions.pop();
    // Animated.timing(this.state.offset, {
    //   duration: 150,
    //   toValue: -deviceHeight
    // }).start(Actions.pop);
  }

  render() {
    return (
      <Animated.View style={[styles.container, { backgroundColor: 'rgba(52,52,52,0.5)' }]}>
        <View style={{
          width: 250,
          height: 250,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
          borderRadius: 5
        }}>
          <Text>asd</Text>
          <Button onPress={this.closeModal.bind(this)} title="Close"/>
        </View>
      </Animated.View>
    );
  }
}