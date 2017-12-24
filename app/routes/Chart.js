import React, {Component} from 'react';
import {
    ScrollView, Text, TouchableOpacity, View, Modal, TouchableHighlight, AsyncStorage,
    RefreshControl, Dimensions
} from 'react-native';
import {API_URL} from 'react-native-dotenv';
import {Actions} from 'react-native-router-flux';
import styles from '../styles';
import moment from "moment";
import Auth from "../auth";
import Exercises from "../api/exercises";
import { VictoryChart, VictoryArea, VictoryZoomContainer, VictoryBrushContainer, VictoryAxis, VictoryTheme, VictoryScatter, VictoryTooltip } from "victory-native";
import { TabViewAnimated, TabBar } from "react-native-tab-view";
import ChartContainer from '../components/chart';

const initialLayout = {
    height: 0,
    width: Dimensions.get('window').width,
  };

class Chart extends Component {

    constructor(prop) {
        super(prop);
        this.state = {
            exercises: [],
            averageWeek: 0,
            averageMonth: 0,
            showRegisterModal: false,
            refreshing: false,
            index: 1,
            routes: [
                { key: '1', title: 'January' },
                { key: '2', title: 'February' },
                { key: '3', title: 'Mars' },
                { key: '4', title: 'April' },
                { key: '5', title: 'May' },
                { key: '6', title: 'June' },
                { key: '7', title: 'July' },
                { key: '8', title: 'August' },
                { key: '9', title: 'September' },
                { key: '10', title: 'October' },
                { key: '11', title: 'November' },
                { key: '12', title: 'December' },
            ],
        };
        this.auth = new Auth();
        this.exercises = new Exercises();
        this.date = new Date();
        this.weekOfMonth = (0 | this.date.getDate() / 7)+1;
    }

      _handleIndexChange = index => {
        this.setState({
            index,
        });
      }

  _renderHeader = props => (
    <TabBar
      {...props}
      scrollEnabled
      indicatorStyle={styles.indicator}
      style={styles.tabbar}
      tabStyle={styles.tab}
      labelStyle={styles.label}
    />
  );

  _renderScene = ({ route }) => {
    
  };

    componentDidMount() {
        this.setState({
            index: this.date.getMonth()
        });
        this.getExercises();
    }

    getExercises() {
        AsyncStorage.getItem('token').then((token) => {
            this.exercises.getAll(token)
                .then((exercises) => {
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

    render() {
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
                    <Text style={styles.h4}>{'Your Exercise Log'.toUpperCase()}</Text>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{width: "33.3%", paddingLeft: 25}}>
                            <Text style={styles.statsTitle}>Last Month</Text>
                            <Text style={styles.purpleText}><Text style={styles.statsNumber}>0.8</Text><Text>/week</Text></Text>
                        </View>
                        <View style={{width: "33.3%", paddingLeft: 25}}>
                            <Text style={styles.statsTitle}>Last 6 Months</Text>
                            <Text style={styles.purpleText}><Text style={styles.statsNumber}>1.2</Text><Text>/week</Text></Text>
                        </View>
                        <View style={{width: "33.3%", paddingLeft: 25}}>
                            <Text style={styles.statsTitle}>This Year</Text>
                            <Text style={styles.purpleText}><Text style={styles.statsNumber}>{this.state.averageWeek}</Text><Text>/week</Text></Text>
                        </View>
                    </View>
                </ScrollView>
                <TabViewAnimated
                    style={[styles.tabcontainer]}
                    navigationState={this.state}
                    renderScene={this._renderScene}
                    renderHeader={this._renderHeader}
                    onIndexChange={this._handleIndexChange}
                    initialLayout={initialLayout}
                />
                {this.state.exercises.length ? <ChartContainer selectedTab={this.state.index} exercises={this.state.exercises} tabs={this.state.routes} /> : <Text /> }
            </View>
        );
    }
}

export default Chart;