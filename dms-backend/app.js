var mongoose = require('mongoose');
const routes = require("./routes");
const express = require('express');
var cors = require('cors');

var app = express();
app.use(cors());

const env = require('./env');

//Set up default mongoose connection
var mongoURL = "mongodb+srv://" + env.MONGO_USER + ':' + env.MONGO_PWD + '@' + env.MONGO_HOST + '/' + env.MONGO_DB;

mongoose
    .connect(mongoURL, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        ssl: true,
        sslValidate: false,
        sslCA: env.CERT_LOC,
        readPreference: "secondaryPreferred",
        retryWrites:true,
        connectTimeoutMS: 100000,
        keepAlive: true,
        writeConcern: 'majority'
    })
    .then(() => {
        console.log("MONGODB CONNECTED!!!!!");

        app.use("/api", routes)

        app.listen(env.APP_PORT, function () {
            var host = env.APP_HOST;
            var port = env.APP_PORT;

            console.log("Server started at http://%s:%s", host, port)
        })
    })
    .catch(e => {
        console.log("Unable to connect to MONGO-DB!! ", e);
    })     

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));