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
   res.render('index', {
      name,
      temp,
      country,
      description,
      icon,
      date: date.toDateString(),
      time: time.toTimeString()
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
   res.render('index', {
      name,
      temp,
      country,
      description,
      icon,
      date: date.toDateString(),
      time: time.toTimeString(),
      listExists: true
   });


   console.log(req.body);
   res.render('weather');
})

//ADD LISTENER FOR THE PORT REQUEST//
app.listen(3000, () => {
   console.log("Listening on port 3000");
});