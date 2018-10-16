import React, { Component } from "react";
import "./body.css";
import MarketData from "barchart-market-data-api";
/* global $ */

class Body extends Component {
    state = {
        portfolio: 100000,
        Stock1: "",
        Stock2: "",
        Stock3: ""
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
        var portfolioSize = this.state.portfolio;
        var key = "21df5c4fdb813c022b8e2d45e36c6514";
        var md = new MarketData(key);
        md.getHistory(this.state.Stock1, 'daily', { startDate: '20171015' }, { endDate: '20181015' }).then(function (history1) {
            console.log(history1);
            var closeArray1 = [];
            for (let i = 0; i < history1.length; i++) {
                var close1 = history1[i].close;
                closeArray1.push(close1);
            }
            console.log(closeArray1);
        });
        md.getHistory(this.state.Stock2, 'daily', { startDate: '20171015' }, { endDate: '20181015' }).then(function (history2) {
            console.log(history2);
            var closeArray2 = [];
            for (let i = 0; i < history2.length; i++) {
                var close2 = history2[i].close;
                closeArray2.push(close2);
            }
            console.log(closeArray2);
        });
        md.getHistory(this.state.Stock3, 'daily', { startDate: '20171015' }, { endDate: '20181015' }).then(function (history3) {
            console.log(history3);
            var closeArray3 = [];
            for (let i = 0; i < history3.length; i++) {
                var close3 = history3[i].close;
                closeArray3.push(close3);
            }
            console.log(closeArray3);
        });



        // var httpRequestOptions = {
        //     "Access-Control-Allow-Origin": 'http://localhost:3000',
        //     "Access-Control-Allow-Credentials": "true",
        //     "Access-Control-Allow-Methods": "GET",
        //     "Access-Control-Allow-Headers": "Content-Type"
        // };
        // googleFinance.historical({
        //     symbol: "NYSE:C",
        //     from: '2017-10-15',
        //     to: '2018-10-15'
        // }, httpRequestOptions, function (err, results) {
        //     if (err) throw err;
        //     console.log(results);
        // for (let i = 0; i < results.length; i++) {
        //     var newvariable = 5;
        //     //loop grab and create new object for each item in array
        // }
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
                        <label>3rd Stock Ticker</label>
                        <br></br>
                        <input value={this.state.Stock3} onChange={this.handleInputChange} name="Stock3" type="text" />
                        <br></br>
                        <p>______________________________</p>
                        <br></br>
                    </form>
                    <button className="primary" onClick={this.handleFormSubmit}>Submit</button>
                </div>
                <div className="second" id="second2">
                    <p>Stuff and things</p>
                </div>
            </div >
        )
    }
}

export default Body;
