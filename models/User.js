const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    date:{
        type: Date,
        default: Date.now
    }
});

mongoose.model('users', UserSchema);