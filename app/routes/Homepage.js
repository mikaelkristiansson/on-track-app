import React, {Component} from 'react';
import {ScrollView, Text, TouchableOpacity, View, Modal, TouchableHighlight, AsyncStorage} from 'react-native';
import {API_URL} from 'react-native-dotenv';
import {Actions} from 'react-native-router-flux';
import styles from './styles';
import moment from "moment";
import Auth from "../auth";
import Exercises from "../api/exercises";

class HomePage extends Component {

    constructor() {
        super();
        this.state = {
            exercises: [],
            averageWeek: 0,
            averageMonth: 0,
            showRegisterModal: false
        };
        this.auth = new Auth();
        this.exercises = new Exercises();
    }

    componentDidMount() {
        this.getExercises();
    }

    getExercises() {
        AsyncStorage.getItem('token').then((token) => {
            this.exercises.getAll(token)
                .then((exercises) => {
                    console.log(exercises);
                    exercises = this.formatDate(exercises);
                    this.setState({
                        exercises: exercises
                    });
                    this.setAverage();
                });
        });
    }

    registerActivityModal(visible) {
        this.setState({showRegisterModal: visible});
    }

    register() {
        AsyncStorage.getItem('token').then((token) => {
            this.exercises.create(token)
                .then((exercise) => {
                    let newExercise = this.formatDate([exercise])[0];
                    this.setState({
                        exercises: [...this.state.exercises, newExercise]
                    });
                    this.setAverage();
                });
        });
    }

    formatDate(objects) {
        objects.map((object) => {
            object.date = moment(object.created_at).format('YYYY-MM-DD HH:mm:ss');
            object.count = 1;
        });
        return objects;
    }

    static calculateAverage(elements, duration) {
        const formatted = elements.map(elem => {
            return {date: moment(elem.date).startOf(duration).format('YYYY-MM-DD'), count: elem.count}
        });

        const dates = formatted.map(elem => elem.date);
        const uniqueDates = dates.filter((date, index) => dates.indexOf(date) === index);

        return uniqueDates.map(date => {
            const count = formatted.filter(elem => elem.date === date).reduce((count) => count + 1, 0);
            return {date, count}
        });
    }

    static average(elements) {
        return elements.reduce((count, elem) => count + elem.count, 0) / elements.length;
    }

    setAverage() {
        let exercises = this.state.exercises;
        let averageMonths = HomePage.calculateAverage(exercises, 'month');
        let averageWeeks = HomePage.calculateAverage(exercises, 'week');
        let passedWeeks = moment().week();
        let passedMonths = moment().month();
        this.setState({
            averageMonth: (Math.floor(HomePage.average(averageMonths)) / passedMonths).toFixed(1),
            averageWeek: (Math.floor(HomePage.average(averageWeeks)) / passedWeeks).toFixed(1)
        });
    }

    userLogOut() {
        Auth.signOut()
            .then(() => Actions.Authentication())
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    {/*{this.state.exercises.length ? this.state.exercises.map((exercise, index) => <Text
                        key={index}>{exercise.created_at}</Text>) : <Text>ad</Text>}*/}
                    <Text style={styles.bold}>Yearly</Text>
                    <Text>Average Month: {this.state.averageMonth}</Text>
                    <Text>Average Week: {this.state.averageWeek}</Text>
                </ScrollView>
                <TouchableOpacity style={styles.buttonContainer} onPress={() => {
                    this.register()
                    //this.registerActivityModal(true)
                }}>
                    <Text style={styles.button}> Register Activity </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonWrapper} onPress={this.userLogOut}>
                    <Text style={styles.buttonText}> Log out </Text>
                </TouchableOpacity>
                <Modal
                    animationType="fade"
                    transparent={false}
                    visible={this.state.showRegisterModal}
                    presentationStyle='formSheet'
                    onRequestClose={() => {
                        alert("Modal has been closed.")
                    }}
                >
                    <View style={{marginTop: 22}}>
                        <View>
                            <Text>Hello World!</Text>

                            <TouchableHighlight onPress={() => {
                                this.registerActivityModal(!this.state.showRegisterModal)
                            }}>
                                <Text>Hide Modal</Text>
                            </TouchableHighlight>

                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

export default HomePage;