var express = require('express');
var router = express.Router();

let courses = [
  {id:1,name: 'c1'},
  {id:2,name: 'c2'},
  {id:3,name: 'c3'},
  {id:4,name: 'c4'},
  {id:5,name: 'c5'},
  {id:6,name: 'c6'},
  {id:7,name: 'c7'},
  {id:8,name: 'c8'}
]
/* GET users listing. */
router.get('/user', function(req, res, next) {
  res.send(courses);
});

router.get('/user/:id', function(req,res,next) {
  let course =courses.find(c => c.id === parseInt(req.params.id));

  if(!course){
    res.status(404).send('course not found')
  }
  else{
    res.send(course)
  }
})

router.post('/user', (req,res,next) => {

  if(!req.body.name || req.body.name.length < 4){
    res.status(404).send('Invalid Response')

  }
  else{
    const course = {
      id: courses.length + 1,
      name: req.body.name
    }
    courses.push(course)
    res.send(course)
  }

})

router.put('/user/:id', (req,res,next) => {
  let course =courses.find(c => c.id === parseInt(req.params.id));

  if(!course){
    res.status(404).send('course not found')
  }
  else{
    res.send(course)
  } 
})
module.exports = router;
