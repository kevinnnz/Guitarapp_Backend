const express = require('express');
const router = express.Router();

// service record models
var ServiceRecord = require('../models/serviceRecord');

// connection db
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

// Midware
router.use(function timeLog(req, res, next){
    console.log('Time: ', Date.now());
    next();
});

// create new service record
router.post('/:UserId', function(req, res){
    const body = req.body;
    const guitarId = req.body.guitarId;
    // construct new service record for db
    var serviceRecord = new ServiceRecord(
        body.date, body.techName, body.techCompany, body.workDone, body.notes
    );

    console.log(serviceRecord);

    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, client){
        if (err) {
            res.status(500).json({
                "code":500,
                "message":"Something went wrong, please try again."
            });
        }

        // connecting to MongoDb
        var dbo = client.db("gearapp");
        dbo.collection("guitars").updateOne({ _id: guitarId }, { $push: { serviceRecords: serviceRecord }}, function(err, result){
            if(err) {
                res.status(500).json({
                    "code":500,
                    "message" : "Something went wrong, please try again."
                });
            } else {
                res.status(200).json({
                    "message" : "Insert successful!"
                });
            }
            
        });

        client.close();
    });
});


// update service record


// export routes
module.exports = router;