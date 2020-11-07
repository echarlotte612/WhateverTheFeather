const express = require('express');
const router = express.Router();

const getWeather = require('../lib/weather');

router.get('/', (req, res) => {
   res.render('weather');
});

router.post('/', async(req, res) => {
   let location = req.body.location;
   let countryCode = req.body.countryCode;
   let sunriseCheck = req.body.sunriseCheck;
   let sunsetCheck = req.body.sunsetCheck;
   let data = await getWeather(location, countryCode);
   if(data.cod == '404') {
      res.render('weather', {
         err:"Provided location doesn't exist"
      });
      return;
   }
   let temp = data.main.temp;
   let context = {temp};
   if(sunriseCheck=="on") {
      context.sunrise = data.sys.sunrise;
   };
   if(sunsetCheck=="on") {
      context.sunset = data.sys.sunset;
   };
   let name = data.name;
   let icon = data.weather[0].icon;
   let description = data.weather[0].description;
   let feels_like = data.main.feels_like;
   let sunrise = data.sys.sunrise;
   let sunset = data.sys.sunset;
   res.render('weather', {
      name,
      data: context,
      listExists: true
   });
});


module.exports = router;