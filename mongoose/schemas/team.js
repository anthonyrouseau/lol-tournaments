const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = new Schema({
  name: {
    type: String,
    unique: true,
    require: true
  },
  captain: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  roster: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    validate: {
      validator: teamSize,
      message: 'team limit is 5'
    }
  },
  activeTournaments: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'Tournament'
    }]
  }
});

function teamSize(team){
  return team.length <= 5
}

function tournamentCap(tournaments){
  return tournaments.length <= 3
}

module.exports = team = mongoose.model('Team', teamSchema);
