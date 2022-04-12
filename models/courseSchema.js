var mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength:5,
        maxlength:50
    },
    category:{
        type: String,
        required:true,
        enum: ['web', 'mobile','network'],
        lowercase: true
    },
    author: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customers',
        required: true
    }],
    price: {
        type: Number,
        required: function(){return this.isPublished;}
    },
    tags: {
        type:Array,
        lowercase: true,
        validate:{
            validator: function(v){
                return v.length > 0;
            },
            message: 'A Course Should Have At Least One Tag..!'
        }
    },
    date: {type: Date, default: Date.now},
    isPublished: Boolean
})

const course = mongoose.model('course', courseSchema);

module.exports = course