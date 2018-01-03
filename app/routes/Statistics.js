import React, {Component} from 'react';
import {
  ScrollView, Text, TouchableOpacity, View, Modal, TouchableWithoutFeedback, AsyncStorage,
  RefreshControl, Dimensions, Picker
} from 'react-native';
import {API_URL} from 'react-native-dotenv';
import {Actions} from 'react-native-router-flux';
import styles from '../styles';
import moment from 'moment';
//import Exercises from '../api/exercises';
import { VictoryChart, VictoryArea, VictoryZoomContainer, VictoryBrushContainer, VictoryAxis, VictoryTheme, VictoryScatter, VictoryTooltip } from 'victory-native';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import ChartContainer from '../components/chart';

import { colors } from '../helpers/colors';
import exerciseStore from '../stores/exerciseStore';

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
      modalVisible: false,
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
      ],
      selectedYear: this.date.getFullYear(),
      availableYears: [{'label': '2017', value: 2017},
        {'label': '2018', value: 2018}]
    };
  }

    _handleIndexChange = index => {
      this.setState({
        index: index
      });
    };

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

  _renderScene = ({ route }) => {};

  componentDidMount() {
    this.getExercises();
    setTimeout(()=> {
      this.setState({
        index: this.date.getMonth()
      });
    }, 1);
  }

  getExercises() { 
    exerciseStore.get(this.currentYear).then((exercises) => {
      console.log('exercises: ',exercises);
      //exercises = this.formatDate(exercises);
      this.setState({
        exercises: exercises,
        exercisesLoaded: true
      });
      this.setAverage();
    });
  }

  updateYear(year) {
    this.setState({selectedYear: year, exercises: [], exercisesLoaded: false});
    exerciseStore.get(year).then((exercises) => {
      this.setState({
        exercises: exercises,
        exercisesLoaded: true
      });
    });
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
      return {created_at: moment(elem.created_at).startOf(duration).format('YYYY-MM-DD'), count: elem.count};
    });

    const dates = formatted.map(elem => elem.created_at);
    const uniqueDates = dates.filter((created_at, index) => dates.indexOf(created_at) === index);

    return uniqueDates.map(created_at => {
      const count = formatted.filter(elem => elem.created_at === created_at).reduce((count) => count + 1, 0);
      return {created_at, count};
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
    let weeksLastMonth = moment(moment(lastMonth.endOf('month')) - moment(lastMonth.startOf('month'))).isoWeeks();
    let weeksPassedHalfYear = today.diff(moment().subtract(6, 'months'), 'weeks');
    let averageWeeks = Statistics.calculateAverage(exercises, 'week');
    let passedWeeks = moment().isoWeek();
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
    exerciseStore.get(this.currentYear).then((exercises) => {
      if(exercises) {
        //exercises = this.formatDate(exercises);
        this.setState({
          exercises: exercises,
          exercisesLoaded: true,
          selectedYear: this.currentYear,
          index: this.date.getMonth()
        });
        Actions.refresh({exercises: exercises});
        this.setAverage();
      }
      this.setState({refreshing: false});
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
          <Text style={styles.h4}>{'Your Exercise Log '.toUpperCase() + this.currentYear}</Text>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{width: '33.3%', paddingLeft: 25}}>
              <Text style={styles.statsTitle}>Last Month</Text>
              <Text style={styles.purpleText}><Text style={styles.statsNumber}>{this.state.averageLastMonth}</Text><Text>/week</Text></Text>
            </View>
            <View style={{width: '33.3%', paddingLeft: 25}}>
              <Text style={styles.statsTitle}>Last 6 Months</Text>
              <Text style={styles.purpleText}><Text style={styles.statsNumber}>{this.state.averageHalfYear}</Text><Text>/week</Text></Text>
            </View>
            <View style={{width: '33.3%', paddingLeft: 25}}>
              <Text style={styles.statsTitle}>This Year</Text>
              <Text style={styles.purpleText}><Text style={styles.statsNumber}>{this.state.averageWeek}</Text><Text>/week</Text></Text>
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity
          onPress={() => this.setState({ modalVisible: true })}
        >
          <Text style={styles.h3}>{this.state.selectedYear}</Text>
        </TouchableOpacity>
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
            <ChartContainer selectedYear={this.state.selectedYear} selectedTab={this.state.index} exercises={this.state.exercises} tabs={this.state.routes} /> 
            : 
            <View style={{flex: 1.7}}><Text>LOADING DATA...</Text></View> 
        }
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}>
          <TouchableWithoutFeedback
            onPress={() => this.setState({ modalVisible: false })}>
            <View style={styles.pickerModalContainer}>
              <View style={styles.pickerButtonContainer}>
                <Text
                  style={{ color: colors.red }}
                  onPress={() => this.setState({ modalVisible: false })}>
                    Done
                </Text>
              </View>
              <View>
                <Picker
                  style={styles.modalPicker}
                  selectedValue={this.state.selectedYear}
                  onValueChange={(itemValue, itemIndex) => this.updateYear(itemValue)}>
                  {this.state.availableYears.map((i, index) => (
                    <Picker.Item
                      key={index}
                      label={i.label}
                      value={i.value}
                    />
                  ))}
                </Picker>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    );
  }
}

export default Statistics;