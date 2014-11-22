var mongoose = require('mongoose');

var taskSchema = mongoose.Schema({

    type : String,
    priority : Number,
    name : String,
    desc : String,
    client : String,
    status : String

});

module.exports = mongoose.model('InternalTask', taskSchema);
