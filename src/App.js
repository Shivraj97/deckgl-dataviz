import React, { Component } from "react";
import { StaticMap } from "react-map-gl";
import {
  LayerControls,
  MapStylePicker,
  HEXAGON_CONTROLS,
} from "./controls";
import DeckGL from "deck.gl";
import { renderLayers } from "./deckgl-layers";
import Hover from "./components/Hover";
import "./App.css";

const INITIAL_VIEW_STATE = {
  longitude: 77.6055933,
  latitude: 12.9018822,
  zoom: 10,
  pitch: 0,
  bearing: 0,
};

export default class App extends Component {
  state = {
    hover: {
      x: 0,
      y: 0,
      hoveredObject: null,
      opacity: 0.5,
    },
    areas: [],
    users: [],
    settings: Object.keys(HEXAGON_CONTROLS).reduce(
      (accu, key) => ({
        ...accu,
        [key]: HEXAGON_CONTROLS[key].value,
      }),
      {}
    ),
    style: "mapbox://styles/mapbox/dark-v10",
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        console.log(position);
        INITIAL_VIEW_STATE.longitude = position.coords.longitude;
        INITIAL_VIEW_STATE.latitude = position.coords.latitude;
      },
      function (error) {
        console.error("Error Code = " + error.code + " - " + error.message);
      }
    );
    Promise.all([
      fetch("https://kyupid-api.vercel.app/api/areas"),
      fetch("https://kyupid-api.vercel.app/api/users"),
    ])

      .then(([areas, users]) => {
        return Promise.all([areas.json(), users.json()]);
      })
      .then(([areas, users]) => {
        // processing the api response
        users = users.users;
        areas = areas.features;
        this._processData({ areas, users });
      });
  }

  _processData = ({ areas, users }) => {
    let usersData = [];
    for (let i = 0; i < areas.length; i++) {
      const area = areas[i];
      let usersCount = 0;
      let proUsers = 0;
      let maleUsers = 0;
      let femaleUsers = 0;
      usersData = users.filter((user) => {
        if (area.properties.area_id === user.area_id) {
          user.position = area.geometry.coordinates[0][0];
          usersCount++;
        }
        return area.properties.area_id === user.area_id;
      });

      usersData.forEach((user) => {
        if (user != null) {
          if (user.is_pro_user === true) {
            proUsers++;
          }
          if (user.gender === "M") {
            maleUsers++;
          } else {
            femaleUsers++;
          }
          area.properties.users = usersCount;
          area.properties.proUsers = proUsers;
          area.properties.maleUsers = maleUsers;
          area.properties.femaleUsers = femaleUsers;
        }
      });
    }
    this.setState({
      areas,
      users,
    });
  };

  _onHover({ x, y, object }) {
    console.log("object", object);
    this.setState({
      hover: { x, y, hoveredObject: object && object.properties, opacity: 0.8 },
    });
  }

  onStyleChange = (style) => {
    this.setState({ style });
  };

  _updateLayerSettings(settings) {
    this.setState({ settings });
  }

  render() {
    let { areas, users } = this.state;
    if (!areas) {
      return null;
    }
    const { hover, settings } = this.state;
    return (
      <div>
        {hover && hover.hoveredObject && <Hover hover={hover} />}
        <MapStylePicker
          onStyleChange={this.onStyleChange}
          currentStyle={this.state.style}
        />
        <LayerControls
          settings={settings}
          propTypes={HEXAGON_CONTROLS}
          onChange={(settings) => this._updateLayerSettings(settings)}
        />
        <DeckGL
          layers={renderLayers({
            areas: areas,
            users: users,
            onHover: (hover) => this._onHover(hover),
            settings: this.state.settings,
            hover,
          })}
          initialViewState={INITIAL_VIEW_STATE}
          controller
        >
          <StaticMap
            mapStyle={this.state.style}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOXTOKEN}
          />
        </DeckGL>
      </div>
    );
  }
}
