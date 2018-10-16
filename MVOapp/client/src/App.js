import React, { Component } from 'react';
import Navbar from "./components/navbar";
import Body from "./components/Body";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Body />
        <div>
          <p>  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident iusto excepturi, reprehenderit necessitatibus numquam esse. Laboriosam eum nihil quae asperiores officiis excepturi. Esse obcaecati quos fugiat, reprehenderit illum mollitia quia. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Totam quod est expedita vitae hic excepturi explicabo adipisci suscipit delectus magni nesciunt atque ad velit amet ipsam nisi, maxime minima ullam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, cum nemo ratione minima obcaecati excepturi rerum? Qui, voluptas? Incidunt, aut placeat enim architecto quis dolor eius nam maiores! Illum, veritatis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae quod necessitatibus, animi officia inventore a doloribus quidem eos saepe cumque, facilis voluptatum, ducimus veniam blanditiis consequatur natus explicabo doloremque magni?</p>
        </div>
      </div>
    );
  }
}

export default App;
