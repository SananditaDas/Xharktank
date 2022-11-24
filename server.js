const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())


const {DB_URL,PORT,NODE_ENV} = require('./config/environment.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}

// Connecting to the database
mongoose.connect(DB_URL, connectionParams)
    .then(() => {
        console.log("Successfully connected to the database : "+DB_URL);    
    }).catch(err => {
        console.log('Could not connect to the database : '+DB_URL+"\n"+ err);
        process.exit();
    });

// define a simple route
app.get('/', (req, res) => {
    res.json({"message":"Hello World"});
});

require('./app/routes/pitch.routes.js')(app);

// listen for requests
app.listen(PORT, () => {
    console.log("Server is listening on port 8081");
});