import React, {Component} from 'react';
import {View} from 'react-native';
import { VictoryChart, VictoryArea, VictoryAxis, VictoryScatter } from "victory-native";

class ChartContainer extends Component {

    constructor(prop) {
        super(prop);
        let dated = new Date();
        this.weekOfMonth = (0 | dated.getDate() / 7)+1;
        this.currentMonth = dated.getMonth();
        console.log(prop.exercises);
        this.state = {
            data: []
        }

    }

    componentWillMount() {
        let months = [];
        this.props.tabs.map(tab => {
            let weeks = [];
            for(let i=1; i<this.weeksinMonth(tab.key)+1; i++) weeks.push({x:i, y:0});
            months.push({key: tab.key, weeks: weeks});
            //months.push({'x': tab.key, 'y': 0})
        });
        this.props.exercises.map(exercise => {
            let d = new Date(exercise.created_at);
            let month = d.getMonth();
            let week = (0 | d.getDate() / 7)+1;
            months[month-1].weeks[week-1].y = months[month-1].weeks[week-1].y !== 0 ? months[month-1].weeks[week-1].y+1 : 1;
            console.log(month, week);
            //months[month].y = months[month].y !== 0 ? months[month].y+1 : 1; 
        });
        console.log(months);
        this.setState({
            data: months
        })
        console.log(months[this.props.selectedTab-1].weeks);
    }

    weeksinMonth(m, y) {
        y= y || new Date().getFullYear();
        var d= new Date(y, m, 0);
        return Math.floor((d.getDate()- 1)/7)+ 1;     
    }

    setData() {
        let g = this.state.data[this.props.selectedTab-1].weeks;
        console.log(g.length);
        if (g.length < 4) g.unshift({x:0, y: g[0].y});
        if (g.length < 6) {
            console.log("asd",{x: g.length+1, y: g[g.length-1].y});
            g.push({x: g.length+1, y: g[g.length-1].y});
        }
        return g;
    }

    render() {
        return (
            <View style={{marginTop: 15}}>
                {this.state.data.length ?
          <VictoryChart 
            padding={{ top: 45, bottom: 0, left: -20, right: -20 }}
            // containerComponent={<VictoryZoomContainer zoomDomain={{x: [9, 12], y: [0, 10]}}/>}
            >
                <VictoryArea
                    style={{
                        data: {
                          fill: "#FA3D4B", fillOpacity: 0.9, stroke: "#FA3D4B", strokeOpacity: 0.9, strokeWidth: 5
                        },
                        //labels: {fill: "transparent"}
                      }}
                    interpolation={"monotoneX"}
                    categories={{
                        x: ["","WEEK 1", "WEEK 2", "WEEK 3", "WEEK 4", ""]
                    }}
                    labels={(d) => d.y}
                    data={this.setData()}
                    events={[{
                        target: "data",
                        eventHandlers: {
                            onTouchStart: () => {
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
                          onTouchEnd: () => {
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
                            (this.props.selectedTab === this.currentMonth && tick === this.weekOfMonth) ? "#FA3D4B" : "#D0D1D5",
                            fontFamily: "inherit",
                            fontSize: 14,
                            marginBottom: 60
                          }
                    }}
                />
                <VictoryScatter
                    style={{
                        data: {
                            fill: "#FA3D4B", fillOpacity: 1, stroke: "#fff", strokeOpacity: .7, strokeWidth: 4
                        }
                    }}
                    size={9}
                    data={this.setData()}
                />
    
              </VictoryChart>
                : <View/> }
              </View>
        );
    }
}

export default ChartContainer;