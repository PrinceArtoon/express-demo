var express = require('express');
var router = express.Router();

var CourseModel = require('../models/courseSchema')

router.get('/course', async (req,res,next) => {
    try {
        const AllCourse = await CourseModel.find({}).populate('author','name -_id').limit(10).sort({name:1}).select({name:1,tags:1})
        res.status(200).json(AllCourse)
    } catch (error) {
        console.log(error);
    }
})

router.post('/course', async (req,res,next) => {
    try {
        console.log(req.body.category);
        const NewCourse = new CourseModel({
            name: req.body.name,
            author: req.body.author,
            tags: req.body.tags,
            isPublished: req.body.pub,
            category: req.body.category,
            price: req.body.price
        })
        await NewCourse.save()
        res.status(200).send('Course Added..!')
    } catch (error) {
        console.log(error);
    }
})


module.exports = router