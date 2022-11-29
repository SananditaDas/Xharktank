const express = require('express');
const bodyParser = require('body-parser');
const {DB_URL,PORTUSED,NODE_ENV} = require('./config/environment.config.js');
const mongoose = require('mongoose');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Connecting to the database
mongoose.Promise = global.Promise;
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Successfully connected to the database : "+DB_URL);    
    }).catch(err => {
        console.log('Could not connect to the database : '+DB_URL+"\n"+ err);
        process.exit();
    });


//Connected the routes
require('./app/routes/pitch.routes.js')(app);

// listen for requests
app.listen(PORTUSED, () => {
    console.log("Server is listening on port 8081");
});