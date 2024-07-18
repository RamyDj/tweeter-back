var express = require('express');
var router = express.Router();
const Tweet = require('../models/tweets');
const { checkBody } = require('../modules/checkBody');
const moment = require('moment');

// extract hashatg from message
function extractHashtag(message) {
    const regex = /#(\w+)/g
    const match = message.match(regex);
        if(match) {
        return match.map(match => match.trim());
        }
    return [];
}

/*extrat message from messagebar
// function extractMessage(message) {
//     const match = message.match(/^(.*?)#/);
//     if(match) {
//         return match[1];
//     }
//     return null;
 }*/

router.post('/newTweet', (req, res) => {
	if (!checkBody(req.body, ['message'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }
    const {message} = req.body
    const newTweet = new Tweet({
        message: message,
        hashtag: extractHashtag(message),
        createdAt : moment().startOf()
    })

    newTweet.save()
    .then( data => { 
    res.json({ result: true , newTweet: data})
    })
})

router.get('/', (req, res)=>{
    Tweet.find()
    .then(data =>
    {res.json({allTweet : data})}
    )

})



module.exports = router;