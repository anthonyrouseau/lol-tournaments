const express = require('express');
const router = express.Router();
const axios = require('axios');
const User = require('../../mongoose/schemas/user');
const AuthMiddleware = require('./tokenMiddleware');
const c = require('../../constants');




router.put('/', AuthMiddleware, (req,res) => {
  if(!req.body.summonerName){
    res.json({error: 'summoner name required'});
  }else{
    axios.get(`https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/${req.body.summonerName}`, {
      headers: {"X-Riot-Token": c.API_KEY}
    })
    .then( ans => {
      var summonerId = ans.data.id;
      axios.get(`https://na1.api.riotgames.com/lol/platform/v3/third-party-code/by-summoner/${summonerId}`,{
        headers: {"X-Riot-Token": c.API_KEY}
      })
      .then(ans => {
        if(ans.data == req.body.code){
          User.findByIdAndUpdate(req.body.userId,{summonerId: summonerId})
          .then(user => res.json({error: null}))
          .catch(err => res.json({error: 'could not link account'}));
        }else{
          res.json({error: 'code does not match'});
        }
      })
      .catch(err => {console.log(err); res.json({error: 'could not link account'})})
    })
    .catch(err => {console.log(err); res.json({error: 'error finding summoner account'})})
  }

});


module.exports = router;
