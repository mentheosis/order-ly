// app/models/user.js

var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');


var shipmentSchema = mongoose.Schema({

    id : String,
    user : String,
    data : {
        weight : String,
        size : String,
        pic : String,
        desc : String,
        loc : String,
    },
    status : String
});

module.exports = mongoose.model('Shipment', shipmentSchema);