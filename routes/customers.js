var express = require('express');
var router = express.Router();

const Customers = require('../controller/index')

router.get('/', Customers.Customers)
router.post('/', Customers.CustomersPost)

module.exports = router