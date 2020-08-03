const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Permit = new Schema({
    code: {
      type: String
    },
   url: {
      type: String
   },
   applicationUrl: {
      type: String
   },
   keywords: {
    type: Array
   }
}, {
   collection: 'permits'
})

module.exports = mongoose.model('Permit', Permit)