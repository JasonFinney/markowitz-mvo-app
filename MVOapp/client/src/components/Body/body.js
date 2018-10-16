import React, { Component } from "react";
import "./body.css";
import MarketData from "barchart-market-data-api";
import Math from "mathjs";
/* global $ */

class Body extends Component {
    state = {
        portfolio: 100000,
        Stock1: "",
        Stock2: ""
    }

    handleInputChange = event => {
        let value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        var key = "21df5c4fdb813c022b8e2d45e36c6514";
        var md = new MarketData(key);

        //Risk Free Rate
        var riskfreeRate = 0.024;
        console.log(riskfreeRate);

        //Grab Portfolio Size
        var portfolioSize = this.state.portfolio;

        //Er Arrays
        var ErArray1 = [];
        var ErArray2 = [];
        var DiffArray1 = [];
        var DiffArray2 = [];

        //Formulas for data 
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        var ErMatrix = [];
        var StdMatrix = [];
        var CovMatrix = [];

        md.getHistory(this.state.Stock1, 'monthly', { startDate: '20151015' }, { endDate: '20181015' }).then(function (history1) {
            console.log(history1);
            var expectedArray1 = [];
            var DiffArray11 = [];
            for (let i = 1; i < history1.length; i++) {
                var o = i - 1;
                var expect = Math.eval(history1[i].close / history1[o].close);
                var expected = expect - 1;
                expectedArray1.push(expected);
            }
            var Er1 = (expectedArray1.reduce(reducer) / history1.length) * 12;
            ErMatrix.push(Er1);
            for (let o = 0; o < history1.length; o++) {
                var item = Er1 - history1[o].close;
                DiffArray11.push(item);
            }
            standardDeviation(expectedArray1);
            function standardDeviation(values) {
                var squareDiffs = values.map(function (value) {
                    var diff = value - Er1;
                    var sqrDiff = diff * diff;
                    return sqrDiff;
                });
                var avgSquareDiff = (squareDiffs.reduce(reducer));
                var stdDev = Math.sqrt(avgSquareDiff);
                StdMatrix.push(stdDev);
            }
            ErArray1.push(expectedArray1);
            DiffArray1.push(DiffArray11);
        });
        md.getHistory(this.state.Stock2, 'monthly', { startDate: '20151015' }, { endDate: '20181015' }).then(function (history2) {
            console.log(history2);
            var expectedArray2 = [];
            var DiffArray22 = [];
            for (let i = 1; i < history2.length; i++) {
                var o = i - 1;
                var expect = Math.eval(history2[i].close / history2[o].close);
                var expected = expect - 1;
                expectedArray2.push(expected);
            }
            var Er2 = (expectedArray2.reduce(reducer) / history2.length) * 12;
            ErMatrix.push(Er2);
            standardDeviation(expectedArray2);
            function standardDeviation(values) {
                var squareDiffs = values.map(function (value) {
                    var diff = value - Er2;
                    var sqrDiff = diff * diff;
                    return sqrDiff;
                });
                var avgSquareDiff = (squareDiffs.reduce(reducer));
                var stdDev = Math.sqrt(avgSquareDiff);
                StdMatrix.push(stdDev);
            }
            ErArray2.push(expectedArray2);
            for (let o = 0; o < history2.length; o++) {
                var item = Er2 - history2[o].close;
                DiffArray22.push(item);
            }
            DiffArray2.push(DiffArray22);
        });
        console.log("DiffArrays : " + DiffArray1 + " , " + DiffArray2);
        var covStock1Stock2 = Math.chain(DiffArray1[0] * DiffArray2[0]).add(DiffArray1[1] * DiffArray2[1]).add(DiffArray1[2] * DiffArray2[2]).divide(6).done();
        CovMatrix.push(covStock1Stock2);
        console.log(ErMatrix);
        console.log(StdMatrix);
        console.log(CovMatrix);
        var Er1rf = ErMatrix[0] - riskfreeRate;
        var Er2rf = ErMatrix[1] - riskfreeRate;
        var Std1sqr = StdMatrix[0] * StdMatrix[0];
        var Std2sqr = StdMatrix[1] * StdMatrix[1];
        var weightnom1 = Er1rf * Std2sqr;
        var weightnom2 = Er2rf * covStock1Stock2;
        var weightnom = weightnom1 - weightnom2;
        var weightdom1 = Er1rf * Std2sqr;
        var weightdom2 = Er2rf * Std1sqr;
        var weightdom3 = (Er1rf + Er2rf) * covStock1Stock2;
        var weightdom = weightdom1 + weightdom2 - weightdom3;
        var weight1 = weightnom / weightdom;
        var weight2 = 1 - weight1;
        var valueinstock1 = portfolioSize * weight1;
        var valueinstock2 = portfolioSize * weight2;
        $("#target1").append(valueinstock1);
        $("#target2").append(valueinstock2);
        // $.ajax({
        //     method: "POST",
        //     url: "/api/inputs/database",
        //     data: newvariable
        // }).then(function () {

        // })
        // });
        console.log(portfolioSize);
    }

    render() {
        return (
            <div>
                <div className="first" id="first1">
                    <form className="form">
                        <label>How large is your portforlio?</label>
                        <br></br>
                        <input value={this.state.portforlio} onChange={this.handleInputChange} name="portfolio" type="number" />
                        <br></br>
                        <p>______________________________</p>
                        <br></br>
                        <label>1st Stock Ticker</label>
                        <br></br>
                        <input value={this.state.Stock1} onChange={this.handleInputChange} name="Stock1" type="text" />
                        <br></br>
                        <p>______________________________</p>
                        <br></br>
                        <label>2nd Stock Ticker</label>
                        <br></br>
                        <input value={this.state.Stock2} onChange={this.handleInputChange} name="Stock2" type="text" />
                        <br></br>
                        <p>______________________________</p>
                        <br></br>
                    </form>
                    <button className="primary" onClick={this.handleFormSubmit}>Submit</button>
                </div>
                <div className="second" id="second2">
                    <p>Please Allocate your Portfolio Thusly</p>
                    <br></br>
                    <p>{this.state.Stock1}</p>
                    <p id="target1"></p>
                    <br></br>
                    <br></br>
                    <p>{this.state.Stock2}</p>
                    <p id="target2"></p>
                    <br></br>
                </div>
            </div >
        )
    }
}

export default Body;
