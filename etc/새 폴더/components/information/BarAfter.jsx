import React, { Component } from 'react';

import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import { Container, Row, Image } from 'react-bootstrap';

import blackCircle from '../../images/blackCircle.png';
import "react-circular-progressbar/dist/styles.css";

import '../../lib/styles/style.css'

export default class BarAfter extends Component {
    render() {
        function Example(props) {
            return (
                <Container
                    className="justify-content-md-center"
                    style={{ display: "flex" }}>
                    <Row>{props.children}</Row>
                </Container>
            );
        }

        var rate = this.props.rate;

        return (
            <Container style={{position: 'relative'}}>
                <Example>
                    <CircularProgressbarWithChildren
                        value={rate} 
                        styles={buildStyles({pathColor:this.props.color, trailColor:'rgba(255, 255, 255, 0.6)'})}>
                        <Image
                            onMouseEnter={function(e) {
                                if (this.props.flag) this.props.showHover(true, e.pageX, e.pageY, this.props.habitId);
                            }.bind(this)}
                            onMouseLeave={function() {
                                if (this.props.flag) this.props.showHover(false, 0, 0, null);
                            }.bind(this)}
                            style={{ width: '45%', borderRadius: '50%', cursor: this.props.flag ? 'zoom-in' : '' }}
                            src={blackCircle}
                            alt="doge"/>
                        <Row style={{color: this.props.flag ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'}}>
                            <strong>{this.props.habitName}</strong>
                        </Row>
                        <Row style={{color: this.props.flag ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'}}>
                            <strong>{rate}%</strong>
                        </Row>
                    </CircularProgressbarWithChildren>
                </Example>
            </Container>
        );
    }
}
