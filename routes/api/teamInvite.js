const express = require('express');
const router = express.Router();
const Team = require('../../mongoose/schemas/team');
const User = require('../../mongoose/schemas/user');
const TeamInvite = require('../../mongoose/schemas/teamInvite');
const AuthMiddleware = require('./tokenMiddleware');

/*
router.get('/by-id/:inviteId', (req,res) => {
  TeamInvite.findById(req.params.inviteId)
  .then(invite => res.json(invite))
  .catch(err => res.json({error: 'could not get invite'}))
});
*/

router.get('/by-user/:userId', (req,res) => {
  TeamInvite.find({invitee: req.params.userId})
  .then(invites => res.json(invites))
  .catch(err => res.json({error: 'could not get invites'}))
});

/*
router.get('/by-team/:teamId', (req,res) => {
  TeamInvite.find({teamId: req.params.teamId})
  .then(invites => {res.json(invites)})
  .catch(err => res.json({error: 'could not get invites'}))
});
*/

router.post('/', AuthMiddleware, (req,res) => {
  //authentication
  if(req.body.inviteeId){
    Team.findById(req.body.teamId)
    .then(team => {
      if(team.captain != req.body.userId){
        res.json({error: 'only the captain can send invites'})
      }else{
        var inviteData = {
          teamName: team.name,
          teamId: team.id,
          invitee: req.body.inviteeId
        };
        var newInvite = new TeamInvite(inviteData);
        newInvite
        .save()
        .then(invite => res.json({error: null}))
        .catch(err => {console.log(err); res.json({error: 'invite failed'})})
      }
    })
    .catch(err => res.json({error: 'no team found'}))
  }else if(req.body.inviteeName){
    User.findOne({username: req.body.inviteeName}, 'id')
    .then(inviteeId => {
      if(!inviteeId){
        res.json({error: 'no user found'})
      }else{
        Team.findById(req.body.teamId)
        .then(team => {
          if(team.captain != req.body.userId){
            res.json({error: 'only the captain can send invites'})
          }else{
            var inviteData = {
              teamName: team.name,
              teamId: team.id,
              invitee: inviteeId
            };
            var newInvite = new TeamInvite(inviteData);
            newInvite
              .save()
              .then(invite => res.json({error: null}))
              .catch(err => {console.log(err); res.json({error: 'invite failed'})})
          }
        })
        .catch(err => res.json({error: 'no team found'}))
      }
    })
    .catch(err => res.json({error: 'could not find user with username'}))
  }else{
    res.json({error: 'need invitee id or username'})
  }
});


module.exports = router;
