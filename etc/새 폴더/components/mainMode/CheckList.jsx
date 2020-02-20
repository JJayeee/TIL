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

const colors = [ '#ff0000', '#f18500', '#eea400', '#ebc200', '#e7e400', '#e4ff00', '#c4e924', '#9dce50', '#98cb55', '#549ca2', '#1400af' ]

export default class CheckList extends Component {
    state = {
        dataLine: {
            labels: ["1일", "10일", "20일", `${new Date((new Date()).getFullYear(), (new Date()).getMonth()+1, 0).getDate()}일`],
            datasets: [
                {
                    label: "목표 횟수",
                    fill: true,
                    lineTension: 0.3,
                    backgroundColor: "rgba(225, 204,230, .3)",
                    borderColor: "rgba(100, 200, 250, 50)",
                    borderCapStyle: "butt",
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: "miter",
                    pointBorderColor: "rgb(205, 130,1 58)",
                    pointBackgroundColor: "rgb(255, 255, 255)",
                    pointBorderWidth: 2,
                    pointHoverRadius: 1,
                    pointHoverBackgroundColor: "rgba(0, 0, 0, 0.6)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
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
                    pointHoverBorderColor: "rgba(220, 220, 220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: []
                },
            ]
        },
        selectedData: [],
        dailyHabitData: [],
        alarmSet: [],
        selectedId: this.props.selectedHabitId,
        flag: false,
        prev: false,
        selectedDay: {
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1,
            date: new Date().getDate()
        },
        goalHabit: [],
        realHabit: [],
        animation: 'activated',
        canEditFlag: false,
    }

    componentDidMount() {
        this.getData();
        this.getAlarmSet();
    }

    componentWillReceiveProps() {
        this.setState({flag: !this.state.flag})
        // this.setState({animation: 'activated'});
    }

