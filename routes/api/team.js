const express = require('express');
const router = express.Router();
const Team = require('../../mongoose/schemas/team');
const User = require('../../mongoose/schemas/user');
const TeamInvite = require('../../mongoose/schemas/teamInvite');
const AuthMiddleware = require('./tokenMiddleware');


/*
router.get('/', AuthMiddleware, (req,res) => {
  res.send('hello world')
});
*/
/*
router.get('/by-id/:teamId', (req,res) => {
  Team.findById(req.params.teamId)
  .then(team => res.json(team))
  .catch(err => res.json({error: 'could not get team'}))
});
*/

router.get('/by-user/:userId', (req,res) => {
  Team.find({roster: {$all: [req.params.userId]}})
  .then(teams => res.json(teams))
  .catch(err => res.json({error: 'could not get teams'}))
});
/*
router.get('/by-tournament/:tournamentId', (req,res) =>{
  Team.find({activeTournaments: {$all: [req.params.tournamentId]}})
  .then(tournaments => res.json(tournaments))
  .catch(err => res.json({error: 'could not get tournaments'}))
});
*/

router.post('/', AuthMiddleware, (req,res) => {
  User.findById(req.body.userId)
    .then(user => {
      if(user.summonerId){
        if(req.body.name){
          var teamData = {
            name: req.body.name,
            captain: user.id,
            roster: [user.id]
          };
          var newTeam = new Team(teamData);
          newTeam
            .save()
            .then(team => {
              user.teams.push({teamId:team.id, teamName: team.name});
              user.save()
              .then()
              .catch(err => console.log(err))
              res.json(team);
            })
            .catch(err => {console.log(err); if(err.code == 11000){res.json({error: 'team name taken'})}});
        }else{
          res.json({error: 'Need a team name.'});
        }
      }else{
        res.json({error: 'You must link your account before creating a team.'});
      }
  });
});

router.put('/', AuthMiddleware, (req,res) => {
  Team.findById(req.body.teamId)
  .then(team => {
    if(team.activeTournaments.length > 0){
      res.json({error: 'no roster changes while in tournaments'});
    }else{
      if(req.body.action == 'remove'){
        if(team.captain == req.body.userId){
          res.json({error: 'captain must delete team to leave'})
        }
        else if (req.body.userId == req.body.person){
          team.roster = team.roster.filter(player => player != req.body.person);
          team.save()
          .then(info => res.json({error: null}))
          .catch(err => res.json({error: 'could not remove player'}))
        }else{
          res.json({error: 'could not remove player'})
        }
      }
      if(req.body.action =='add'){
        if(req.body.userId != req.body.invitee){
          res.json({error: 'unauthorized to add user'});
        }else{
          if(team.roster.indexOf(req.body.invitee)<0){
            User.findById(req.body.invitee)
            .then(user => {
              if(user.summonerId){
                team.roster.push(req.body.invitee);
                team.save()
                .then(team => {
                  TeamInvite.findByIdAndDelete(req.body.inviteId)
                  .catch(err => console.log(err))
                  res.json({error: null});
                })
                .catch(err => {console.log(err); res.json({error: 'failed to add'})})
                user.teams.push(team.id);
                user.save()
                .then()
                .catch(err => console.log(err))
              }
              else{
                res.json({error: 'must link League of Legends account first'})
              }
            })
            .catch(err => console.log(err))
          }
        }
      }
    }
  })
  .catch(err => res.json({error: 'could not find team'}))
});



module.exports = router;
