const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamInviteSchema = new Schema({
  teamName: {
    type: String,
    require: true
  },
  teamId: {
    type: Schema.Types.ObjectId,
    require: true,
    ref: 'Team'
  },
  invitee: {
    type: Schema.Types.ObjectId,
    require: true,
    ref: 'User'
  }
});

teamInviteSchema.index({teamId: 1, invitee: 1}, {unique: true});
module.exports = teamInvite = mongoose.model('TeamInvite', teamInviteSchema);
