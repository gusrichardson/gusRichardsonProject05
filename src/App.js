import React, { Component } from 'react';
import './App.css';
import Title from './Title';
import Weather from './Weather';
import FormFile from './FormFile';

const key = '0eb7bbceb524f6b41c9a80030c913889';
const proxy = 'https://cors-anywhere.herokuapp.com/';

class App extends Component {

  state = {
    high: "",
    low: "",
    summary: ""
  }

  getWeather = async (e) => {
    e.preventDefault();
    const lat = e.target.elements.latitude.value;
    console.log(lat);
    const long = e.target.elements.longitude.value;
    console.log(long);
    const apiCall = await fetch(`${proxy}https://api.darksky.net/forecast/${key}/${lat},${long}`);
    const data = await apiCall.json();
    // console.log(data.daily.data);
    const daily = data.daily.data;
    console.log(daily[0], daily[1]);
    this.setState({
      high: daily[0].temperatureHigh,
      low: daily[0].temperatureLow,
      summary: daily[0].summary,
    })
  }

  render() {
    return (
      <div className="App">
        <Title />
        <Weather
          high={this.state.high}
          low={this.state.low}
          summary={this.state.summary}
        />
        <FormFile getWeather={this.getWeather} />
      </div>

    );
  }
}

export default App;