const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const guitars = require('./routes/guitars');
const serviceRecords = require('./routes/serviceRecords');

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

const port = 8080;

// Routes
app.use('/api/guitar', guitars);
app.use('/api/service', serviceRecords);

app.listen(port, function() {
    console.log("Listening on port " + port);
});