const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let City = new Schema({
    apiKey: {
      type: String
    },
    name: {
      type: String
    },
   state: {
      type: String
   },
}, {
   collection: 'city'
})

module.exports = mongoose.model('City', City)