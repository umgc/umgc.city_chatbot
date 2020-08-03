const express = require('express');
const app = express();
const cityRoute = express.Router();

// City model
let City = require('../models/City');

// Add City
cityRoute.route('/create').post((req, res, next) => {
  City.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get All Cities
cityRoute.route('/').get((req, res) => {
  City.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single city
cityRoute.route('/read/:id').get((req, res) => {
  City.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update city
cityRoute.route('/update/:id').put((req, res, next) => {
  City.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Data updated successfully')
    }
  })
})

// Delete city
cityRoute.route('/delete/:id').delete((req, res, next) => {
  City.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = cityRoute;