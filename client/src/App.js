import React, { Component } from 'react';
import Navbar from "./components/navbar";
import Body from "./components/Body";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="black">
          <Body />
          <div>
            <p>Simply enter any two stocks and see how they should be proportioned!</p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
