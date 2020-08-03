const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let City = new Schema({
   name: {
      type: String
   },
   state: {
      type: String
   }
}, {
   collection: 'cities'
})

module.exports = mongoose.model('City', City)