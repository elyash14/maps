import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import "mapbox-gl/dist/mapbox-gl.css";

import Application from "./application";

const initialZones = [
  {
    title: "Rasht",
    feature: {
      type: "Polygon",
      coordinates: [
        [
          [49.592540752047995, 37.27107443323065],
          [49.60128224930051, 37.27627948666117],
          [49.61089789627724, 37.26867566996542],
          [49.594560339344156, 37.26332615266112],
          [49.592540752047995, 37.27107443323065]
        ]
      ]
    }
  }
];

const app = new Application("map", initialZones);

const showBtn = document.querySelector("#show-zones");
showBtn.onclick = () => app.render("show");

const hideBtn = document.querySelector("#hide-zones");
hideBtn.onclick = () => app.render("hide");

const drawBtn = document.querySelector("#draw");
drawBtn.onclick = () => app.toggleDraw();
