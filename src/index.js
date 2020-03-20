require('@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css')
var mapboxgl = require('mapbox-gl');


mapboxgl.accessToken =
  "pk.eyJ1Ijoic21zYWVpZDY0IiwiYSI6ImNrNzdkbGc3dzAwaDQzbG52aXJ3OWE4cTgifQ.ROB6bd_fVWlA2pbyNeNLEQ";

var map = new mapboxgl.Map({
  container: "map", // container id
  style: "mapbox://styles/mapbox/streets-v11", //hosted style id
  center: [49.602045, 37.27071], // starting position
  zoom: 14 // starting zoom
});

