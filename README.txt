1. npm init -y (creates package.json)
2. Add nodedemon to start in package.json ("start": "nodemon index.js")
3. Request the API - get the url and API key

//--INDEX.JS SET UP--//
4. Add new file index.js
5. Install node-fetch (npm i node-fetch)
6. Add a new const called fetch to require node-fetch in index.js
7. Add a new const called url that holds the api url
8. Add a new async function called getWeather that sets a new let variable called data to await the fetch(url)
9. console.log(await data.json())
10. run getWeather. 

//--DOTENV SET UP--//
1. npm i dotenv
2. Add a new file called .env and a new file called .gitignore
3. Add .env and node_modules to .gitignore
4. Put the API key in plain text in .env (APPID = apikeyapikeyapikey)
5. Call the APPID value in index.js with "require('dotenv').config();" at the top and "${process.env.APPID}" at the end of the API url

//--ADD PACKAGES--//
1. npm i express express-handlebars path
2. Add folder structure (lib, public, public>images, routes, views>layouts, views>partials)
3. Move the code in index.js into lib/getWeather.js. 
4. Change the console.log in getWeather to a return
5. Change the function call to a module export

//--SETTING UP INDEX.JS--//
1. Set up const to require express, express-handlebars, path and the express function
2. Add a const to import the getWeather function 
3. Set up an app.use to join __dirname to 'public'
4. Register a handlebars template engine using engine method, based on the file extension .hbs
4.5 path.join the layouts and partials directories to the current directory (file_nameDir: path.join(__dirname, 'views', 'file_name'))
5. Import your setters for views and view engine to recognise the hbs extensions
6. Add async getter for getWeather information required & render at the end.
7. Add getters for different pages
8. Add listener for port 3000

//--SET UP HANDLEBAR FILES--//
1. main.hbs in views>layouts with stylesheet imported in head
2. navbar in views>partials if needed 
3. index in views
4. weather in views
5. 404 in views

/TO TARGET IMAGES IN IMAGES//
<img src="images/icon{{icon}}.png" alt="image">

//ADDING THE WEATHER FORM PAGE//
1. POST request to ask server to accept / store data in json format (called body)
2. Add form with labels and inputs to /weather.hbs
3. Add bodyparser to change any values submitted to a json format
3.5 ((Body-parser is a built in module, no npm installation is required.))
4. Add bodyparser to the required packages in index.js
5. Set app.use, so body-parser can be used for the whole project.
6. Add the POST method using app.post in index.js and get it to render 'weather'

//ALTERING THE getWeather FUNCTION//
1. Add location and country as arguments for the async function in getWeather.js
2. Add an if function in weather.hbs to list all the relevent data based on if listExits:
      {{#if err}}
   <h2>{{err}}</h2>
{{/if}}

{{#if listExists}}
   <h2>WEATHER =</h2>
   <ul>
      {{#each data}}
         <li>{{@key}}: {{this}}</li>
      {{/each}}
   </ul>
{{/if}}
3. Add initial values for your location and country within your index getter using await.
   let data = await getWeather("Manchester", "uk");
4. Add your location and country into the POSTer for weather 
5. In the POSTer for weather, await getWeather for making the api request taking the parameters location and country
6. Add an if statement in the POSTer in case a weird location or country is given
7. Then copy in your variable stuff from app.get('/') depending on what information you wanna show and add listExists: true
8. REMEMBER TO RENDER TO THE WEATHER PAGE AND NOT THE INDEX PAGE



