import React, {Component} from 'react';
import {
  ScrollView, Text, TouchableOpacity, View, Modal, TouchableWithoutFeedback,
  RefreshControl, Dimensions, Picker
} from 'react-native';
import moment from 'moment';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';

// COMPONENTS
import ChartContainer from '../components/chart';
import Indicator from '../components/activityIndicator';

// HELPERS
import { AppConstants } from '../helpers';

// THEME
import { AppColors, AppStyles } from '../theme';

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

let loadOnce = 0;

class Statistics extends Component {

  constructor(props) {
    super(props);
    const now = moment();
    this.currentYear = now.year();
    this.currentMonth = now.month();
    this.weekOfMonth = this.setWeekOfMonth(now);

    this.state = {
      averageWeek: 0,
      averageMonth: 0,
      averageHalfYear: 0,
      averageLastMonth: 0,
      modalVisible: false,
      refreshing: false,
      loading: false,
      index: 0,
      routes: AppConstants.months,
      selectedYear: this.props.screenProps.selectedYear || now.year(),
      availableYears: []
    };
  }

  static navigationOptions = {
    tabBarLabel: 'Statistics',
    tabBarIcon: ({ focused, tintColor }) => (
      <Icon name={focused ? 'ios-analytics' : 'ios-analytics-outline'} size={36} color={focused ? AppColors.tabbar.iconSelected : AppColors.tabbar.iconDefault} />
    ),
    showLabel: false,
  };

  _handleIndexChange = index => {
    this.setState({
      index: index
    });
  };

  _renderHeader = props => (
    <TabBar
      {...props}
      scrollEnabled
      indicatorStyle={AppStyles.indicator}
      style={AppStyles.tabbar}
      tabStyle={AppStyles.tab}
      labelStyle={AppStyles.label}
    />
  );

  _renderScene = ({ route }) => {};

  componentWillMount() {
    if(!loadOnce) {
      this.props.screenProps.loadExercises(this.props.screenProps.selectedYear);
    }
    loadOnce++;
  }

  componentDidMount() {
    setTimeout(()=> {
      this.setState({
        index: this.currentMonth,
      });
    }, 1);
    if(this.props.screenProps.totalCount) this.setAverage(this.props.screenProps.exercises, this.props.screenProps.totalCount);
    this.setYears();
  }

  updateYear(year) {
    this.setState({loading:true});
    this.props.screenProps.loadExercises(year);//.then(() => this.setState({loading:false}));
  }

  setYears() {
    let aY = [];
    for (let i=4; i>=0; i--) {
      let year = this.currentYear-i;
      aY.push({label: String(year), value: year});
    }
    this.setState({
      availableYears: aY
    });
  }

  // static calculateAverage(elements, duration) {
  //   const formatted = elements.map(elem => {
  //     return {created_at: moment(elem.created_at).startOf(duration).format('YYYY-MM-DD'), count: elem.count};
  //   });

  //   const dates = formatted.map(elem => elem.created_at);
  //   const uniqueDates = dates.filter((created_at, index) => dates.indexOf(created_at) === index);

  //   return uniqueDates.map(created_at => {
  //     const count = formatted.filter(elem => elem.created_at === created_at).reduce((count) => count + 1, 0);
  //     return {created_at, count};
  //   });
  // }

  // static average(elements) {
  //   return elements.reduce((count, elem) => count + elem.count, 0) / elements.length;
  // }

  setWeekOfMonth(m) {
    return m.isoWeek() - moment(m).startOf('month').isoWeek() + 1;
  }

