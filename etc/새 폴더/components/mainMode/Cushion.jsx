import React, { Component } from 'react';
import {Row, Col, Container, ButtonToolbar, Button} from 'react-bootstrap';
import { Flip, Fade } from 'react-reveal';
import ReactDOM from "react-dom";
import Chart from "react-google-charts";
import ReactSpeedometer from "react-d3-speedometer"
import Parallax from "../Parallax/Parallax.js";
import GridItem from "../grid/GridItem.js";
import GridContainer from "../grid/GridContainer.js";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import styles from "../material-kit-react/components.js";
import * as API from "../../lib/api/FrontQuery";
// react components for routing our app without refresh

// [
//     ["Year", "Sales", "Expenses"],
//     ["2004", 1000, 400],
//     ["2005", 1170, 460],
//     ["2006", 660, 1120],
//     ["2007", 1030, 540]
// ]
export default class CushionData extends Component {
  state = {
    // seletedId: 0,
    dollSet: [],
    selectedDollData: [],
    graphData : [],
    today: {
      date: '',
      id: 0,
      middle_:0,
      front_: 0,
      back_: 0,
      left_: 0,
      right_: 0,
      left_twisted_: 0,
      right_twisted_: 0,
      total: 0,
      percentage: 0,
      comment: '',
    },
    date: {
      year: (new Date()).getFullYear(),
      month: (new Date()).getMonth()+1,
      // date: (new Date()).getDate(),
    },
    flag: false,
    prev: false,
    mode: 'cushion',
  };

  // componentDidUpdate() {
  //     if (this.state.flag === this.state.prev){
  //         // this.getDollSet();
  //         // this.getCushionData();
  //         this.getCushionMonthlyData();
  //     }
  // }

  componentDidMount() {
    this.getDollSet();
  }

  timeout;

  getCushionData = async () => {
    try{
      // const res = await API.getMonthlyTotalData({year: this.state.today.year, month: this.state.today.month});
      const res = await API.getCushionDailyData({dollId: this.state.selectedDollData.id});
      // console.log(this.state.selectedDollData);
      const cushion = res.data.data;
      console.log('cushion_today');
      console.log(cushion);
      console.log(res.data.message);
      console.log(res.data.date);
      let message = '';
      let total = (
        cushion.middle_ + cushion.front_ + cushion.back_ + cushion.left_ + cushion.right_
        + cushion.left_twisted_ + cushion.right_twisted_ );

      let percentage = (cushion.middle_ / total) * 100;
      percentage = Number(percentage.toFixed(3));
      // console.log(percentage);

      if ( percentage <= 20) {
        message = '건강 적신호!! 자세에도 신경써주세요!'
      } else if (20 < percentage <= 40) {
        message = '허리가 아파해요! 인형과 함께 더 노력해볼까요!'
      } else if (40 < percentage <= 60) {
        message = '좋아요~ 조금 더 노력해 볼까요?'
      } else if (60 < percentage <= 80) {
        message = '좋아요!! 잘 하고 있어요~~'
      } else if ( 80 <= percentage) {
        message = '대단해요! 바른 자세를 유지하고 있네요!'
      }

      this.setState({
        today: {
          date: res.data.date,
          id: cushion.id,
          middle_: cushion.middle_,
          front_: cushion.front_,
          back_: cushion.back_,
          left_: cushion.left_,
          right_: cushion.right_,
          left_twisted_: cushion.left_twisted_,
          right_twisted_: cushion.right_twisted_,
          total: total,
          percentage: percentage,
          comment: message,
        }
      });

    } catch(e) {
      console.log(e)
    }

    if (this.state.flag === this.state.prev) {
      this.setState({flag: !this.state.flag})
    }
  };

  getCushionMonthlyData = async () => {
    try {
      const res = await API.getCushionMonthlyData({
        dollId: this.state.selectedDollData.id,
        year: this.state.date.year,
        month: this.state.date.month});

      const tempMonth = res.data.graphData;
      const graphData = [
        ["날짜", "정자세", "앞쪽", "뒤쪽", "오른쪽", "왼쪽", "오른다리꼼", "왼다리꼼"],
      ];
      const lastday = res.data.date;

      for (let i=1; i<=lastday; i++) {
        console.log(tempMonth[i].data)

        if (tempMonth[i].data) {
          graphData.push([
            `${i}일`,
            tempMonth[i].data.middle_,
            tempMonth[i].data.front_,
            tempMonth[i].data.back_,
            tempMonth[i].data.right_,
            tempMonth[i].data.left_,
            tempMonth[i].data.right_twisted_,
            tempMonth[i].data.left_twisted_,
          ])
        } else {
          graphData.push([
            `${i}일`,
            0, 0, 0, 0, 0, 0, 0
          ])
        }
      }
      await this.setState({
        graphData: graphData,
      });
      console.log(this.state.graphData);

    } catch (error) {
      console.log(error);
    }
    if (this.state.flag === this.state.prev) {
      this.setState({flag: !this.state.flag})
    }
  };

  getDollSet = async () => {
    try {
      const res = await API.getCushionDoll();
      await this.setState({
        dollSet: res.data.cushionSet,
        selectedDollData: res.data.cushionSet[0]
      });
      this.getCushionData();
      this.getCushionMonthlyData();
    } catch (error) {
      console.log(error);
    }
  };

