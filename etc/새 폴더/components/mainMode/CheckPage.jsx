import React, { Component } from 'react';
import { Container, Row, Col, ButtonToolbar, Button } from 'react-bootstrap';
import Fade from 'react-reveal/Fade';

import * as API from '../../lib/api/FrontQuery';
// import Button from "../CustomButton/CustomButton.jsx";
import CheckList from '../mainMode/CheckList';
import CheckListAll from '../mainMode/CheckListAll';
import CushionData from '../mainMode/Cushion';

import Cushion from '../mainMode/test'


import '../../lib/styles/style.css';

export default class CheckPage extends Component {
  state = {
    totalData: [],
    allVData: [],
    selectedData: [],
    calendarData: [],
    graphData: [],
    alarmSet: [],
    today: {
      year: (new Date()).getFullYear(),
      month: (new Date()).getMonth() + 1,
      date: (new Date()).getDate(),
    },
    flag: false,
    prev: false,
    mode: 'habit',
  };

  componentDidUpdate() {
    this.showCheckList();
    if (this.state.flag === this.state.prev) {
      this.getTotalHabitName(this.state.today.year, this.state.today.month, this.state.today.date);
    }
  }

  componentDidMount() {
    this.getTotalHabitName(this.state.today.year, this.state.today.month, this.state.today.date);
  }

  getTotalHabitName = async (year, month, day) => {
    try {
      const res = await API.getMonthlyTotalData({ year: year, month: month });
      const dailyDataRes = await API.getDailyHabitDetail({ year: year, month: month, day: day })
      const { data, habit, calendarData, graphData } = res.data;
      // const dailyData = dailyDataRes.data.data
      const alarmSet = dailyDataRes.data.alarmSet
      // console.log(dailyData)
      // console.log(alarmSet)

      this.setState({ allVData: data.habit });
      this.setState({ totalData: habit });
      this.setState({ calendarData: calendarData });
      this.setState({ graphData: graphData });
      this.setState({ alarmSet: alarmSet });

    } catch (e) {
      console.log(e)
    }
    if (this.state.flag === this.state.prev) {
      this.setState({ flag: !this.state.flag })
    }
  };


  showCheckList (id) {
    if (id) {
      return <CheckList selectedHabitId={id}></CheckList>
    } else if (this.state.allVData) {
      // console.log(this.state.allVData);
      return (<CheckListAll showData={this.state.allVData} getTotalHabitName={this.getTotalHabitName} showCalendar={this.state.calendarData} showGraph={this.state.graphData} showAlarmSet={this.state.alarmSet}></CheckListAll>)
    }
  }

  makeHabitIcon() {
    const habit = [];
    const temp = ["outline-primary", "outline-secondary", "outline-success", "outline-warning", "outline-info", "outline-dark", "outline-danger"];
    let i = 0

    habit.push(
      <Button
        variant="outline-danger"
        style={{ margin: 2 }}
        onClick={function () {
          this.setState({ selectedData: this.state.allVData });
        }.bind(this)}>
        All
      </Button>
    )
    for (const data of this.state.totalData) {
      habit.push(
        <Button
          variant={temp[i % 7]}
          style={{ margin: 2 }}
          onClick={function () {
            this.setState({ selectedData: data });
          }.bind(this)}>
          {data.habitName}
        </Button>
      )

      i++
    }

    if (habit) return habit
  }


  checkMode() {
    if (this.state.mode === 'habit') {
      return (
        <Fade>
          <Container className="py-5">
            <ButtonToolbar>
              {this.makeHabitIcon()}
            </ButtonToolbar>
          </Container>
          {this.showCheckList(this.state.selectedData.id)}
        </Fade>
      )
    } else if (this.state.mode === 'cushion') {
      return (
        // <CushionData>
        // </CushionData>
        <Cushion></Cushion>
      )
    }
  }
  // index={'asdeasdsadasdasdas'} two={this.state.mode}

  render() {
    return (
      <div className="content">
        <Container fluid>
          <div className="places-buttons">
            <Row>
              <>
                {/* <ButtonToolbar bsPrefix=""> */}
                <Col md={2} mdOffset={3}>
                  <Button
                    variant="outline-secondary"
                    bsStyle="default"
                    block
                    style={{ margin: 2 }}
                    onClick={function () {
                      this.setState({ mode: 'habit' });
                    }.bind(this)}
                  >
                    habit
                  </Button>
                </Col>
                <Col md={2}>
                  <Button
                    variant="outline-secondary"
                    bsStyle="default"
                    block
                    style={{ margin: 2 }}
                    onClick={function () {
                      this.setState({ mode: 'cushion' });
                    }.bind(this)}
                  >
                    cushion
                  </Button>
                </Col>
                {/* </ButtonToolbar> */}
                {this.checkMode()}
              </>
            </Row>
          </div>
        </Container>
      </div>
    )
  }
}