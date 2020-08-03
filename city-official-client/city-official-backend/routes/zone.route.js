const express = require('express');
const app = express();
const zoneRoute = express.Router();

// Zone model
let Zone = require('../models/Zone');

// Add Zone
zoneRoute.route('/create').post((req, res, next) => {
  Zone.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get All Zones
zoneRoute.route('/').get((req, res) => {
  Zone.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single zone
zoneRoute.route('/read/:id').get((req, res) => {
  Zone.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update zone
zoneRoute.route('/update/:id').put((req, res, next) => {
  Zone.findByIdAndUpdate(req.params.id, {
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

// Delete zone
zoneRoute.route('/delete/:id').delete((req, res, next) => {
  Zone.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = zoneRoute;