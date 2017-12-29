import React, {Component} from 'react';
import {
    ScrollView, Text, TouchableOpacity, View, Modal, TouchableHighlight, AsyncStorage,
    RefreshControl, Dimensions
} from 'react-native';
import {API_URL} from 'react-native-dotenv';
import {Actions} from 'react-native-router-flux';
import styles from '../styles';
import moment from "moment";
import Exercises from "../api/exercises";
import { VictoryChart, VictoryArea, VictoryZoomContainer, VictoryBrushContainer, VictoryAxis, VictoryTheme, VictoryScatter, VictoryTooltip } from "victory-native";
import { TabViewAnimated, TabBar } from "react-native-tab-view";
import ChartContainer from '../components/chart';

import { colors } from '../helpers/colors';

const initialLayout = {
    height: 0,
    width: Dimensions.get('window').width,
  };

class Statistics extends Component {

    constructor(prop) {
        super(prop);
        this.date = new Date();
        this.weekOfMonth = (0 | this.date.getDate() / 7)+1;
        this.currentYear = this.date.getFullYear();
        this.state = {
            exercises: [],
            exercisesLoaded: false,
            averageWeek: 0,
            averageMonth: 0,
            averageHalfYear: 0,
            averageLastMonth: 0,
            showRegisterModal: false,
            refreshing: false,
            index: 0,
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
            ]
        };
        this.exercises = new Exercises();
    }

    _handleIndexChange = index => {
        this.setState({
            index: index
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
        this.getExercises();
        setTimeout(()=> {
            this.setState({
                index: this.date.getMonth()
            });
        }, 1);
    }

    getExercises() {
        AsyncStorage.getItem('api/token').then((token) => {
            this.exercises.getAll(token)
                .then((exercises) => {
                    exercises = this.formatDate(exercises);
                    this.setState({
                        exercises: exercises,
                        exercisesLoaded: true
                    });
                    this.setAverage();
                });
        });
    }

    registerActivityModal(visible) {
        this.setState({showRegisterModal: visible});
    }

    formatDate(objects) {
        if(objects) {
            objects.map((object) => {
                object.date = moment(object.created_at).format('YYYY-MM-DD HH:mm:ss');
                object.count = 1;
            });
        }
        return objects;
    }

    static calculateAverage(elements, duration) {
        const formatted = elements.map(elem => {
            return {date: moment(elem.date).startOf(duration).format('YYYY-MM-DD'), count: elem.count};
        });

        const dates = formatted.map(elem => elem.date);
        const uniqueDates = dates.filter((date, index) => dates.indexOf(date) === index);

        return uniqueDates.map(date => {
            const count = formatted.filter(elem => elem.date === date).reduce((count) => count + 1, 0);
            return {date, count};
        });
    }

    static average(elements) {
        return elements.reduce((count, elem) => count + elem.count, 0) / elements.length;
    }

    setAverage() {
        let today = moment();
        let lastMonth =  moment().subtract(1, 'months');
        let sixMonthsAgo = moment().subtract(6, 'months');
        let exercises = this.state.exercises;
        let thisMonthExercises = [];
        let lastMonthExercises = [];
        let lastSixMonthsExercises = [];
        exercises.forEach(exercise => {
            let compareDate = moment(exercise.created_at, 'YYYY-MM-DD');
            // THIS MONTH
            let thisStart = moment(today.startOf('month')).format('YYYY-MM-DD');
            let thisEnd = moment(today.endOf('month')).format('YYYY-MM-DD');
            if(compareDate.isBetween(thisStart, thisEnd, 'days', true)) {
                thisMonthExercises.push(exercise);
            }
            // LAST MONTH
            let start = moment(lastMonth.startOf('month')).format('YYYY-MM-DD');
            let end = moment(lastMonth.endOf('month')).format('YYYY-MM-DD');
            if(compareDate.isBetween(start, end, 'days', true)) {
                lastMonthExercises.push(exercise);
            }
            // LAST 6 MONTHS
            if(compareDate.isAfter(moment(sixMonthsAgo.startOf('month')).format('YYYY-MM-DD'))) lastSixMonthsExercises.push(exercise);
        });
        //let averageMonths = Statistics.calculateAverage(exercises, 'month');
        let weeksLastMonth = moment(moment(lastMonth.endOf('month')) - moment(lastMonth.startOf('month'))).weeks();
        let weeksPassedHalfYear = today.diff(moment().subtract(6, 'months'), 'weeks');
        let averageWeeks = Statistics.calculateAverage(exercises, 'week');
        let passedWeeks = moment().week();
        //let passedMonths = moment().month();
        this.setState({
            averageMonth: (thisMonthExercises.length / this.weekOfMonth).toFixed(1),//(Math.floor(Statistics.average(averageMonths)) / passedMonths).toFixed(1),
            averageWeek: (Math.floor(Statistics.average(averageWeeks) || 0) / passedWeeks).toFixed(1),
            averageLastMonth: (lastMonthExercises.length / weeksLastMonth).toFixed(1),
            averageHalfYear: (lastSixMonthsExercises.length / weeksPassedHalfYear).toFixed(1)
        });
    }

    _onRefresh() {
        this.setState({refreshing: true, exercises: [], exercisesLoaded: false});
        AsyncStorage.getItem('token').then((token) => {
            this.exercises.checkUpdates(token)
                .then((exercises) => {
                    if(exercises) {
                        console.log(exercises);
                        exercises = this.formatDate(exercises);
                        this.setState({
                            exercises: exercises,
                            exercisesLoaded: true
                        });
                        Actions.refresh({exercises: exercises});
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
                            tintColor={colors.purple}
                            title="Loading exercises..."
                        />
                    }
                >
                    <Text style={styles.h4}>{'Your Exercise Log'.toUpperCase()}</Text>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{width: "33.3%", paddingLeft: 25}}>
                            <Text style={styles.statsTitle}>Last Month</Text>
                            <Text style={styles.purpleText}><Text style={styles.statsNumber}>{this.state.averageLastMonth}</Text><Text>/week</Text></Text>
                        </View>
                        <View style={{width: "33.3%", paddingLeft: 25}}>
                            <Text style={styles.statsTitle}>Last 6 Months</Text>
                            <Text style={styles.purpleText}><Text style={styles.statsNumber}>{this.state.averageHalfYear}</Text><Text>/week</Text></Text>
                        </View>
                        <View style={{width: "33.3%", paddingLeft: 25}}>
                            <Text style={styles.statsTitle}>This Year</Text>
                            <Text style={styles.purpleText}><Text style={styles.statsNumber}>{this.state.averageWeek}</Text><Text>/week</Text></Text>
                        </View>
                    </View>
                </ScrollView>
                <Text style={styles.h3}>{this.currentYear}</Text>
                <Text style={styles.sub}>Average current month: {this.state.averageMonth}</Text>
                <TabViewAnimated
                    style={[styles.tabcontainer, {opacity: this.state.exercisesLoaded ? 1 : 0}]}
                    navigationState={this.state}
                    renderScene={this._renderScene}
                    renderHeader={this._renderHeader}
                    onIndexChange={this._handleIndexChange}
                    initialLayout={initialLayout}
                />
                {
                    this.state.exercisesLoaded ? 
                    <ChartContainer selectedTab={this.state.index} exercises={this.state.exercises} tabs={this.state.routes} /> 
                    : 
                    <View style={{flex: 1.7}}><Text>LOADING DATA...</Text></View> 
                }
            </View>
        );
    }
}

export default Statistics;