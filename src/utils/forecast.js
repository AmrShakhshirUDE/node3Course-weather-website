const request = require('postman-request')

const forecast = (longitude ,latitude, callback)=>{
    // const url = 'http://api.weatherstack.com/current?access_key=2f174fd930c696c3a796345a47d8a4d0&query=37.8267,-122.4233&units=f'//fahrenheit
    const url = 'http://api.weatherstack.com/current?access_key=2f174fd930c696c3a796345a47d8a4d0&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)

    request({url, json:true}, (error, {body})=>{ // shorthand url: url -> url || use {body} instead of respons so we can replace response.body by-> body
        if(error){
            callback('Unable to connect to weather service!',undefined)
        }else if(body.error){
            callback('Unable to find location',undefined)
        }else {
                callback(undefined,{
                    weather:body.current.weather_descriptions[0],
                    temperature:body.current.temperature,
                    feelslike:body.current.feelslike,
                })
        }

    })
}

module.exports=forecast