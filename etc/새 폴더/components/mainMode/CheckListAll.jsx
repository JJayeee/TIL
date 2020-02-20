import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import update from 'react-addons-update';

import { FaHeart, FaRegHeart, FaRegSave } from 'react-icons/fa';
import { AiOutlineEdit } from "react-icons/ai";

import Calendar from '../../effects/Calendar';
import LineGraph from '../../effects/LineGraph';
import BarBefore from '../information/BarBefore';
import BarAfter from '../information/BarAfter';

import * as API from '../../lib/api/FrontQuery'
import '../../lib/styles/style.css';

const colors = [ '#ff0000', '#f18500', '#eea400', '#ebc200', '#e7e400', '#e4ff00', '#c4e924', '#9dce50', '#98cb55', '#549ca2', '#1400af' ];
const today = new Date();

export default class CheckList extends Component {
    state = {
        dataLine: {
            labels: ["1일", "10일", "20일", `${new Date((new Date).getFullYear(), (new Date).getMonth()+1, 0).getDate()}일`],
            datasets: [
                {
                    label: "목표 횟수",
                    fill: true,
                    lineTension: 0.3,
                    backgroundColor: "rgba(225, 204, 230, .3)",
                    borderColor: "rgba(100, 200, 250, 50)",
                    borderCapStyle: "butt",
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: "miter",
                    pointBorderColor: "rgb(205, 130, 158)",
                    pointBackgroundColor: "rgb(255, 255, 255)",
                    pointBorderWidth: 2,
                    pointHoverRadius: 1,
                    pointHoverBackgroundColor: "rgba(0, 0, 0, 0.6)",
                    pointHoverBorderColor: "rgba(220, 220, 220, 1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: []
                },
                {
                    label: "달성 횟수",
                    fill: true,
                    lineTension: 0.3,
                    backgroundColor: "rgba(0, 180, 0, .3)",
                    borderColor: "rgba(0, 180, 0, .5)",
                    borderCapStyle: "butt",
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: "miter",
                    pointBorderColor: "rgb(205, 130, 158)",
                    pointBackgroundColor: "rgb(255, 255, 255)",
                    pointBorderWidth: 2,
                    pointHoverRadius: 1,
                    pointHoverBackgroundColor: "rgba(0, 0, 0, 0.6)",
                    pointHoverBorderColor: "rgba(220, 220, 220, 1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: []
                },
            ]
        },
        selectedDay: {
            year: today.getFullYear(),
            month: today.getMonth() + 1,
            date: today.getDate()
        },
        goalHabit: [],
        realHabit: [],
        animation: 'activated',
        habitAchievementData: [],
        dailyHabitData: [],
        alarmSet:[],
        canEditFlag: false,
        flag: false,
        prev: false,
    }

    componentDidMount() {
        this.getData();
        this.getDailyHabitData(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate());
    }

    componentWillReceiveProps() {
        this.getData();
    }

    componentDidUpdate() {
        if (this.state.selectedDay && this.state.flag) {
            this.getDailyHabitData(this.state.selectedDay.year, this.state.selectedDay.month, this.state.selectedDay.date);
            this.makeDetailList();
            this.setState({flag: !this.state.flag});
        }
    }

    timeout;

    deactivation(_mode) {
        clearTimeout(this.timeout);

        if (_mode === 'activated') {
            this.timeout = setTimeout(function() {
                this.setState({animation:'deactivated'})
            }.bind(this), 2000);
        }
    }

    getData () {
        const graphData = this.props.showGraph
        let totalGraphData = [];
        let realGraphData = [];
        let days = [];
        const lastDay = (new Date(this.state.selectedDay.year, this.state.selectedDay.month, 0).getDate())
        
        for (let day=1; day<=lastDay; day++) {
            if (graphData[day]) {
                totalGraphData.push(graphData[day].achievementData.dailyTotal)
                realGraphData.push(graphData[day].achievementData.dailyDone)
                days.push(`${day}일`)
            }
        }

        this.setState({
            goalHabit: totalGraphData,
            realHabit: realGraphData
        })

        this.setState({
            dataLine: {
                ...this.state.dataLine,
                labels: days,
                datasets: update(
                    this.state.dataLine.datasets,
                    {
                        [0]: {
                            data: {$set: totalGraphData}
                        },
                        [1]: {
                            data: {$set: realGraphData}
                        }
                    }
                )
            }
        })
    }

