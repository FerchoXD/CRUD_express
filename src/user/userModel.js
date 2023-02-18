let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({

    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
    }

});

// Collection "users"
module.exports = mongoose.model('users', userSchema);