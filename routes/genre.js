var express = require('express');
const { object } = require('joi');
var router = express.Router();

var GenreModel = require('../models/genre');

router.get('/genre', async(req,res,next) => {
    try {
      const Data = await GenreModel.find().sort("name")
        res.status(200).json(Data)
    } catch (error) {
        console.log(error);
    }
})

router.post('/genre', async(req,res,next) => {
    try {
        const NewGenra = new GenreModel({
            name:req.body.name
        })
        await NewGenra.save()
        res.status(200).json(NewGenra)
    } catch (error) {
        res.status(200).json(error.message)
        console.log(error);
    }
})
router.put('/genre/:id', async(req,res,next) => {
    try {
      const gener= await GenreModel.findOne({_id: req.params.id})
      console.log(gener);
      if(!gener){
          console.log('ID Not Found');
          res.status(404).json('ID Not Found')
      }
      else{
        await GenreModel.findByIdAndUpdate({_id: req.params.id},{name: req.body.name})
        res.status(200).json('Updated Successfully..!')
      }

    } catch (error) {
        console.log(error);
    }
})

router.delete('/genre/:id', async(req,res,next) => {
    try {
        const gener= await GenreModel.findOne({_id: req.params.id})
        if(!gener){
            console.log('ID Not Found');
          res.status(404).json('ID Not Found')
        }
        else{
            await GenreModel.findByIdAndDelete({_id: req.params.id})
            const msg = 'Genre Deleted...!'
            res.status(200).json(msg)
        }
    } catch (error) {
        console.log(error);
    }
})
module.exports = router