const express = require('express');
const router = express.Router();

const getWeather = require('../lib/weather');

router.get('/', async(req, res) => {
   let data = await getWeather("Manchester", "uk");
   let name = data.name;
   let icon = data.weather[0].icon;
   let description = data.weather[0].description;
   let temp = data.main.temp;
   let feels_like = data.main.feels_like;
   let sunrise = data.sys.sunrise;
   let sunset = data.sys.sunset;
   res.render('index', {name, data: {description, temp, "feels like": feels_like, sunrise, sunset, icon}});
});

module.exports = router;