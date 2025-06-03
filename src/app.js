const path = require('path') //core node module
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//define paths for express calls
const DIRECTORYPATH = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebards engine and views location 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(DIRECTORYPATH))

//all of these are different routes in app /app/about & setup static directories

app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather App',
        name: 'Dhilan'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Dhilan'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Here to help',
        title: 'Help Page',
        name: 'Dhilan'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "You must provide an address"
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({ error })
            }
            res.send({
                address: req.query.address,
                forecast: forecastData,
                location: location
            })

        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "404",
        name: "Dhilan",
        errorMessage: "Help article not found"
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "404",
        name: "Dhilan",
        errorMessage: "Page not found"
    })
})

app.listen(3000, () => {
    console.log('server is up on port 3000')
}) //starts up server