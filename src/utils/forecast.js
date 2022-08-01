const request = require ('request')
const chalk = require('chalk')

const forecast = (latitute, longitude, callback) => {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitute}%2C${longitude}?unitGroup=metric&key=3EGNMA5H8PQDKVTV5P2BLRXTA&contentType=json`
    request({url, json:true}, (error, response) => {
        if(error){
            callback('Unable to load URL', undefined)
        }else if(response.statusCode !== 200){
            callback(response.body, undefined)
        }else{
            callback(undefined, response.body.days[0].description + 'The temperature is currently ' + response.body.currentConditions.temp+ ' degrees out.There is ' +response.body.currentConditions.precip+ '% chance of raining.' +response.body.description+ '.')
        }
    })
}

module.exports = forecast