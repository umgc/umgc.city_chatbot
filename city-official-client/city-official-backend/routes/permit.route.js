const express = require('express');
const app = express();
const permitRoute = express.Router();

// Permit model
let Permit = require('../models/Permit');

// Add Permit
permitRoute.route('/create').post((req, res, next) => {
  Permit.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get All Permits
permitRoute.route('/').get((req, res) => {
  Permit.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single permit
permitRoute.route('/read/:id').get((req, res) => {
  Permit.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update permit
permitRoute.route('/update/:id').put((req, res, next) => {
  Permit.findByIdAndUpdate(req.params.id, {
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

// Delete permit
permitRoute.route('/delete/:id').delete((req, res, next) => {
  Permit.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = permitRoute;