    getDailyHabitData = async(YYYY, MM, D) => {
        try{
            const dailyDataRes = await API.getDailyHabitDetail({year: YYYY, month: MM, day: D});
            this.setState({dailyHabitData: dailyDataRes.data.data.habit.habitName});
            this.setState({alarmSet: dailyDataRes.data.alarmSet});
        } catch(e) {
            console.log(e);
        }
    }

    changeDetailInfo = async(dataId) => {
        try{
            await API.changeDetailInfo({dataId: dataId});
            this.makeDetailList();
        } catch(e) {
            alert('미래에 울릴 알람에 대한 완료/미완료는 수정이 불가능 합니다.');
        }
    }

    makeDetailList() {
        const habits = this.state.dailyHabitData;
        const alarmSet = this.state.alarmSet;
        let returnList = [];
        for (const habit of habits) {
            let temp = [];
            if (alarmSet[habit] && alarmSet[habit].length) {
                for (const alarm of alarmSet[habit]) {
                    if (this.state.canEditFlag) {
                        alarm.is_done ? 
                        temp.push(
                            <Col className="mx-2 my-1">
                                <FaHeart onClick={function() {
                                    this.changeDetailInfo(alarm.id);
                                    this.setState({flag: !this.state.flag});
                                    this.getDailyHabitData(this.state.selectedDay.year, this.state.selectedDay.month, this.state.selectedDay.date);
                                }.bind(this)} style={{color:"red", cursor:'pointer', margin:3}} />
                                {alarm.time}
                            </Col>
                        ) :
                        temp.push(
                            <Col className="mx-2 my-1">
                                <FaRegHeart onClick={function() {
                                    this.changeDetailInfo(alarm.id)
                                    this.getDailyHabitData(this.state.selectedDay.year, this.state.selectedDay.month, this.state.selectedDay.date);
                                    this.setState({flag: !this.state.flag});
                                }.bind(this)} style={{color:"pink", cursor:'pointer', margin:3}} />
                                    {alarm.time}
                            </Col>
                        )
                    } else {
                        alarm.is_done ? 
                        temp.push(
                            <Col className="mx-2 my-1">
                                <FaHeart style={{color:"red"}} /> {alarm.time}
                            </Col>
                        ) :
                        temp.push(
                            <Col className="mx-2 my-1">
                                <FaRegHeart style={{color:"red"}} /> {alarm.time}
                            </Col>
                        )
                    }
                }
                returnList.push(
                    <>
                        <Row className="mx-2 my-1">
                            <Col id="col-list" md='auto'>
                                {habit}
                            </Col>
                        </Row>
                        <Row>
                            {temp}
                        </Row>
                    </>
                )
            }
        }

        return returnList;
    }

    rateOfAchievement (nowDone, nowTotal) {
        let result = 0;

        if (nowTotal) {
            const tempResult = nowDone / nowTotal * 100;
            result = Math.round(tempResult);
        }

        return result;
    }
    

