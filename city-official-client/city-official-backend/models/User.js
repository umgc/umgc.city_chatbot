const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let User = new Schema({
    username: {
      type: String
    },
    password: {
      type: String, min: 6, required: true
    },
   firstName: {
      type: String
   },
   lastName: {
      type: String
   },
   email: {
      type: String
   },
   apiKey: {
      type: String
   },
   city: {
    name: String,
    state: String
   }
}, {
   collection: 'users'
})

module.exports = mongoose.model('User', User)