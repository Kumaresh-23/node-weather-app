const request = require ('request')
const chalk = require('chalk')

const geocode = (address, callback) => {
    const geocodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +encodeURIComponent(address)+ '.json?access_token=pk.eyJ1Ijoia3VtYXJlc2gyMyIsImEiOiJjbDY2aDRmMmIwM3hoM2p0ZGFydDYyOW1pIn0.oi449-8nDCpsZ2eLSRoFWA&limit=1'
    request({url:geocodeUrl, json:true}, (error, {body}) => {
       if(error){
           callback('Unable to load', undefined)
       }
       else if(body.features.length === 0){
          callback('No matching result', undefined)
       }
       
       else {
           callback(undefined, {
               latitude : body.features[0].center[1],
               longitude : body.features[0].center[0],
               location : body.features[0].place_name})
       }

       
    })
    
    
}

module.exports = geocode