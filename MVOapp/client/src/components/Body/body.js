import React, { Component } from "react";
import "./body.css";
import MarketData from "barchart-market-data-api";
// import Math from "mathjs";
// /* global $ */

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
        var key = "21df5c4fdb813c022b8e2d45e36c6514";
        var md = new MarketData(key);

        //Risk Free Rate
        var riskfreeRate = 0.024;
        console.log(riskfreeRate);

        //Grab Portfolio Size
        var portfolioSize = this.state.portfolio;

        //Formulas for data 
        // const reducer = (accumulator, currentValue) => accumulator + currentValue;
        var ErMatrix = [];
        // var StdMatrix = [];

        md.getHistory(this.state.Stock1, 'monthly', { startDate: '20151015' }, { endDate: '20181015' }).then(function (history1) {
            console.log(history1);
            var expectedArray1 = [];
            for (let i = 1; i < history1.length; i++) {
                console.log(history1[i]);
                console.log(history1[i--]);
            }
            console.log(expectedArray1);
        });
        // md.getHistory(this.state.Stock2, 'monthly', { startDate: '20151015' }, { endDate: '20181015' }).then(function (history2) {
        //     console.log(history2);
        //     var closeArray2 = [];
        //     var expectedArray2 = [];
        //     for (let i = 0; i < history2.length; i++) {
        //         var close2 = history2[i].close;
        //         closeArray2.push(close2);
        //     }
        //     console.log(closeArray2);
        //     var Er2 = (closeArray2.reduce(reducer) / history2.length);
        //     console.log(Er2);
        //     ErMatrix.push(Er2);
        // });
        // md.getHistory(this.state.Stock3, 'monthly', { startDate: '20151015' }, { endDate: '20181015' }).then(function (history3) {
        //     console.log(history3);
        //     var closeArray3 = [];
        //     var expectedArray3 = [];
        //     for (let i = 0; i < history3.length; i++) {
        //         var close3 = history3[i].close;
        //         closeArray3.push(close3);
        //     }
        //     console.log(closeArray3);
        //     var Er3 = (closeArray3.reduce(reducer) / history3.length);
        //     console.log(Er3);
        //     ErMatrix.push(Er3);
        // });

        console.log(ErMatrix);
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
