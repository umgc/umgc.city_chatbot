const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Zone = new Schema({
    symbol: {
      type: String
    },
    details: {
      type: String
    },
   url: {
      type: String
   },
   outline: {
      type: Array
   },
   city: {
      name: String,
      state: String
   }
}, {
   collection: 'zones'
})

module.exports = mongoose.model('Zone', Zone)