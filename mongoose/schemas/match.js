const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const matchSchema = new Schema({
  teams: {
    type: [Schema.Types.ObjectId],
    ref: 'Team'
  },
  captains: {
    type: [Schema.Types.ObjectId],
    ref: 'User'
  },
  tournamentCode: {
    type: String,
    unique: true,
    sparse: true
  },
  created: {
    type: Date,
    require: true,
    default: Date.now()
  },
  startTime: {
    type: Date,
    require: true,
    default: Date.now()
  },
  endTime: {
    type: Date
  },
  winner: {
    type: Schema.Types.ObjectId,
    ref: 'Team'
  },
  loser: {
    type: Schema.Types.ObjectId,
    ref: 'Team'
  },
  tournamentId: {
    type: Schema.Types.ObjectId,
    ref: 'Tournament',
    require: true
  }
});

module.exports = match = mongoose.model('Match', matchSchema);
