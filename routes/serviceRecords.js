const express = require('express')
const router = express.Router()

// service record models
const ServiceRecord = require('../models/serviceRecord')

const ObjectId = require('mongodb').ObjectID

// Midware
const { isAuthenticated, decodeFireBaseToken } = require('../middleware/validator')

router.use(function timeLog(req, res, next){
    console.log('Time: ', Date.now())
    next()
})

// create new service record
router.post('/:UserId', decodeFireBaseToken, isAuthenticated, function(req, res){
    const body = req.body
    const guitarId = req.body.guitarId
    // construct new service record for db
    const serviceRecord = new ServiceRecord(
        body.date, body.techName, body.techCompany, body.workDone, body.notes
    )
    
    db.collection("guitars").updateOne({ _id: ObjectId(guitarId) }, { $push: { serviceRecords: serviceRecord }}, function(err, result){
        if(err) {
            res.status(500).json({
                "code":500,
                "message" : "Something went wrong, please try again."
            })
        } else {
            res.status(200).json({
                "message" : "Service record created."
            })
        }
    })
})


// export routes
module.exports = router