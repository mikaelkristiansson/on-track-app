import React, {Component} from 'react';
import {Alert, AsyncStorage, Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import styles from './styles';

class HomePage extends Component {

    constructor() {
        super();
        this.state = {exercises: []};
    }

    componentDidMount() {
        this.getExercises('month', '2017-11-01');
    }

    getExercises(type, date) {
        AsyncStorage.getItem('token').then((token) => {
            fetch(`http://localhost:3000/api/exercises/${type}?date=${date}`, {
                method: 'GET',
                headers: { 'Authorization': 'Bearer ' + token }
            })
                .then((response) => response.json())
                .then((exercises) => {
                    this.setState({
                        exercises: exercises
                    });
                })
                .done();
        })
    }

    userLogout() {
        Actions.Authentication();
    }

    async userLogout() {
        try {
            await AsyncStorage.removeItem('token');
            Actions.Authentication();
        } catch (error) {
            console.log('AsyncStorage error: ' + error.message);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    {this.state.exercises.length ? this.state.exercises.map((exercise, index) => <Text key={index}>{exercise.created_at}</Text>) : <Text>ad</Text>}
                </ScrollView>
                <TouchableOpacity style={styles.buttonContainer}>
                    <Text style={styles.button}> Create Activity </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonWrapper} onPress={this.userLogout}>
                    <Text style={styles.buttonText} > Log out </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default HomePage;