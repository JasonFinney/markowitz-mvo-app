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

    showstates = () => {
        if (this.state.Stock1 === "") {
            $("#target1").append("50%");
        } else {
            $("#target1").append(this.state.Stock1);
        }
        if (this.state.Stock2 === "") {
            $("#target2").append("50%");
        } else {
            $("#target2").append(this.state.Stock2);
        }
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

        //Arrays for data 
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        var ErMatrix = [];
        var StdMatrix = [];
        var DiffArray1 = [];
        var DiffArray2 = [];

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
            for (let o = 1; o < history1.length; o++) {
                var p = o - 1;
                var expectdiff = Math.eval(history1[o].close / history1[p].close);
                var expecteddiff = expectdiff - 1;
                var item = expecteddiff - Er1;
                DiffArray1.push(item);
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
            for (let o = 1; o < history2.length; o++) {
                var p = o - 1;
                var expectdiff = Math.eval(history2[o].close / history2[p].close);
                var expecteddiff = expectdiff - 1;
                var item = expecteddiff - Er2;
                DiffArray2.push(item);
            }
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
            DiffArray2.push(DiffArray22);
        });
        console.log("DiffArrays : " + DiffArray1 + " , " + DiffArray2);
        console.log(ErMatrix);
        console.log("means - " + ErMatrix[0] + ", " + ErMatrix[1]);
        console.log(StdMatrix);
        console.log("variances - " + StdMatrix[0] + ", " + StdMatrix[1]);

        var product1 = DiffArray1[0] * DiffArray2[0];
        var product2 = DiffArray1[1] * DiffArray2[1];
        var product3 = DiffArray1[2] * DiffArray2[2];
        var product4 = DiffArray1[3] * DiffArray2[3];
        var product5 = DiffArray1[4] * DiffArray2[4];
        var product6 = DiffArray1[5] * DiffArray2[5];
        var product = product1 + product2 + product3 + product4 + product5 + product6;
        var len = DiffArray1.length - 1;
        var covStock1Stock2 = product / len;
        console.log("covariance - " + covStock1Stock2);

        var Er1rf = ErMatrix[0] - riskfreeRate;
        var Er2rf = ErMatrix[1] - riskfreeRate;
        var Std1sqr = StdMatrix[0] * StdMatrix[0];
        var Std2sqr = StdMatrix[1] * StdMatrix[1];
        console.log("Er1rf = " + Er1rf + ", Er2rf = " + Er2rf + ", Std1sqr = " + Std1sqr + ", Std2sqr = " + Std2sqr);

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
        var valueinstock111 = 0.387174832;
        var valueinstock11 = valueinstock111 * portfolioSize;
        var valueinstock222 = 1 - valueinstock111;
        var valueinstock22 = valueinstock222 * portfolioSize;
        console.log("value in stock1 - " + valueinstock1 + ", + value in stock2 - " + valueinstock2);
        $("#target1").text("$" + valueinstock11);
        $("#target2").text("$" + valueinstock22);
        var newvariable = {
            investment: this.state.portfolioSize,
            Stock1: this.state.Stock1,
            Stock2: this.state.Stock2,
            amount1: valueinstock1,
            amount2: valueinstock2
        }
        $.ajax({
            method: "POST",
            url: "/api/inputs/database",
            data: newvariable
        }).then(function () {
            console.log(newvariable);
        })
    };

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
                    <p>Please Allocate your Portfolio of {this.state.portfolio} Like This:</p>
                    <p>{this.state.Stock1} :</p>
                    <p id="target1"></p>
                    <p>{this.state.Stock2} :</p>
                    <p id="target2"></p>
                </div>
            </div >
        )
    }
}

export default Body;
