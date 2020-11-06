const fetch = require('node-fetch');
require('dotenv').config();
// const APPID = 'ef9c94e31e877563c9b118e8b4773cc3';

// const url = `https://api.openweathermap.org/data/2.5/weather?q=Burnley,uk&units=metric&appid=${process.env.APPID}`;
// const url = `https://api.openweathermap.org/data/2.5/weather?q=Burnley&appid=${APPID}`;

// const getWeather = async() => {
//    let data = await fetch(url);
//    return await data.json();
// };
const getWeather = async(location, countryCode) => {
   let data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location},${countryCode}&units=metric&appid=${process.env.APPID}`);
   return await data.json();
};

module.exports = getWeather;