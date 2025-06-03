const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'+lat+','+long+ '?unitGroup=us&key=XKZLXRURZ3SNB9WRS63C9ZHVH&contentType=json'


    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
         } 
        else if (body.error) {
            callback('Unable to find location', undefined)
         } 
         else {
            callback(undefined, body.days[0].conditions + " & windspeed is " + body.days[0].windspeed +  " mph. It is currently " + body.days[0].temp + " degress out.")
        }
    })
}

module.exports = forecast