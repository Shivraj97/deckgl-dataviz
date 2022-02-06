import React, { Component } from "react";
import MapGL from "react-map-gl";
import { MapStylePicker } from "./controls";

const MAPBOX_STYLE = "mapbox://styles/mapbox/dark-v9";
// const MAPBOX_TOKEN = process.env.MapboxAccessToken; // eslint-disable-line
const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOXTOKEN; // eslint-disable-line

function SetToken() {
  return (
    <div style={{ fontSize: "20px" }}>
      <div>You don't have a Mapbox token set in your environemnt.</div>
      <ul>
        <li>
          Go to <a href="http://mapbox.com">Mapbox</a> and log in or sign up to
          get a token.
        </li>
        <li>Copy the token to your clipboard.</li>
        <li>Stop this app in the terminal (ctrl+c)</li>
        <li>
          <p>type: </p>
          <p>
            <code>export MapboxAccessToken="</code>, then paste your token, then
            type a closing ".
          </p>{" "}
          ie <code>export MapboxAcessToken="pk.123456"</code>
        </li>
        <li>
          Restart the app from the terminal (<code>yarn start</code>)
        </li>
      </ul>
    </div>
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      style: MAPBOX_STYLE,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
        longitude: -74,
        latitude: 40.7,
        zoom: 11,
        maxZoom: 16,
      },
    };
  }
  onStyleChange = (style) => {
    this.setState({ style });
  };



  render() {
    return (
      <div>
        <MapStylePicker
          onStyleChange={this.onStyleChange}
          currentStyle={this.state.style}
        />
        <MapGL
          {...this.state.viewport}
          mapStyle={this.state.style}
          mapboxApiAccessToken={MAPBOX_TOKEN}
        ></MapGL>
      </div>
    );
  }
}

export default App;
