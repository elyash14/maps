import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import * as turf from "@turf/turf";

const Application = class {
  container = null;
  zones = null;
  map = null;
  draw = null;

  constructor(container, zones = []) {
    this.container = container;
    this.zones = zones;
    this._initialMap();
  }

  _initialMap = () => {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoic21zYWVpZDY0IiwiYSI6ImNrNzdkbGc3dzAwaDQzbG52aXJ3OWE4cTgifQ.ROB6bd_fVWlA2pbyNeNLEQ";

    this.map = new mapboxgl.Map({
      container: this.container,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [49.602045, 37.27071],
      zoom: 14
    });

    // show initial zones
    const self = this;
    this.map.on("load", function() {
      self._initialTools();
      self.render();
    });
  };

  _initialTools = () => {
    this.draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true
      }
    });
    this.map.addControl(this.draw);
  };

  render = (mode = "show") => {
    this._removeFeatureCollection();
    if (mode == "show") {
      const featureCollection = this._createFeatureCollectionFromZones(
        this.zones
      );
      this._renderZonesOnMap(featureCollection);
    }
  };

  toggleDraw = () => {
    if(this.draw){
      this.map.removeControl(this.draw);
      this.draw = null;
    }else{
      this._initialTools();
    }
  };

  _createFeatureCollectionFromZones = zones => {
    const features = [];
    zones.forEach(function(zone) {
      // create polygon features for each area (zone)
      features.push({
        type: "Feature",
        geometry: zone.feature,
        properties: {
          geoType: "polygon"
        }
      });
      // calculate center of each polygon to show  it's title
      const center = turf.centerOfMass(zone.feature);
      features.push({
        type: "Feature",
        geometry: center.geometry,
        properties: {
          geoType: "point",
          title: zone.title
        }
      });
    });

    // create a featureCollection from all features as a source
    const featureCollection = {
      type: "FeatureCollection",
      features: features
    };

    return featureCollection;
  };

  _renderZonesOnMap = featureCollection => {
    this.map.addSource("zones-source", {
      type: "geojson",
      data: featureCollection
    });

    this.map.addLayer({
      id: "zones-layer",
      type: "fill",
      source: "zones-source",
      filter: ["==", "geoType", "polygon"],
      paint: {
        "fill-color": "rgba(200, 100, 240, 0.4)",
        "fill-outline-color": "rgba(200, 100, 240, 1)"
      }
    });

    this.map.addLayer({
      id: "zones-point",
      type: "symbol",
      filter: ["==", "geoType", "point"],
      source: "zones-source",
      layout: {
        "text-field": ["get", "title"],
        "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
        "text-offset": [0, 0.6],
        "text-anchor": "top"
      }
    });

    const boxToBox = turf.bbox(featureCollection);
    this.map.fitBounds(boxToBox, { padding: 150 });
  };

  _removeFeatureCollection = () => {
    if (this.map.getSource("zones-source")) {
      this.map.removeLayer("zones-layer");
      this.map.removeLayer("zones-point");
      this.map.removeSource("zones-source");
    }
  };
};

export default Application;
