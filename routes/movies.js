var express = require('express');
const { object } = require('joi');
var router = express.Router();

var GenreModel = require('../models/genre');
var MoviesModel = require('../models/movies')


router.post('/movies', async(req,res,next) => {
try {
    const Genre = await GenreModel.findById(req.body.genreId)
    if(!Genre) return res.status(400).send('Invalid Genre..!')


    let NewMovie = new MoviesModel({
        name: req.body.title,
        genre:{
            _id: Genre._id,
            name: Genre.name
        },
        numberInStock: req.body.stock,
        DailyrentalRate: req.body.rent
    })

    await NewMovie.save()
    res.status(200).json(NewMovie)
} catch (error) {
    console.log(error);
}
})

router.get('/movies', async (req,res,next) => {
    try {
        const AllMovies = await MoviesModel.find().populate('genre','name')
        res.status(200).json(AllMovies)
    } catch (error) {
        console.log(error);
    }
})


module.exports = router