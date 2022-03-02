const request = require('postman-request')

const geocode = (address, callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYW1yc2hha2hzaGlyIiwiYSI6ImNqbm9vdGVtcTE3NzMzd21xYmt6d3hudmwifQ.GDIy7geJRsTVvrtLRNciYg&limit=1' //encodeUriComponent deals with special chars

    request({url, json:true}, (error, {body})=>{
        if(error){
            callback('Unable to connect to location services!',undefined)
        }else if(body.features.length === 0){
            callback('Unable to find location. Try another search.',undefined)
        }else {
                // const placeName = response.body.features[0].place_name
                // const longitude= response.body.features[0].center[0]
                // const latitude= response.body.features[0].center[1]
                // console.log('Geometry coordinates for ' + placeName +' are\\ longitude: '+longitude+' and latitude: '+latitude)
                callback(undefined,{
                    location:body.features[0].place_name,
                    longitude:body.features[0].center[0],
                    latitude:body.features[0].center[1],
                })
        }

    })
}

module.exports=geocode