// IMPORT PACKAGES //
const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');
const app = express();
const FA = require('@fortawesome/fontawesome-free');
const bodyParser = require('body-parser');

// IMPORT CUSTOM FUNCTIONS //
const getWeather = require('./lib/getWeather');

//BODY PARSER WITH APP.USE TO USE FOR THE WHOLE PROJECT//
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//JOIN CURRENT DIR TO PUBLIC DIR//
app.use(express.static(path.join(__dirname, 'public')));
app.engine('hbs', hbs({
   defaultLayout:'main',
   extname: '.hbs',
   layoutsDir: path.join(__dirname, 'views', 'layouts'),
   partialsDir: path.join(__dirname, 'views', 'partials'),
}));

//IMPORT SETTERS//
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');

//ASYNC GET TO LOAD WEATHER INFO FOR THE INDEX PAGE//
app.get('/', async(req, res) => {
   let data = await getWeather("Manchester", "uk");
   let name = data.name;
   let temp = Math.round(data.main.temp);
   let date = new Date();
   let icon = data.weather[0].icon;
   let country = data.sys.country;
   let description = data.weather[0].description;
   let time = new Date();
   let sunrise = new Date(data.sys.sunrise * 1000);
   let sunset = new Date(data.sys.sunset * 1000);
   let windSpeed = data.wind.speed;
   let windDirection = data.wind.deg;
   let pressure = data.main.pressure;
   let humidity = data.main.humidity;
   res.render('index', {
      name,
      temp,
      country,
      description,
      icon,
      date: date.toDateString(),
      time: time.toTimeString(),
      sunrise: sunrise.toTimeString(),
      sunset: sunset.toTimeString(),
      windSpeed,
      windDirection,
      pressure,
      humidity
   })
});

//ADD GETTERS FOR ALL PAGES//
app.get('/weather', (req, res) => {
   res.render('weather');
});
app.get('*', (req, res) => {
   res.render('404');
});

//ADD POST FUNCTION FOR /WEATHER //
app.post('/', async(req, res) => {
   let location = req.body.location;
   let countryCode = req.body.countryCode;
   let data = await getWeather(location, countryCode);
   if(data.cod == '404') {
      res.render('index', {
         err:'The location provided does not exist'
      });
      return;
   };
   let name = data.name;
   let temp = Math.round(data.main.temp);
   let date = new Date();
   let icon = data.weather[0].icon;
   let country = data.sys.country;
   let description = data.weather[0].description;
   let time = new Date();
   let sunrise = new Date(data.sys.sunrise * 1000);
   let sunset = new Date(data.sys.sunset * 1000);
   let windSpeed = data.wind.speed;
   let windDirection = data.wind.deg;
   let pressure = data.main.pressure;
   let humidity = data.main.humidity;
   res.render('index', {
      name,
      temp,
      country,
      description,
      icon,
      date: date.toDateString(),
      time: time.toTimeString(),
      listExists: true,
      sunrise: sunrise.toTimeString(),
      sunset: sunset.toTimeString(),
      windSpeed,
      windDirection,
      pressure,
      humidity
   });


   console.log(req.body);
   res.render('weather');
})

//ADD LISTENER FOR THE PORT REQUEST//
app.listen(3000, () => {
   console.log("Listening on port 3000");
});