var express = require('express');
const { object } = require('joi');
var router = express.Router();

var GenreModel = require('../models/genre');
var MoviesModel = require('../models/movies');
var RentalModel = require('../models/rental');
var CustomersModel = require('../models/customers');
const { default: mongoose } = require('mongoose');


router.get('/rent', async (req, res, next) => {
    try {
        const Rentals = await RentalModel.find().sort('-DateOut');
        res.json(Rentals)
    } catch (error) {
        console.log(error);
    }
})

router.post('/rent', async (req, res, next) => {
    try {

        //if ObjectId/CustomerId is Invalid Then Return Error
        if (!mongoose.Types.ObjectId.isValid(req.body.CustomerId))
            return res.status(404).send('invalid Customer..!')

        //if Customer Not Found In Database Then Return Error
        const Customers = await CustomersModel.findById(req.body.CustomerId);
        if (!Customers) return res.status(404).send('Invalid Customer..!')

        //if ObjectId/MovieId is Invalid Then Return Error
        if (!mongoose.Types.ObjectId.isValid(req.body.MovieId))
            return res.status(404).send('invalid Movie..!')

        //if Movies Not Found In DataBase Then Return Error
        const Movies = await MoviesModel.findById(req.body.MovieId)
        if (!Movies) return res.status(404).send('Invalid Movie..!')
        if (!Movies.numberInStock === 0) return res.status(404).send('Movie Not In Stock')

        let Rental = new RentalModel({
            customer: {
                _id: Customers._id,
                name: Customers.name,
                phone: Customers.phone,
                isGold: Customers.IsGold
            },
            Movies: {
                _id: Movies._id,
                title: Movies.name,
                dailyRentalRate: Movies.DailyrentalRate
            },

        })
        Rental = await Rental.save()

        Movies.numberInStock--;
        Movies.save()
        res.status(200).json(Rental)

    } catch (error) {
        console.log(error);
    }
})

module.exports = router