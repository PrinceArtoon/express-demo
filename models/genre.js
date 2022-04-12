var mongoose = require('mongoose')

const GenraSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength:5,
        maxlength:50
    },
},{
    timestamps:true
})

const Genra = mongoose.model('Genra', GenraSchema);

module.exports = Genra 
module.exports.GenraSchema = GenraSchema