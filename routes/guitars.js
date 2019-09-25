const express = require('express');
const router = express.Router();

var Guitar = require('../models/guitar');

// connection db
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

// Midware
router.use(function timeLog(req, res, next){
    console.log('Time: ', Date.now());
    next();
});

// getting guitars from database
router.get('/:UserId', function(req, res){
    let userid = req.params.UserId;
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, client){
        if (err) {
            res.send(500).json({
                "code":500,
                "message":"Something went wrong, please try again."
            });
        }

        var dbo = client.db("gearapp");
        dbo.collection("guitars").find({ owner: `${ userid }`}).toArray(function(err, result){
            if (err) {
                res.status(424).json({
                    "code": 424,
                    "message": "No guitars found."
                });
            } else {
                res.status(200).json(result);
            }
        });

        // closing the connection
        client.close();
    });
});

// create new guitar
router.post('/:UserId', function(req, res){
    const body = req.body;
    // construct new guitar for db
    var guitar = new Guitar(
        body.owner, body.guitarMake, body.guitarModel, body.guitarYear, body.guitarSerial, body.guitarColour, []
    );

    console.log(guitar);
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, client){
        if (err) {
            res.status(500).json({
                "code":500,
                "message":"Something went wrong, please try again."
            });
        }

        // connecting to MongoDb
        var dbo = client.db("gearapp");
        dbo.collection("guitars").insertOne(guitar, function(err, result){
            if(err) {
                res.status(500).json({
                    "code":500,
                    "message":"Something went wrong, please try again."
                });
            } else {
                res.status(200).json(result);
            }
            
            client.close();
        });
    });
});

module.exports = router;