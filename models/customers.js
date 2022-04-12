const mongoose = require('mongoose');

const CustomersModel = new mongoose.Schema({
    name: {
        type: String,
        minlength:5,
        maxlength:50
    },
    IsGold:{
        type: Boolean
    },
    phone: {
        type: Number,
        minlength:10,
        maxlength:10
    }
})

const Customerss = mongoose.model('customers', CustomersModel)

module.exports = Customerss