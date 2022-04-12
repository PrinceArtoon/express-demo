var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
var bcrypt = require('bcryptjs');
var CustomersModel = require('../models/customers')

router.use(bodyParser.json());


const Customers = async(req,res,next) => {
    try {
        const CustomersData = await CustomersModel.find().sort('name');
        res.status(200).json(CustomersData)
    } catch (error) {
        console.log(error);
    }
   
}
const CustomersPost = async(req,res,next) => {
    try {
        const NewCustomers = new CustomersModel({
            name: req.body.name,
            IsGold: req.body.gold,
            phone: req.body.phone
        })
        await NewCustomers.save()
        res.status(200).json(NewCustomers)
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    Customers,
    CustomersPost
}