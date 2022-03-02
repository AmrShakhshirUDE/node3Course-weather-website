const path = require('path')
const express = require('express')
const hbs = require('hbs') // to create patials

//Defining weather functions
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)  //current folder path
// console.log(path.join(__dirname, '../public')) //current file path

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')   // handle bars setup for dynamic pages. This allows to call res.render without specifying file extension "hbs" i.e. index.hbs -> index
app.set('views', viewsPath)     // Where to find the views/ templates
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req, res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Amr Shakhshir',
    })
})

app.get('/about',(req, res)=>{
    res.render('about',{
        title: 'About ME',
        name: 'Amr Shakhshir',
    })
})

app.get('/help',(req, res)=>{
    res.render('help',{
        title: 'Help',
        message: 'Contact to get help',
        name: 'Amr Shakhshir',
    })
})

app.get('/weather',(req, res)=>{
    if(!req.query.address){
        return res.send({ //return stops execution after not detecting a search term
            error:'You must provide an address'
        })
    }

    geocode(req.query.address,(error, {latitude, longitude, location}={})=>{
        if (error){
            return res.send({ //if there is an error the function stops and return the error
                error
            })  
        }
    
        forecast(longitude, latitude, (error, forecastsData) => {
            if (error){
                return res.send({
                    error
                })  
            }
            
            res.send({
                forecast:forecastsData,
                location:location,
                address:req.query.address,
            })
          })
        })

})

app.get('/products', (req,res)=>{
    if(!req.query.search){
        return res.send({ //return stops execution after not detecting a search term
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*',(req, res)=>{
    res.render('404',{
        title: 'Help Article Error',
        name: 'Amr Shakhshir',
        errorMessage: 'Help article not found.',
    })
})


app.get('*',(req, res)=>{ //match anything else that hasn't matched  yet
    res.render('404',{
        title: '404 Error',
        name: 'Amr Shakhshir',
        errorMessage: 'Page not found.',
    })
})

app.listen(port, ()=>{  // port number 3000
    console.log('Server is uo on port '+ port)
}) 