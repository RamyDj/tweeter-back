const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
    // user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    username : String,
    firstname : String,
    message : String,
    createdAt: Date,
    hashtag: String,
    //likeby? //à modifier
});

const Tweet = mongoose.model('tweet', tweetSchema);

module.exports = Tweet;