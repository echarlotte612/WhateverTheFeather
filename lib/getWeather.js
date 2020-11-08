const fetch = require('node-fetch');
require('dotenv').config();
// let location = "Cornwall";
// let countryCode = "uk";
let units = "metric";
// const url = `http://api.openweathermap.org/data/2.5/weather?q=${location},${country}&units=${units}&appid=${process.env.APPID}`;

const getWeather = async(location, countryCode) => {
   let data = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location},${countryCode}&units=${units}&appid=${process.env.APPID}`);
   return await data.json();
}

module.exports = getWeather;