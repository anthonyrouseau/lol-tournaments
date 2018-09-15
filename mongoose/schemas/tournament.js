const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tournamentSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  type: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  tournamentCodes: {
    type: [String]
  },
  riotId: {
    type: String
  },
  size: {
    type: Number,
    require: true
  },
  created: {
    type: Date,
    require: true,
    default: Date.now()
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
  signupStart: {
    type: Date,
    require: true,
    default: Date.now()
  },
  signupEnd: {
    type: Date,
    require: true,
    default: Date.now()
  },
  startTime: {
    type: Date,
    require: true,
    default: Date.now()
  },
  teams: {
    type: [Schema.Types.ObjectId],
    ref: 'Team'
  },
  players: {
    type: [Schema.Types.ObjectId],
    ref: 'User'
  },
  playedMatches: {
    type: [Schema.Types.ObjectId],
    ref: 'Match',
    default: []
  },
  upcomingMatches: {
    type: [Schema.Types.ObjectId],
    ref: 'Match',
    default: []
  },
  pendingMatches: {
    type: [Schema.Types.ObjectId],
    ref: 'Match',
    default: []
  },
  futureMatches: {
    type: [Schema.Types.ObjectId],
    ref: 'Match',
    default: []
  },
  winners: {
    type: [Schema.Types.ObjectId],
    ref: 'User'
  }
});

module.exports = tournament = mongoose.model('Tournament', tournamentSchema);
