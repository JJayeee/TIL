import React, { Component } from 'react';
import BarBefore from '../information/BarBefore';
import BarAfter from '../information/BarAfter';

//https://cssgradient.io/
const colors = [ '#ff0000', '#f18500', '#eea400', '#ebc200', '#e7e400', '#e4ff00', '#c4e924', '#9dce50', '#98cb55', '#549ca2', '#1400af' ]

export default class TodayHabit extends Component {
    state = {
        animation:'activated'
    }
    
    timeout;

    rateOfAchievement () {
        let result = 0;

        if (this.props.achievementData.nowTotal) {
            const tempResult = this.props.achievementData.nowDone/this.props.achievementData.nowTotal*100
            result = Math.round(tempResult)
        }

        return result;
    }

    deactivation(_mode) {
        clearTimeout(this.timeout);

        if (_mode === 'activated') {
            if (this.rateOfAchievement() === 0) {
                this.setState({animation:'deactivated'});
            } else {
                this.timeout = setTimeout(function() {
                    this.setState({animation:'deactivated'})
                }.bind(this), 2000);
            }
        }
    }

    color = colors[this.rateOfAchievement() / 10];

    render() {
        return (
            <div style={{position: 'relative'}}>
                {this.state.animation === 'activated' ?
                    <BarBefore rate={this.rateOfAchievement()} color={this.color}/> : 
                    <BarAfter rate={this.rateOfAchievement()}
                        showHover={this.props.showHover}
                        habitId={this.props.habitId}
                        habitName={this.props.habitName}
                        habitIcon={this.props.habitIcon}
                        color={this.color}
                        flag={1}/>}
                {this.deactivation(this.state.animation)}
            </div>
        )
    }
}