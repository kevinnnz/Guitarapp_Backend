const express = require('express')
const router = express.Router()

// guitar model
const Guitar = require('../models/guitar')

// Midware
const { isAuthenticated, decodeFireBaseToken } = require('../middleware/validator')

router.use(function timeLog(req, res, next){
    console.log('Time: ', Date.now())
    next()
})

// getting guitars from database
router.get('/:UserId', decodeFireBaseToken, isAuthenticated, function(req, res){
    let userid = req.params.UserId
    db.collection("guitars").find({ owner: `${ userid }`}).toArray(function(err, result){
        if (err) {
            res.status(424).json({
                "code": 424,
                "message": "No guitars found."
            })
        } else {
            res.status(200).json(result)
        }
    })
})

// create new guitar
router.post('/:UserId', decodeFireBaseToken, isAuthenticated, (req, res) => {
    const body = req.body
    const guitar = new Guitar(
        req.params.UserId, body.guitarMake, body.guitarModel, body.guitarYear, body.guitarSerial, body.guitarColour, []
    )
    db.collection("guitars").insertOne(guitar, function(err, result){
        if(err) {
            res.status(500).json({
                "code":500,
                "message":"Something went wrong, please try again."
            })
        } else {
            res.status(200).json(result)
        }
    })
})

module.exports = router