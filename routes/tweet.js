var express = require('express');
var router = express.Router();
const Tweet = require('../models/tweet');
const { checkBody } = require('../modules/checkBody');
const moment = require('moment');

// extract hashatg from message
function extractHashtag(message) {
    const match = message.match(/#(\w+)/)
        if(match) {
        return match[0];
        }
    return null;
}


router.post('/newTweet', (req, res) => {
	if (!checkBody(req.body, ['message'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }

    const {message} = req.body

    const newTweet = new Tweet({
        user: req.user.id,
        message: message,
        hashtag: extractHashtag(message),
        createdAt : moment().toDate()
    })

    newTweet.save()
    .then( data => { 
    res.json({ result: true , newTweet: data})
    })
})

/* function extractHashtag(message) {
    const match = message.match(/#(\w+)/);
    if(match) {
    return match[0];
    }
    return match ? match[1] : '';

    const hashtag = extractHashtag(message);
}
*/

module.exports = router;