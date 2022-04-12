var mongoose = require('mongoose');

const {GenraSchema} =require('../models/genre') 
const MoviesScema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength:2,
        maxlength:50
    },
    genre: {
        type:GenraSchema,
        required:true
    },
    numberInStock: {
        type:Number,
        required:true,
        min:0,
        max:255
    },
    DailyrentalRate:{
        type:Number,
        required:true,
        min:0,
        max:255
    }
},{
    timestamps:true
})

const Movies = mongoose.model('Movies', MoviesScema);

module.exports = Movies