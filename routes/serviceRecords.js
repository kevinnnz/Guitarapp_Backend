const express = require('express');
const router = express.Router();

// service record models
var ServiceRecord = require('../models/serviceRecord');

// create new service record
router.post('/:UserId', function(req, res){
    const body = req.body;
    const guitarId = req.body.guitarId;
    // construct new service record for db
    var serviceRecord = new ServiceRecord(
        body.date, body.techName, body.techCompany, body.workDone, body.notes
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
        dbo.collection("guitars").insertOne({ guitarId, $push: { serviceRecords: serviceRecord }}, function(err, result){
            if(err) {
                res.status(500).json({
                    "code":500,
                    "message":"Something went wrong, please try again."
                })
            }

            res.status(200).json({
                message: "Insert Sucessful",
                serviceRecord: serviceRecord,
            });

            client.close();
        });
    });
});


// update service record


// export routes
module.exports = router;