const express = require('express');
const router = express.Router();
const Match = require('../../mongoose/schemas/match');
const Team = require('../../mongoose/schemas/team');
const Tournament = require('../../mongoose/schemas/tournament');
const User = require('../../mongoose/schemas/user');
const axios = require('axios');
const c = require('../../constants');

const MATCH_KEY = c.MATCH_KEY;
const API_KEY = c.API_KEY;

/*
router.get('/:matchId', (req,res) => {
  Match.findById(req.params.matchId)
  .then(match => res.json(match))
  .catch(err => res.json({error: 'could not get match'}))
});
*/
/*
router.get('/by-tournament/:tournamentId', (req,res) => {
  Match.find({tournamentId: req.params.tournamentId})
  .then(matches => res.json(matches))
  .catch(err => res.json({error: 'could not get matches'}))
});
*/
/*
router.get('/by-team/:teamId', (req,res) => {
  Match.find({teams: {$all: [req.params.teamId]}})
  .then(matches => res.json(matches))
  .catch(err => res.json({error: 'could not get matches'}))
});
*/
/*
router.post('/ended', (req,res) => {
  var key = req.body.metaData.split(':')[1];
  if(key == MATCH_KEY){
    Match.findOne({tournamentCode: req.body.shortCode})
    .then(match => {
      console.log('found match');
      match["endTime"] = Date.now();
      match["startTime"] = req.body.startTime;
      var winningSummonerId = req.body.winningTeam[0].summonerId;
      var team1Id = match.teams[0];
      var team2Id = match.teams[1];
      User.find({teams: {$all: [team1Id] }})
      .then(usersArray => {
        console.log('found everyone on team')
        var matchedSummonerId = false;
        usersArray.forEach(user => {
          if(user.summonerId == winningSummonerId){
            matchedSummonerId = true;
          }
        });
        if(matchedSummonerId){
          match["winner"] = team1Id;
          match["loser"] = team2Id;
        }else{
          match["winner"] = team2Id;
          match["loser"] = team1Id;
        }
        match.save()
        .then()
        .catch(err => console.log(err))
        return {matchId: match.id, tournamentId: match.tournamentId, winner: match.winner, loser: match.loser}
      })
      .then(matchInfo => {
        console.log('removing losers active tournament')
        Team.findById(matchInfo.loser)
        .then(team => {
          console.log('active tournament removal for team');
          console.log('before: ' + team.activeTournaments);
          var thefilter = team.activeTournaments.filter(x => x.toString() != matchInfo.tournamentId.toString());
          console.log('the filter result: ' +  thefilter);
          team.activeTournaments = team.activeTournaments.filter(someId => {
            console.log(someId != matchInfo.tournamentId);
            console.log(someId + ' with type: ' + typeof(someId));
            console.log(matchInfo.tournamentId + ' with type: ' + typeof(matchInfo.tournamentId));
            return someId.toString() != matchInfo.tournamentId.toString();
          });
          console.log('after: ' + team.activeTournaments);
          team.save()
          .then(info => console.log('saved activeTournament removal'))
          .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
        return matchInfo
      })
      .then(matchInfo => {
        console.log('setting up next match');
        Tournament.findById(matchInfo.tournamentId)
        .then(tournament => {
          console.log('tournament found');
          tournament.upcomingMatches = tournament.upcomingMatches.filter(match => match.toString() != matchInfo.matchId.toString());
          tournament.playedMatches.push(matchInfo.matchId);
          if(tournament.pendingMatches.length > 0){
            console.log('pending matches exist');
            var nextMatch = tournament.pendingMatches.shift();
            tournament.upcomingMatches.push(nextMatch);
            tournament.save()
            .then(info => res.json({error: null}))
            .catch(err => console.log('failed to save tournament'))
            axios.post(`https://americas.api.riotgames.com/lol/tournament-stub/v3/codes?count=1&tournamentId=${tournament.riotId}&api_key=${API_KEY}`, {
              mapType: "SUMMONERS_RIFT",
              pickType: "TOURNAMENT_DRAFT",
              spectatorType: "ALL",
              teamSize: 5,
              metadata: `${matchInfo.tournamentId}:${MATCH_KEY}`
            })
            .then(code => {
              console.log('got codes');
              var matchCode = code.data;
              Match.findByIdAndUpdate(
                nextMatch,
                {$set: {tournamentCode: matchCode}, $push: {teams: matchInfo.winner}}
              )
              .then(info => console.log('set up pending match'))
              .catch(err => {console.log(error);console.log('pending match failed')})
            })
            .catch(err => console.log(err))
          }
          else if(tournament.futureMatches.length > 0){
            console.log('getting a future match');
            var nextMatch = tournament.futureMatches.shift();
            tournament.pendingMatches.push(nextMatch);
            tournament.save()
            .then(info => res.json({error: null}))
            .catch(err => console.log('could not save tournament'))
            Match.findByIdAndUpdate(
              nextMatch,
              {$push: {teams: matchInfo.winner}}
            )
            .then(info => console.log('updated pending match with team'))
            .catch(err => console.log('could not update pending match'))
            //find the match and add the winning team to it
          }
          else{
            //tournament is over
            console.log('tournament finished');
            // add winners to tournament
            Team.findById(matchInfo.winner)
            .then(team => {
              tournament.winners = team.roster;
              team.activeTournaments = team.activeTournaments.filter(tournament => tournament.toString() != matchInfo.tournamentId.toString());
              team.save()
              .then()
              .catch(err => console.log(err))
              tournament.save()
              .then(res.json({error: null}))
              .catch(err => console.log(err))
            })
            .catch(err => console.log('could not find team'))
          }
        })
        .catch(err => console.log(err))
      })
      .catch(err => {console.log('problem in chain'); console.log(err)})
    })
    .catch(err => res.json({error: 'could not find match'}))
  }else{
    // not verified match ending
    console.log(req.body);
  }
});
*/

module.exports = router;
