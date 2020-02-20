import React, { Component } from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import Fade from 'react-reveal/Fade';

import CurrentDate from '../information/CurrentDate';
import TodayList from './TodayList';
import Hover from '../../effects/Hover';
import * as API from '../../lib/api/FrontQuery';
import * as userAPI from '../../lib/api/auth';

import '../../lib/styles/style.css';
import Clock from '../mainMode/Clock';

export default class TodayPage extends Component {
    state = {
        datas: [],
        more: false,
        size:'',
        hover: {
            show: false,
            habitId: '',
            x: '', 
            y: ''
        },
    };

    componentDidMount() {
        this.getData();
        this.checkAndRedirect();
    }

    getData = async () => {
        const res = await API.getToday();
        this.setState({datas: res.data});
        this.setState({size: res.data.habitSet.length});
    };

    checkAndRedirect = async() => {
        try{
            await userAPI.check()
        } catch (e) {
            window.location='/'
        }
    };

    makeList() {
        let ret = [];
        let habitId = '';
        let habitIcon = '';
        const size = this.state.size;
        
        for (let j = 0; j < (size / 5); j++) {
            if (j && !this.state.more) break;
            
            let fiveHabits = [];

            for (let i=0; i<5; i++) {
                let currHabit, truncatedHabitName = [];

                if (i + j * 5 < size) {
                    currHabit = this.state.datas.habitSet[i + j * 5].habitName;
                    habitId = this.state.datas.habitSet[i + j * 5].id;
                    habitIcon = this.state.datas.habitSet[i + j * 5].habit_icon.icon;

                    for (let k=0; k<12 && k<currHabit.length; k++) {
                        truncatedHabitName.push(currHabit[k]);
                    }

                    if (truncatedHabitName.length > 10) {
                        truncatedHabitName[10] = truncatedHabitName[11] = '.';
                    }
                }

                if (j * 5 + i < size) {
                    fiveHabits.push(<Col>
                        <TodayList
                            showHover={function(value, x, y, id) {
                                this.setState({
                                    hover: {
                                        show: value,
                                        habitId: id,
                                        x: x,
                                        y: y
                                    }
                                });
                            }.bind(this)}
                            habitName={truncatedHabitName}
                            habitId={habitId}
                            habitIcon={habitIcon}
                            achievementData={this.state.datas.achievementData[habitId]}/>
                        </Col>);
                } else {
                    fiveHabits.push(<Col></Col>);
                }
            }

            ret.push(
                <Fade><Row id="habit-css-black" className="justify-content-md-center mt-3 py-4">
                    {fiveHabits}
                </Row></Fade>)
        }
        
        return ret;
    };

    render() {
        return (
            <>
                {this.state.hover.show ? 
                    <Hover
                        x={this.state.hover.x}
                        y={this.state.hover.y}
                        id={this.state.hover.habitId}/> : ''}
                <Fade>
                    <Container 
                        className="justify-content-center pt-5 mt-5 mb-0 font-weight-light"
                        style={{display:'flex', alignItems:'center', fontSize:50, fontWeight:'bold', color:'white'}}>
                        <CurrentDate/>
                    </Container>
                    <Container
                      className="justify-content-center"
                      style={{display:'flex', alignItems:'center', height:180, fontSize:130, color:'white'}}>
                        <Clock>
                        </Clock>
                    </Container>
                    <Container>
                        {this.state.datas.habitSet ? this.makeList() : ''}
                        {this.state.size > 5 ? 
                            <Row className="justify-content-md-center mt-5 pb-5">
                                <Button
                                    id='habit-css-black'
                                    onClick={function() {
                                        this.setState({more:!this.state.more})
                                    }.bind(this)}
                                    style={{border:'none', fontWeight:'bold', color:'rgba(255, 255, 255, 0.75'}}
                                    color='primary'>
                                    {this.state.more ? '접기' : '더 보기'}
                                </Button>
                            </Row> : ''}
                    </Container>
                </Fade>
            </>
        );
    }
}