    componentDidUpdate() {
        if (this.state.flag === this.state.prev) {
            this.getData();
            this.setState({animation: 'activated'});
            this.setState({flag: !this.state.flag});
            this.getAlarmSet();
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

    color = colors[Math.floor(this.randomNumber / 10)];
    
    getData = async() =>{
        try {
            const res = await API.getMonthlyDataDetail({habitId: this.props.selectedHabitId, year: this.state.selectedDay.year, month:this.state.selectedDay.month})
            // const habitRes = await API.getDailyOneHabitDetail({habitId: this.props.selectedHabitId, year: this.state.selectedDay.year, month: this.state.selectedDay.month, day: this.state.selectedDay.date})
            // console.log(this.state.selectedDay.year)
            // console.log(habitRes)
            // console.log(res.data.data.habit)
            this.setState({selectedData: res.data.data.habit})
            this.setState({dailyHabitData: res.data.data.habit.habitName})
            // this.setState({alarmSet: habitRes.data.alarmSet})
            const {graphData} = res.data
            let totalGraphData = [];
            let realGraphData = [];
            let days = [];
            const lastDay = (new Date(this.state.selectedDay.year, this.state.selectedDay.month, 0).getDate())

            for (let day=1;  day<=lastDay; day ++) {
                totalGraphData.push(graphData[day].achievementData.dailyTotal)
                realGraphData.push(graphData[day].achievementData.dailyDone)
                days.push(`${day}일`)
            }

            // console.log(totalGraphData)

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
        } catch (e) {
            console.log(e)
        }

        // if (this.state.flag === this.state.prev) {
        //     this.setState({flag: !this.state.flag})
        // }
    }

    getAlarmSet = async() => {
        // console.log('???')
        const habitRes = await API.getDailyOneHabitDetail({habitId: this.props.selectedHabitId, year: this.state.selectedDay.year, month: this.state.selectedDay.month, day: this.state.selectedDay.date})
        this.setState({alarmSet: habitRes.data.alarmSet})
    }

    changeDetailInfo = async(dataId) => {
        try{
            // console.log('값 바꿨다')
            await API.changeDetailInfo({dataId: dataId})
            this.getAlarmSet()
            this.makeDetailList()
        } catch(e) {
            alert('미래에 울릴 알람에 대한 완료/미완료는 수정이 불가능 합니다.')
        }
    }

    makeDetailList(habit, alarmSet) {
        // console.log('//')
        let returnList = [];
        // console.log(alarmSet[habits[0]])
        let temp = [];
            if (alarmSet) {
                for (const alarm of alarmSet) {
                    if (this.state.canEditFlag) {
                        alarm.is_done ?
                        temp.push(
                            <Col className="mx-2 my-1">
                                <FaHeart onClick={function() {
                                    this.changeDetailInfo(alarm.id);
                                    this.getAlarmSet();
                                }.bind(this)} style={{color:"red", cursor:'pointer', margin:3}} />
                                    {alarm.time}
                            </Col>
                        ) :
                        temp.push(
                            <Col className="mx-2 my-1">
                                <FaRegHeart onClick={function() {
                                    this.changeDetailInfo(alarm.id);
                                    this.getAlarmSet();
                                }.bind(this)} style={{color:"pink", cursor:'pointer', margin:3}} />
                                {alarm.time}
                            </Col>
                        )
                    } else {
                        alarm.is_done?
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
        return returnList
    }

    rateOfAchievement (nowDone, nowTotal) {
        let result = 0;

        if (nowTotal) {
            const tempResult = nowDone/nowTotal*100
            result = Math.round(tempResult)
        }

        return result
    }


    render () {
        // console.log('/')
        return(
            <>
                <Container id="habit-css-blue" className="p-5">
                    <Row id="col-habit" className="justify-content-md-center">
                        <Col xs="3" className="py-5 my-4 px-4">
                            {this.state.animation === 'activated' ?
                                <BarBefore rate={this.rateOfAchievement(this.state.selectedData.monthDone, this.state.selectedData.monthTotal)} color={this.color}/>:
                                <BarAfter rate={this.rateOfAchievement(this.state.selectedData.monthDone, this.state.selectedData.monthTotal)} habitName={this.state.selectedData.habitName} color={this.color} flag={0}/>}
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
                                this.setState({flag: !this.state.flag})
                            }.bind(this)}/>
                        </Col>
                        <Col id="col-habit" className="justify-content-md-center px-3" md='auto' style={{display:'flex', textAlign: "center"}}>
                            <Container>
                                <Row className="justify-content-md-center mb-3" md='auto' style={{display:'flex', textAlign: "center", fontWeight:'bold'}}>
                                    {`${this.state.selectedDay.year}년 ${this.state.selectedDay.month}월 ${this.state.selectedDay.date}일`}
                                </Row>
                                <Row>
                                    <Col className="justify-content-md-center align-items-center" md='auto' style={{display:'flex', textAlign: "center", fontSize:15}}>
                                        목표 횟수
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
                {this.state.alarmSet.length ?
                <Container id="habit-css-blue" className="p-5">
                    <FaHeart style={{color:"red", margin:5}} /> : 완료
                    <FaRegHeart style={{color:"red", margin:5}} /> : 미완료
                    {!this.state.canEditFlag?
                    <>
                        <AiOutlineEdit style={{cursor: "pointer", fontSize:25, color:"grey", margin:5}} onClick={function() {
                            this.setState({canEditFlag: true})
                        }.bind(this)} /> : 수정
                    </> :
                    <>
                        <FaRegSave style={{cursor: "pointer", fontSize:25, color:"grey", margin: 5}} onClick={function() {
                            this.getData()
                            this.setState({canEditFlag:false})
                            this.setState({flag: !this.state.flag})
                        }.bind(this)} /> : 저장
                    </>}
                    <Row>
                        <Col>
                            <Container style={{backgroundColor:"#ffffff", padding: '5px', borderRadius:'10px'}}>
                                {this.makeDetailList(this.state.dailyHabitData, this.state.alarmSet)}
                            </Container>
                        </Col>
                    </Row>
                </Container>:
                ''
                }
                
            </>
        )
    }
}