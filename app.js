const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

const MongoClient = require('mongodb').MongoClient

const guitars = require('./routes/guitars')
const serviceRecords = require('./routes/serviceRecords')

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())

const port = 8080
const url = "mongodb://localhost:27017/"
global.db = ""

// Routes
app.use('/api/guitar', guitars)
app.use('/api/service', serviceRecords)

app.use(function(res, req, next){
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})


MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, database) {
    // NOTE: implement an email service to email me if it goes down..
    if(err) console.log(err)
    db = database.db('gear')

    app.listen(port, function() {
        console.log("Listening on port " + port)
    })
})