const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    githubId: {
        type: String,
        required: true,
        unique: true
    },
    displayName: {
        type: String,
        required: true
    },
    username: {
        type: String
    },
    image: {
        type: String
    },
    email: {
        type: String
    },
    bio: {
        type: String
    },
    location: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('User', userSchema);
