const { required } = require('joi');
const mongoose = require('mongoose');

const Rental = new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlength: 3,
                maxlength: 50
            },
            isGold: {
                type: Boolean,
                default: false
            },
            phone: {
                type: Number,
                required: true
            }
        }),
        required: true
    },
    Movies: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                minlength: 2,
                maxlength: 50
            },
            dailyRentalRate: {
                type: Number,
                required: true,
                min: 0,
                max: 400
            },

        }),
        required: true,
    },
    DateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    DateReturn: {
        type: Date
    },
    RentalFee: {
        type: Number,
        min: 0
    }
},
    {
        timestamps: true
    })

const RentalData = mongoose.model('RentData', Rental)

module.exports = RentalData