const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    require: true
  },
  passwordHash: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  summonerId: {
    type: String,
    unique: true,
    sparse: true
  },
  teams: {
    type: [{
      teamId: {
        type: Schema.Types.ObjectId,
        ref: 'Team'
      },
      teamName: {
        type: String
      }
    }],
    default: []
  }
});

module.exports = user = mongoose.model('User', userSchema);
