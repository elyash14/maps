// require('@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css');
import Application from "./js/application";

const initialZones = [
  {
    title: "T1",
    feature: {
      type: "Polygon",
      coordinates: [
        [
          [49.602045, 37.27071],
          [49.604051, 37.26977],
          [49.605388, 37.270784],
          [49.603826, 37.273876],
          [49.599686, 37.272882],
          [49.600168, 37.272081],
          [49.601023, 37.271366],
          [49.602045, 37.27071]
        ]
      ]
    }
  }
];

const app = new Application('map', initialZones);

const showBtn = document.querySelector("#show-zones");
showBtn.onclick = () => app.render('show');

const hideBtn = document.querySelector("#hide-zones");
hideBtn.onclick = () => app.render('hide');