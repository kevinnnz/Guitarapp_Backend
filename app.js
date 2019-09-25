const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const guitars = require('./routes/guitars');
const serviceRecords = require('./routes/serviceRecords');
const users = require('./routes/users');

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

const port = 8080;

// Routes
app.use('/api/guitar', guitars);
app.use('/api/service', serviceRecords);
app.use('/api/user', users);

app.use(function(res, req, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.listen(port, function() {
    console.log("Listening on port " + port);
});