    render () {
        return(
            <> 
                <Container id="habit-css-blue" className="p-5">
                    <Row id="col-habit" className="justify-content-md-center">
                        <Col xs="3" className="py-5 my-4 px-4">
                            {this.state.animation === 'activated' ?
                                <BarBefore 
                                    rate={this.rateOfAchievement(this.props.showData.monthDone, this.props.showData.monthTotal)} 
                                    color={colors[Math.floor(this.rateOfAchievement(this.props.showData.monthDone, this.props.showData.monthTotal) / 10)]}/> : 
                                <BarAfter 
                                    rate={this.rateOfAchievement(this.props.showData.monthDone, this.props.showData.monthTotal)} /*habitName='All'*/ 
                                    color={colors[Math.floor(this.rateOfAchievement(this.props.showData.monthDone, this.props.showData.monthTotal) / 10)]}/>}
                            {this.deactivation(this.state.animation)}
                        </Col>
                        <Col xs="8" className="pl-5"><LineGraph dataLine={this.state.dataLine}/></Col>
                    </Row>
                </Container>
                <Container id="habit-css-blue" className="justify-content-md-center py-2 my-3" md='auto' style={{display:'flex', textAlign: "center"}}>
                    <Row className="justify-content-md-center p-2" md='auto' style={{display:'flex', textAlign: "center"}}>
                        <Col className="justify-content-md-center" md='auto' style={{display:'flex', textAlign: "center"}}>
                            <Calendar selectDay={function(today) {
                                this.setState({
                                    selectedDay: {
                                        year: today.getFullYear(),
                                        month: today.getMonth() + 1,
                                        date: today.getDate()
                                    }
                                });
                                this.getDailyHabitData(today.getFullYear(), today.getMonth() + 1, today.getDate());
                            }.bind(this)}/>
                        </Col>
                        <Col id="col-habit" className="justify-content-md-center px-3" md='auto' style={{display:'flex', textAlign: "center"}}>
                            <Container>
                                <Row className="justify-content-md-center mb-3" md='auto' style={{display:'flex', textAlign: "center", fontWeight:'bold'}}>
                                    {`${this.state.selectedDay.year}년 ${this.state.selectedDay.month}월 ${this.state.selectedDay.date}일`}
                                </Row>
                                <Row>
                                    <Col className="justify-content-md-center align-items-center" md='auto' style={{display:'flex', textAlign: "center", fontSize:15}}>
                                        울린 알람
                                    </Col>
                                    <Col className="justify-content-md-center" md='auto' style={{display:'flex', textAlign: "center", fontWeight:'bold'}}>
                                        {this.state.goalHabit[this.state.selectedDay.date - 1]}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="justify-content-md-center align-items-center" md='auto' style={{display:'flex', textAlign: "center", fontSize:15}}>
                                        달성 횟수
                                    </Col>
                                    <Col className="justify-content-md-center" md='auto' style={{display:'flex', textAlign: "center", fontWeight:'bold'}}>
                                        {this.state.realHabit[this.state.selectedDay.date - 1]}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="justify-content-md-center align-items-center" md='auto' style={{display:'flex', textAlign: "center", fontSize:15}}>
                                        달성률
                                    </Col>
                                    <Col className="justify-content-md-center" md='auto' style={{display:'flex', textAlign: "center", fontWeight:'bold'}}>
                                        {this.state.goalHabit[this.state.selectedDay.date - 1] > 0 ? 
                                            `${Math.floor(this.state.realHabit[this.state.selectedDay.date - 1] * 100 / this.state.goalHabit[this.state.selectedDay.date - 1])}%`
                                            : '일정이 설정되지 않았습니다.'}
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                </Container>
                {this.state.dailyHabitData.length ?
                <Container id="habit-css-blue" className="p-5">
                    <FaHeart style={{color:"red", margin:5}} /> : 완료
                    <FaRegHeart style={{color:"red", margin:5}} /> : 미완료
                    {!this.state.canEditFlag? 
                    <>
                        <AiOutlineEdit style={{cursor: "pointer", fontSize:25, color:"grey", margin:5}} onClick={function() {
                            this.setState({canEditFlag: true})
                        }.bind(this)} /> : 수정
                    </>:
                    <>
                        <FaRegSave style={{cursor: "pointer", fontSize:25, color:"grey", margin:5}} onClick={function() {
                            this.props.getTotalHabitName(this.state.selectedDay.year, this.state.selectedDay.month, this.state.selectedDay.date)
                            this.setState({canEditFlag:false})
                            this.getDailyHabitData(this.state.selectedDay.year, this.state.selectedDay.month, this.state.selectedDay.date)
                        }.bind(this)} /> : 저장
                    </>}
                    <Row>
                        <Col>
                            <Container style={{backgroundColor:"#ffffff", padding: '5px', borderRadius:'10px'}}>
                                {this.makeDetailList()}
                            </Container>
                        </Col>
                    </Row>
                </Container> : ''}
            </>
        )
    }
}