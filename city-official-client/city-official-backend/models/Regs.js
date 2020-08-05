const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Regs = new Schema({
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
   collection: 'regs'
})

module.exports = mongoose.model('Regs', Regs)