const express = require('express');
const app = express();
const regsRoute = express.Router();

// Regs model
let Regs = require('../models/Regs');

// Add Regs
regsRoute.route('/create').post((req, res, next) => {
  Regs.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get All Regss
regsRoute.route('/').get((req, res) => {
  Regs.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single regs
regsRoute.route('/read/:id').get((req, res) => {
  Regs.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update regs
regsRoute.route('/update/:id').put((req, res, next) => {
  Regs.findByIdAndUpdate(req.params.id, {
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

// Delete regs
regsRoute.route('/delete/:id').delete((req, res, next) => {
  Regs.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = regsRoute;