  setAverage(exercises, totalCount) {
    let today = moment();
    let lastMonth =  moment().subtract(1, 'months');
    let thisMonthExercises = [];
    exercises.forEach(exercise => {
      let compareDate = moment(exercise.created_at, 'YYYY-MM-DD');
      // THIS MONTH
      let thisStart = moment(today.startOf('month')).format('YYYY-MM-DD');
      let thisEnd = moment(today.endOf('month')).format('YYYY-MM-DD');
      if(compareDate.isBetween(thisStart, thisEnd, 'days', true)) {
        thisMonthExercises.push(exercise);
      }
    });
    let weeksLastMonth = moment(moment(lastMonth.endOf('month')) - moment(lastMonth.startOf('month'))).isoWeeks();
    let weeksPassedHalfYear = today.diff(moment().subtract(6, 'months'), 'weeks');
    let passedWeeks = moment().isoWeek();
    this.setState({
      averageMonth: (thisMonthExercises.length / this.weekOfMonth).toFixed(1),
      averageWeek: ((totalCount.this_year || 0) / passedWeeks).toFixed(1),
      averageLastMonth: ((totalCount.last_month || 0) / weeksLastMonth).toFixed(1),
      averageHalfYear: ((totalCount.last_six_months || 0) / weeksPassedHalfYear).toFixed(1)
    });
  }

  _onRefresh() {
    this.setState({refreshing: true});
    this.props.screenProps.loadExercises(this.currentYear).then(() => {
      this.setState({
        refreshing: false, 
        selectedYear: this.currentYear,
        index: this.currentMonth
      });
    });
  }

  _renderLoading() {
    if(this.state.loading) {
      return (
        <Indicator />
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <View style={AppStyles.container}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
              tintColor={AppColors.spinner}
              title="Loading exercises..."
            />
          }
        >
          <Text style={AppStyles.h4}>{'Your Exercise Log '.toUpperCase() + this.props.screenProps.selectedYear}</Text>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{width: '33.3%', paddingLeft: 25}}>
              <Text style={AppStyles.statsTitle}>Last Month</Text>
              <Text style={AppStyles.purpleText}><Text style={AppStyles.statsNumber}>{this.state.averageLastMonth}</Text><Text>/week</Text></Text>
            </View>
            <View style={{width: '33.3%', paddingLeft: 25}}>
              <Text style={AppStyles.statsTitle}>Last 6 Months</Text>
              <Text style={AppStyles.purpleText}><Text style={AppStyles.statsNumber}>{this.state.averageHalfYear}</Text><Text>/week</Text></Text>
            </View>
            <View style={{width: '33.3%', paddingLeft: 25}}>
              <Text style={AppStyles.statsTitle}>This Year</Text>
              <Text style={AppStyles.purpleText}><Text style={AppStyles.statsNumber}>{this.state.averageWeek}</Text><Text>/week</Text></Text>
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity
          onPress={() => this.setState({ modalVisible: true })}
        >
          <Text style={AppStyles.h3}>{this.props.screenProps.selectedYear}</Text>
        </TouchableOpacity>
        <Text style={AppStyles.sub}>Average current month: {this.state.averageMonth}</Text>
        <TabViewAnimated
          style={[AppStyles.tabcontainer, {opacity: this.props.screenProps.exercisesLoaded ? 1 : 0}]}
          navigationState={this.state}
          renderScene={this._renderScene}
          renderHeader={this._renderHeader}
          onIndexChange={this._handleIndexChange}
          initialLayout={initialLayout}
        />
        {
          this.props.screenProps.exercisesLoaded ? 
            <ChartContainer selectedYear={this.props.screenProps.selectedYear} selectedTab={this.state.index} exercises={this.props.screenProps.exercises} tabs={this.state.routes} /> 
            : 
            <View style={{flex: 1.7}}><Text style={AppStyles.text}>LOADING DATA...</Text></View> 
        }
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}>
          <TouchableWithoutFeedback
            onPress={() => this.setState({ modalVisible: false })}>
            <View style={AppStyles.pickerModalContainer}>
              <View style={AppStyles.pickerButtonContainer}>
                <Text
                  style={{ color: AppColors.brand.primary }}
                  onPress={() => {
                    this.updateYear(this.state.selectedYear);
                    this.setState({ modalVisible: false });
                  }}>
                    Done
                </Text>
              </View>
              <View>
                <Picker
                  style={AppStyles.modalPicker}
                  selectedValue={this.state.selectedYear}
                  onValueChange={(itemValue, itemIndex) => this.setState({selectedYear: itemValue})}>
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
        {this._renderLoading()}
      </View>
    );
  }
}

export default Statistics;