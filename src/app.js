const request = require ('request')
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const chalk = require('chalk')

const app = express()

//define paths for express config
const pathDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars and views
app.set('view engine', 'hbs' )  // if the filename is views we can use this itslef
app.set('views', viewsPath)     //if its not in the root directory set the 'viewsPath and call it here


// setup static directory to use
app.use(express.static(pathDirectory))
hbs.registerPartials(partialsPath)

app.get('/', (req,res) => {
    res.render('index', {title:'WEATHER'})
})

app.get('/about', (req,res) => {
    res.render('about', { name:'Kumaresh'})
})

app.get('/help', (req,res) => {
    res.render('help', {title:'Help Page', contact:'+91 8465792695'})
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
      return res.send({
            error:'Provide address'
        })
    }

    geocode(req.query.address, (err,{latitude, longitude, location} = {}) => {
        if(err){return res.send({err})}
        forecast(latitude, longitude, (err,forecastData) => {
        if(err){return res.send({err})}
        res.send({
            location,
            forecast:forecastData,
            address:req.query.address
        })
        })
    })
})




app.get('/product', (req,res) => {
    if(!req.query.search)
    {
     return res.send({
        error: 'Provide search term'
     })
    }    
    console.log(req.query.search)
    res.send(
        {product:[]}
    )
})

app.get('/help/*', (req,res) => {
    res.render('404', {title:'404',message:'Help article not found'})
})

app.get('*', (req,res) => {
   res.render('404', {title:'404',message:'Page not found'})
})


app.listen(3000, () => {
    console.log('Server listening')
})
