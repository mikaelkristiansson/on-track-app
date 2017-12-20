import React, {Component} from 'react';
import {
    ScrollView, Text, TouchableOpacity, View, Modal, TouchableHighlight, AsyncStorage,
    RefreshControl
} from 'react-native';
import {API_URL} from 'react-native-dotenv';
import {Actions} from 'react-native-router-flux';
import styles from './styles';
import moment from "moment";
import Auth from "../auth";
import Exercises from "../api/exercises";
import { VictoryChart, VictoryArea, VictoryZoomContainer, VictoryBrushContainer, VictoryAxis, VictoryTheme, VictoryScatter, VictoryTooltip } from "victory-native";

class Chart extends Component {

    constructor(prop) {
        super(prop);
        this.state = {
            exercises: [],
            averageWeek: 0,
            averageMonth: 0,
            showRegisterModal: false,
            refreshing: false
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
        let averageMonths = Chart.calculateAverage(exercises, 'month');
        let averageWeeks = Chart.calculateAverage(exercises, 'week');
        let passedWeeks = moment().week();
        let passedMonths = moment().month();
        this.setState({
            averageMonth: (Math.floor(Chart.average(averageMonths)) / passedMonths).toFixed(1),
            averageWeek: (Math.floor(Chart.average(averageWeeks)) / passedWeeks).toFixed(1)
        });
    }

    _onRefresh() {
        this.setState({refreshing: true});
        AsyncStorage.getItem('token').then((token) => {
            this.exercises.checkUpdates(token)
                .then((exercises) => {
                    if(exercises) {
                        exercises = this.formatDate(exercises);
                        this.setState({
                            exercises: exercises
                        });
                        this.setAverage();
                    }
                    this.setState({refreshing: false});
                });
        });
    }

    handleZoom(domain) {
        this.setState({selectedDomain: domain});
      }
    
      handleBrush(domain) {
        this.setState({zoomDomain: domain});
      }

    render() {
        let data = [
            { x: 1, y: 2 },
            { x: 2, y: 2 },
            { x: 3, y: 3 },
            { x: 4, y: 5 },
            { x: 5, y: 1 },
            { x: 6, y: 1 },
          ];
        return (
            <View style={styles.container}>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh.bind(this)}
                            tintColor={"#673AB7"}
                            title="Loading exercises..."
                        />
                    }
                >
                    {/*{this.state.exercises.length ? this.state.exercises.map((exercise, index) => <Text
                        key={index}>{exercise.created_at}</Text>) : <Text>ad</Text>}*/}
                    <Text style={styles.bold}>Yearly</Text>
                    <Text>Average Month: {this.state.averageMonth}</Text>
                    <Text>Average Week: {this.state.averageWeek}</Text>
                </ScrollView>
                <VictoryChart padding={{ top: 45, bottom: 0, left: -20, right: -20 }}>
                <VictoryArea
                    style={{
                        data: {
                          fill: "#FA3D4B", fillOpacity: 0.9, stroke: "#FA3D4B", strokeOpacity: 0.9, strokeWidth: 0
                        },
                        labels: {fill: "transparent"}
                      }}
                    interpolation={"monotoneX"}
                    categories={{
                        x: ["","WEEK 1", "WEEK 2", "WEEK 3", "WEEK 4", ""]
                    }}
                    labels={(d) => d.y}
                    data={data}
                    events={[{
                        target: "data",
                        eventHandlers: {
                            onPressIn: () => {
                            return [
                              {
                                target: "data",
                                mutation: () => {}
                              }, {
                                target: "labels",
                                mutation: () => ({ active: true, style: {fill: "red"} })
                              }
                            ];
                          },
                          onPressOut: () => {
                            return [
                              {
                                target: "data",
                                mutation: () => {}
                              }, {
                                target: "labels",
                                mutation: () => ({ active: false })
                              }
                            ];
                          }
                        }
                      }]}
                />
                <VictoryAxis
                    orientation="top"
                    style={{
                        axis: { stroke: "transparent", strokeWidth: 0 },
                        ticks: {
                            size: 15
                        },
                        tickLabels: {
                            fill: (tick) =>
                            tick === 4 ? "red" : "#D0D1D5",
                            fontFamily: "inherit",
                            fontSize: 14,
                            marginBottom: 60
                          }
                    }}
                />
                <VictoryScatter
                    style={{
                        data: {
                            fill: "#FA3D4B", fillOpacity: 1, stroke: "#fff", strokeWidth: 6
                        }
                    }}
                    size={9}
                    data={data}
                />
    
              </VictoryChart>
                {/* <TouchableOpacity style={styles.buttonContainer} onPress={() => {
                    this.register()
                    //this.registerActivityModal(true)
                }}>
                    <Text style={styles.button}> Register Activity </Text>
                </TouchableOpacity> */}
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

export default Chart;