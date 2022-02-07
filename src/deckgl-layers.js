import { ScatterplotLayer, HexagonLayer, GeoJsonLayer } from "deck.gl";

//ScatterplotLayer Constants
const PICKUP_COLOR = [114, 19, 108];
const DROPOFF_COLOR = [243, 185, 72];

//HexagonLayer Constants
const HEATMAP_COLORS = [
  [255, 255, 204],
  [199, 233, 180],
  [127, 205, 187],
  [65, 182, 196],
  [44, 127, 184],
  [37, 52, 148],
];

const LIGHT_SETTINGS = {
  lightsPosition: [-73.8, 40.5, 8000, -74.2, 40.9, 8000],
  ambientRatio: 0.4,
  diffuseRatio: 0.6,
  specularRatio: 0.2,
  lightsStrength: [0.8, 0.0, 0.8, 0.0],
  numberOfLights: 2,
};

const elevationRange = [0, 1000];

const getColorForRegion = (users) => {
  let color = [];
  if (users >= 200) {
    color = [156, 15, 72];
  } else if (users >= 150 && users < 200) {
    color = [230, 9, 101];
  } else if (users >= 100 && users < 150) {
    color = [184, 64, 94];
  } else if (users >= 50 && users < 100) {
    color = [249, 72, 146];
  } else if (users >= 0 && users < 50) {
    color = [255, 161, 201];
  } else {
    color = [255, 255, 255];
  }
  return color;
};

export function renderLayers(props) {
  const { areas, users, onHover, settings } = props;
  // console.log("users", users);
  // console.log("areas", areas);
  return [
    settings.showScatterplot &&
      new ScatterplotLayer({
        id: "scatterplot",
        getPosition: (d) => d.position,
        getFillColor: (d) => (d.pickup ? PICKUP_COLOR : DROPOFF_COLOR),
        getRadius: (d) => 5,
        opacity: 0.8,
        pickable: true,
        radiusMinPixels: 0.25,
        radiusMaxPixels: 30,
        data: users,
        // onHover,
        ...settings,
      }),
    settings.showHexagon &&
      new HexagonLayer({
        id: "heatmap",
        colorRange: HEATMAP_COLORS,
        elevationRange,
        elevationScale: 5,
        extruded: true,
        getPosition: (d) => d.position,
        lightSettings: LIGHT_SETTINGS,
        opacity: 0.8,
        pickable: true,
        data: users,
        // onHover,
        ...settings,
      }),
    settings.showGeoJson &&
      new GeoJsonLayer({
        id: "geojson",
        data: areas,
        pickable: true,
        stroked: false,
        filled: true,
        extruded: true,
        lineWidthScale: 20,
        lineWidthMinPixels: 2,
        getFillColor: (d) => getColorForRegion(d.properties.users),
        getLineColor: [255, 255, 255, 255],
        getPointRadius: 100,
        getLineWidth: 5,
        getElevation: 30,
        opacity: 0.6,
        onHover,
        ...settings,
      }),
  ];
}
