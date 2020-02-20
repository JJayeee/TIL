import React, { Component } from 'react';
import {Row, Col, Container, Tabs, Tab} from 'react-bootstrap';
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
import CushionData from "./Cushion";
import classNames from "classnames";
// react components for routing our app without refresh

const useStyles = makeStyles(styles);

const data = [
  ["Element", "Density", { role: "style" }],
  ["Copper", 8.94, "#b87333"], // RGB value
  ["Silver", 10.49, "silver"], // English color name
  ["Gold", 19.3, "gold"],
  ["Platinum", 21.45, "color: #e5e4e2"] // CSS-style declaration
];
const data2 = [
  ["Year", "Sales", "Expenses"],
  ["2004", 1000, 400],
  ["2005", 1170, 460],
  ["2006", 660, 1120],
  ["2007", 1030, 540]
];
const options = {
  title: "Company Performance",
  curveType: "function",
  legend: { position: "bottom" }
};


export default function Cushion() {
  const classes = useStyles();
  // render() {
  return (
    <div>
      {/*<div id="bg-img-check">*/}
      {/*  <div className={classes.container}>*/}
      {/*    <GridContainer>*/}
      {/*      <GridItem>*/}
      {/*        <div className={classes.brand}>*/}
      {/*          <h1 className={classes.title}>Change Your Posture.</h1>*/}
      {/*          <h3 className={classes.subtitle}>*/}
      {/*            This Page Is Showing Your Posture Data.*/}
      {/*          </h3>*/}
      {/*        </div>*/}
      {/*      </GridItem>*/}
      {/*    </GridContainer>*/}
      {/*  </div>*/}
      {/*</div>*/}
      <Parallax image={require("../Parallax/t1.jpg")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem>
              <div className={classes.brand}>
                <h1 className={classes.title}>Change Your Posture.</h1>
                <h3 className={classes.subtitle}>
                  This Page Is Showing Your Posture Data.
                </h3>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      ​
      {/* 여기까지는 윗부분 샘플*/}
      ​

      <div className={classNames(classes.main, classes.mainRaised)}>
        <Tabs id="uncontrolled-tab-example">
          <Tab title="Cushion"></Tab>
          <Tab title="Vest" disabled></Tab>
        </Tabs>
        <CushionData></CushionData>
      </div>
    </div>
  )
// }
}