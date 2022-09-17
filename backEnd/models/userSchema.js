const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    initials:{
        type: String,
        required: true
    }

});

const  User = mongoose.model('User', userSchema)
module.exports = User
