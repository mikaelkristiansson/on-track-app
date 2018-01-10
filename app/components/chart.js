import React, {Component} from 'react';
import {View, Text} from 'react-native';
import { VictoryChart, VictoryArea, VictoryAxis, VictoryScatter } from 'victory-native';
import { AppColors, AppStyles } from '../theme';
import moment from 'moment';

class ChartContainer extends Component {

  constructor(prop) {
    super(prop);
    //let dated = new Date();
    const now = moment();
    this.weekOfMonth = this.setWeekOfMonth(now);//(0 | dated.getDate() / 7)+1;
    if (this.weekOfMonth === 5) this.weekOfMonth = 4;
    this.currentMonth = now.month();//dated.getMonth();
    this.currentYear = now.year();//dated.getFullYear();
    this.state = {
      data: [],
      loaded: false
    };
  }

  // componentWillMount() {
  //   this.setState({
  //     data: [],
  //     loaded: false
  //   });
  // }

  setWeekOfMonth(m) {
    return m.isoWeek() - moment(m).startOf('month').isoWeek() + 1;
  }

  componentWillMount() {
    let months = [];
    this.props.tabs.map(tab => {
      let weeks = [];
      for(let i=1; i<5; i++) weeks.push({x:i, y:0});
      months.push({key: tab.key, weeks: weeks});
    });

    this.props.exercises.map(exercise => {
      const d = moment(exercise.created_at);
      let month = d.month();
      let week = this.setWeekOfMonth(d);//(0 | d.date() / 7)+1;
      if (week === 5) week = 4;
      months[month].weeks[week-1].y = months[month].weeks[week-1].y !== 0 ? months[month].weeks[week-1].y+1 : 1;
    });
    months.forEach((month, i) => {
      let prevMonthWeekValue = months[i-1] ? months[i-1].weeks[4].y : 0;
      month.weeks.unshift({x:0, y: prevMonthWeekValue});
      let nextMonthWeekValue = months[i+1] ? months[i+1].weeks[0].y : 0;
      month.weeks.push({x:5, y: nextMonthWeekValue});
    });
    this.setState({
      data: months,
      loaded: true
    });
  }

  setData() {
    return this.state.data[this.props.selectedTab].weeks;
  }

  render() {
    return (
      <View style={{marginTop: 15}}>
        {this.state.loaded ?
          <VictoryChart padding={{ top: 0, bottom: 0, left: -15, right: -15 }}>
            <VictoryArea
              style={{
                data: {
                  fill: AppColors.chart.fill, 
                  fillOpacity: 0.4, 
                  stroke: AppColors.chart.line, 
                  strokeOpacity: 0.9, 
                  strokeWidth: 3,
                },
                labels: {fill: AppColors.textPrimary, padding: 15, fontSize: 16, fontFamily: 'Avenir'}
              }}
              interpolation={'monotoneX'}
              categories={{
                x: ['WEEK 1', 'WEEK 2', 'WEEK 3', 'WEEK 4']
              }}
              animate={{
                duration: 300,
                onLoad: { 
                  duration: 600,
                  easing: 'bounce',
                }
              }}
              domain={{y: [0, 10]}}
              labels={(datum) => String(Math.round(datum.y))}
              data={this.setData()}
            />
            <VictoryAxis
              orientation="top"
              animate={{
                duration: 1000,
                easing: 'bounce',
                onLoad: { 
                  duration: 1000,
                  easing: 'bounce',
                }
              }}
              offsetY={45}
              style={{
                axis: { stroke: 'transparent', strokeWidth: 0 },
                ticks: {
                  size: 15
                },
                tickLabels: {
                  fill: (tick) => (this.currentYear === this.props.selectedYear && 
                                  this.props.selectedTab === this.currentMonth && 
                                  tick === this.weekOfMonth) ? 
                                  AppColors.brand.primary : AppColors.textThirdly,
                  fontSize: 14,
                  fontFamily: 'Avenir'
                }
              }}
            />
            <VictoryScatter
              style={{
                data: {
                  fill: AppColors.chart.scatter, fillOpacity: 1, stroke: AppColors.chart.scatterBorder, strokeOpacity: .9, strokeWidth: 3
                }
              }}
              animate={{
                duration: 300,
                onLoad: { 
                  duration: 1000, 
                }
              }}
              size={6}
              data={this.setData()}
            />
    
          </VictoryChart>
          : <View style={{flex: .4}}><Text style={AppStyles.text}>LOADING DATA...</Text></View> }
      </View>
    );
  }
}

export default ChartContainer;