const express = require('express');
const router = express.Router();
const axios = require('axios');
const Tournament = require('../../mongoose/schemas/tournament');
const Match = require('../../mongoose/schemas/match');
const Team = require('../../mongoose/schemas/team');
const AuthMiddleware = require('./tokenMiddleware');
const c = require('../../constants');

const API_KEY = c.API_KEY;
const providerId = c.PROVIDER_ID;
const creators = c.CREATORS;
const MATCH_KEY = c.MATCH_KEY;


/*
router.get('/', (req,res) => {

});
*/
/*
router.get('/:tournamentId', (req,res) => {
  Tournament.findById(req.params.tournamentId)
  .then(tournament => res.json(tournament))
  .catch(err => res.json({error: 'could not get tournament'}))
});
*/
/*
router.get('/by-team/:teamId', (req,res) => {
  Tournament.find({teams: {$all: [req.params.teamId]}})
  .then(tournaments => res.json(tournaments))
  .catch(err => res.json({error: 'could not get tournaments'}))
});
*/
/*
router.get('/by-user/:userId', (req,res) => {
  Tournament.find({players: {$all: [req.params.userId]}})
  .then(tournaments => res.json(tournaments))
  .catch(err => res.json({error: 'could not get tournaments'}))
});
*/
/*
router.post('/', AuthMiddleware, (req,res) => {
  //authentication
  if(creators.indexOf(req.body.userId) >= 0){
    var tournamentData = {
      name: req.body.name,
      type: req.body.type,
      description: req.body.description,
      size: req.body.size,
      //createdBy: req.body.userId ,
      //signupStart: req.body.signupStart,
      //signupEnd: req.body.signupEnd,
      //startTime: req.body.startTime
    };
    axios.post(`https://americas.api.riotgames.com/lol/tournament-stub/v3/tournaments?api_key=${API_KEY}`, {
      name: req.body.name,
      providerId: providerId
    })
    .then(id => {
      tournamentData["riotId"] = id.data;
      var newTournament = new Tournament(tournamentData);
      newTournament
        .save()
        .then(tournament => {
          var matchesNeeded = tournament.size - 1;
          var matchIds = [];
          while(matchesNeeded > 0){
            matchesNeeded--;
            var matchData = {
              //tournamentId: tournament.id ,
              //startTime: "something",

            };
            var newMatch = new Match(matchData);
            newMatch
              .save()
              .then(match => {
                matchIds.push(match.id);
                if(matchIds.length == tournament.size - 1){
                  tournament.set({futureMatches: matchIds});
                  tournament
                    .save()
                    .then(tournament => res.json({error: null}))
                    .catch(err => res.json({error: 'could not add matches'}))
                }
              })
              .catch(err => res.json({error: 'could not create match'}))
          }
        })
        .catch(err => res.json({error: 'failed to create tournament'}))

    })
    .catch(err => {console.log(err); res.json({error: 'failed to get id from riot'})})
  }else{
    res.json({error: 'unauthorized to create tournaments'});
  }
});
*/
/*
router.post('/start', AuthMiddleware, (req,res) => {
  // auth & check for admin
  console.log('starting tournament');
  if(creators.indexOf(req.body.userId) >= 0){
    Tournament.findById(req.body.tournamentId)
      .then(tournament => {
        console.log('found tournament');
        var teamsRegistered = tournament.teams.length;
        var codesNeeded = teamsRegistered - tournament.size/2;
        axios.post(`https://americas.api.riotgames.com/lol/tournament-stub/v3/codes?count=${codesNeeded}&tournamentId=${tournament.riotId}&api_key=${API_KEY}`, {
          mapType: "SUMMONERS_RIFT",
          pickType: "TOURNAMENT_DRAFT",
          spectatorType: "ALL",
          teamSize: 5,
          metadata: `${tournament.id}:${MATCH_KEY}`
        })
        .then(codes => { // create match data objects for matches
          console.log(codes.data);
          var teamsLeft = tournament.teams.slice();
          var codesWithTeams = codes.data.map(code =>{
            var obj = {
              code: code,
              teams: teamsLeft.splice(0,2)
            };
            return obj
          });
          return {matchArray: codesWithTeams, tournament:tournament, teamsLeft: teamsLeft}
        })
        .then(data => { // take the match data object array and update matches
          var updatedMatchIds = [];
          tournamentMatchIds = data.tournament.futureMatches.slice();
          data.matchArray.forEach(matchData => {
            var matchId = tournamentMatchIds.shift();
            updatedMatchIds.push(matchId);
            console.log(matchId)
            Match.findByIdAndUpdate(
              matchId,
              {$set: {teams: matchData.teams, tournamentCode: matchData.code}}
            )
            .then(info => console.log(info))
            .catch(err => console.log(err))
          });
          return {updatedMatchIds:updatedMatchIds,tournamentMatchIds:tournamentMatchIds, tournament:tournament, teamsLeft: data.teamsLeft} // pass which matches have been updated and which are left
        })
        .then(data => { // take remaining teams (bye teams) and put them in pending
          var pendingMatches = [];
          data.teamsLeft.forEach(team => {
            var matchId = data.tournamentMatchIds.shift();
            data.tournamentMatchIds.pop(); // kill a match for the bye
            pendingMatches.push(matchId);
            console.log(matchId)
            Match.findByIdAndUpdate(
              matchId,
              {$set: {teams: [team]}}
            )
            .then()
            .catch(err => console.log(err))
          });
          data["pendingMatches"] = pendingMatches;
          return data
        })
        .then(data => { // update the tournament to refelct changes in matches
          // need to update tournamanet codes of tournament as well possibly
          // not sure what i'd use them for yet
          data.tournament.upcomingMatches = data.updatedMatchIds;
          data.tournament.futureMatches = data.tournamentMatchIds;
          data.tournament.pendingMatches = data.pendingMatches;
          data.tournament
            .save()
            .then(info => res.json({error: null}))
            .catch(err => {console.log(err); res.json({error: 'could not save tournament'})})
        })
        .catch(err => {console.log(err); res.json({error: 'failed to get codes'})})

      })
      .catch(err => res.json({error: 'error finding tournament'}))
  }else{
    res.json({error: 'unauthorized to start tournaments'})
  }

});
*/
/*
router.put('/join', AuthMiddleware, (req,res) => {
  Team.findById(req.body.teamId)
  .then(team => {
    if(team.captain == req.body.userId){
      Tournament.findById(req.body.tournamentId)
      .then(tournament => {
        if(tournament.teams.length >= tournament.size){
          res.json({error: 'tournament full'})
        }else{
          if(tournament.teams.indexOf(team.id) >= 0){
            res.json({error: 'already registered for this tournament'})
          }else{
            var playersValid = true;
            team.roster.forEach(player => {
              if(tournament.players.indexOf(player) >= 0){
                playersValid = false;
              }
            });
            if(playersValid){
              tournament.teams.push(team.id);
              tournament.players = tournament.players.concat(team.roster);
              tournament.save()
              .then(info => res.json({error: null}))
              .catch(err => res.json({error: 'could not join tournament'}))
              team.activeTournaments.push(tournament.id);
              team.save()
              .then(info => console.log(info))
              .catch(err => console.log(err))
            }else{
              res.json({error: 'some team members are already registered for this tournament'})
            }

          }
        }
      })
      .catch(err => console.log(err))
    }else{
      res.json({error: 'Must be the captain to join tournament'})
    }
  })
  .catch(err => res.json({error: 'Could not find team'}))
});
*/
/*
router.put('/leave', AuthMiddleware, (req,res) => {
  Team.findById(req.body.teamId)
  .then(team => {
    if(team.captain == req.body.userId){
      Tournament.findById(req.body.tournamentId)
      .then(tournament => {
        tournament.players = tournament.players.filter(player => team.roster.indexOf(player) < 0);
        tournament.teams = tournament.teams.filter(id => id != team.id);
        tournament.save()
        .then(info => res.json({error: null}))
        .catch(err => res.json({error: 'could not leave tournament'}))
        team.activeTournaments = team.activeTournaments.filter(activeId => activeId != tournament.id);
        team.save()
        .then(info => console.log(info))
        .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
    }else{
      res.json({error: 'Must be the captain to leave tournament'})
    }
  })
  .catch(err => res.json({error: 'Could not find team'}))
});
*/
module.exports = router;
