const express = require('express');
const router = express.Router();

// connection db
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

// Auth Middleware
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.use(function timeLog(req, res, next){
    console.log('Time: ', Date.now());
    next();
});

router.post('/register', function(req, res){
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    bcrypt.hash(password, saltRounds, function(err, hash){
        if (err) {
            return res.status(500).json({
                "message":"Something went wrong, please try again."
            });
        }

        MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, client) {
            if (err) {
                return res.status(500).json({
                    "message":"Something went wrong, please try again."
                });
            }

            let dbo = client.db("gearapp");
            // check to see if email exists           
            dbo.collection("users").findOne({ "email" : email }, function(err, result){ 
                if(result) {
                    return res.status(400).json({
                        "message":"Email already exists."
                    })
                } else {
                    dbo.collection("users").insertOne({
                        "name" : name,
                        "email" : email,
                        "password" : hash
                    }, function(err, result){
                        if(err) {
                            return res.status(500).json({
                                "message":"User could not be created. Please try again."
                            });
                        } else {
                            return res.status(200).json();
                        }
                    });
                }
            });

            client.close();
        });
    }); 
});

router.post('/login', function(req, res) { 
    const email = req.body.email;
    const password = req.body.password;
    
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, client) {
        let dbo = client.db("gearapp");
        
        // check if email exists
        dbo.collection("users").findOne({ "email" : email }, function(err, result){
            if(!result) {
                return res.status(400).send("Email or password is wrong"); 
            }                 const user = result;
            
            // validating password
            const validPass = bcrypt.compare(password, user.password);

            if(!validPass) {
                return res.status(400).send("Email or password is wrong");
            }

            // generate token
            const token = jwt.sign({_id: user._id}, "privatekey");
            res.header('auth-token', token).send(token);
        });

    });
});

module.exports = router;