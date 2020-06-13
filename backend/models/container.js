const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var containerSchema = Schema({
    name:{
        type:String,
        required:true,
        maxlength:32,
        trim:true
    },
    items:{
        type: Array    
    },
    id:{
        type: Number,
        required: true,
        unique: true
    }
})

module.exports = mongoose.model("container", containerSchema);