  makeCushionIcon() {
    const doll = [];
    const temp = ["outline-primary", "outline-secondary", "outline-success", "outline-warning", "outline-info", "outline-dark", "outline-danger"];
    let i = 0;

    for (const data of this.state.dollSet) {
      // console.log(data.dollName);
      doll.push(
        <Button
          variant= {temp[i%7]}
          style={{margin: 2}}
          onClick={function() {
            this.setState({selectedDollData: data});
          }.bind(this)}>
          {data.dollName}
        </Button>
      );
      i++
    }
    if (doll) return doll
  };

  changeMonth(n) {
    // console.log(n);
    let month = this.state.date.month;
    if (n) {
      month += 1;
    } else {
      month -= 1;
    }
    // console.log(month);
    if (month < 1) {
      this.setState({
        date: {
          month: 12,
          year: this.state.date.year - 1,
        }
      })
    } else if (month > 12) {
      this.setState({
        date: {
          month: 1,
          year: this.state.date.year + 1,
        }
      })
    } else {
      this.setState({
        date: {
          month: month,
          year: this.state.date.year
        }
      });
    }
  };


  render() {
    return(
      <>
        <Fade>
          <Container className="py-5">
            <ButtonToolbar>
              {this.makeCushionIcon()}
            </ButtonToolbar>
          </Container>
        </Fade>
        <div>
          <Container>
            <Row>
              <Col>
                <Chart
                  chartType="ColumnChart"
                  width="100%"
                  height="400px"
                  data={[
                    ["Element", "빈도", { role: "style" }, {
                      sourceColumn: 0,
                      role: 'annotation',
                      type: 'string',
                      calc: 'stringify',
                    },],
                    ["정자세", this.state.today.middle_, "#F5BD42", null],
                    ["앞쪽", this.state.today.front_, "#FFFF55", null],
                    ["뒤쪽", this.state.today.back_, "#FCEF87", null],
                    ["좌측", this.state.today.left_, "#F9DB49", null], // RGB value
                    ["우측", this.state.today.right_, "gold", null], // English color name
                    ["오른다리꼼", this.state.today.right_twisted_, "#F9DB49", null],
                    ["왼다리꼼", this.state.today.left_twisted_, "silver", null],
                  ]}
                  options={{
                    title: `${this.state.today.date}`,
                    width: 600,
                    height: 400,
                    // bar: { groupWidth: '95%' },
                    legend: { position: 'none' },
                  }}
                />
              </Col>
              <Col>
                <Container>
                  <ReactSpeedometer
                    maxValue={100}
                    segments={5}
                    textColor={"grey"}
                    startColor={"tomato"}
                    endColor={"limegreen"}
                    // needleColor={"#FFFF55"}
                    // segmentColors={["firebrick", "tomato", "gold", "limegreen"]}
                    niddleHeightRatio={0.5}
                    needleTransitionDuration={4000}
                    needleTransition={"easeElastic"}
                    value={this.state.today.percentage}
                  />
                  <p>{this.state.today.comment}</p>
                </Container>
              </Col>
            </Row>

            <Row>
              <Col>
                <button onClick={async () => {
                  await this.changeMonth(0);
                  await this.getCushionMonthlyData()
                }}>Prev</button>
              </Col>
              <Col>
                <Chart
                  chartType="Line"
                  width="600px"
                  height="400px"
                  loader={<div>Loading Chart</div>}
                  data={this.state.graphData}
                  options={{
                    chart: {
                      title: `${this.state.date.year}년 ${this.state.date.month}월`,
                    },
                    series: {
                      0: { color: '#5c3292' },
                      6: { color: '#e2431e' },
                      5: { color: '#e7711b' },
                      4: { color: '#f1ca3a' },
                      3: { color: '#6f9654' },
                      2: { color: '#1c91c0' },
                      1: { color: '#43459d' },
                    }
                  }}
                />
              </Col>
              <Col>
                <button onClick={async () => {
                  await this.changeMonth(1);
                  await this.getCushionMonthlyData()
                }}>Next</button>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    )
  }
}



// export default function Cushion() {
//     const classes = useStyles();
//     // render() {
//     return (
//       <div>
//           <Parallax image={require("../Parallax/bg4.jpg")}>
//               <div className={classes.container}>
//                   <GridContainer>
//                       <GridItem>
//                           <div className={classes.brand}>
//                               <h1 className={classes.title}>Chnage Your Posture.</h1>
//                               <h3 className={classes.subtitle}>
//                                   This Page Is Showing Your Posture Data.
//                               </h3>
//                           </div>
//                       </GridItem>
//
//                   </GridContainer>
//               </div>
//
//           </Parallax>
//
//           <div className={classNames(classes.main, classes.mainRaised)}>
//               <Container>
//                   <Row>
//                       <Fade left>
//                           <div class="centered"> 좋은자세네요</div>
//                       </Fade>
//                   </Row>
//                   <Row>
//                       <Col>
//                           <Chart
//                             chartType="ColumnChart"
//                             width="100%"
//                             height="400px"
//                             data={data}
//                           />
//
//                       </Col>
//
//                   </Row>
//                   <Row>
//                       <Chart
//                         chartType="LineChart"
//                         width="100%"
//                         height="400px"
//                         data={data2}
//                         options={options}
//                       />
//
//                   </Row>
//
//               </Container>
//
//           </div>
//       </div>
//     )
//     // }
// }