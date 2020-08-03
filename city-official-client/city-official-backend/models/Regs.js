const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Regulation = new Schema({
    code: {
      type: String
    },
    details: {
      type: String
    },
   url: {
      type: String
   },
   keywords: {
    type: Array
   }
}, {
   collection: 'regulations'
})

module.exports = mongoose.model('Regulation', Regulation)