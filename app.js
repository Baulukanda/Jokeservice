const express = require('express')
const app = express()
const config = require('./config')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')

//ADD TO REGISSTRY
fetch('https://krdo-joke-registry.herokuapp.com/api/services', {method: 'POST', body: JSON.stringify(config.registry),
headers: { 'Content-Type': 'application/json' }}).then(res => res.json())
.then(json => console.log("Registry Response: " + JSON.stringify(json)));

//SETUP MONGOOSE
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect(config.mongoDBhost, {
    useNewUrlParser: true,
    useCreateIndex: true
})

//MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.set('view engine', 'pug')


//ROUTES
const jokeRoutes = require('./routes/jokes')(express)
const appRoutes = require('./routes/Application')(express)
const linkRoutes = require('./routes/JokeLinks')(express)
app.use('/api/jokes', jokeRoutes)
app.use('/', appRoutes)
app.use('/', linkRoutes)




//START SERVER
app.listen(config.PORT, () => {
    console.log(`SERVER STARTED ON PORT ${config.PORT}`)
})