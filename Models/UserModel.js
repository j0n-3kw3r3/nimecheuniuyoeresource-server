const mongoose = require('mongoose');


const User = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            min: 3,
            max: 20,
            unique:true,
        },
        password: {
            type: String,
            required: true,
            max: 6,
        },

    },
    {
      timestamps:true
    }
);

module.exports = mongoose.model('User', User)
