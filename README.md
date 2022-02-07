# Geospatial Data Visualization of a Dating App

This project was bootstrapped with [CRA](https://github.com/facebook/create-react-app). I have used Mapbox for maps and deckgl for geospatial data visualization. Turf.js was used to randomly generate geocordinates of a user to plot within it's polygon(area region).

## Live Demo
[https://deckgl-dating-dataviz.netlify.app/](https://deckgl-dating-dataviz.netlify.app/)

## Project Images
[GeoJsonPolygon](https://i.ibb.co/ZhXqj2X/Screenshot-433.png)
[ScatterplotPaidAndRegularUsers](https://i.ibb.co/w629VNT/Screenshot-434.png)
[GeojsonWithHexagonLayer](https://i.ibb.co/8BBRmMG/Screenshot-432.png)

## Technologies/Libraries used
[mapbox](https://www.mapbox.com/) - to render map. 
[react-map-gl](https://visgl.github.io/react-map-gl/) - to use Mapbox GL JS in React applications easily.
[deck.gl](https://deck.gl/) - to visualize large-scale geospatial datasets.
[turf](https://turfjs.org/) - to generate random geocordinates within a given polygon.

### `Features`
1) Visualization of pro users and regular users using ScatterplotLayer.
2) Visualization of GeoJson data uisng GeoJsonLayer and added toolip on hover to show info about the area like Toal no. of users, Male users, Female users, Pro users, Pincode of the area.
3) Visualization of users using HexagonLayer to show aggregation of users on the maps.
4) Added support to select/render different layers using checkbox.
5) Added support to tweak the radius range of ScatterplotLayer and HexagonLayer to render points differently.
6) Added Dark/Light mode support along with other styles too.

### `Future Enhancements`
1) Adding more filters to render different informations on the map.
2) Add more layers to render different types of visualizations like Heatmaps.
3) Improve code quality by refactoring and abstracting some components.
4) Improve folder structure to make it more robust and scalable.



