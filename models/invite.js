
const mongoose = require('mongoose');

const inviteSchema = mongoose.Schema({
//  targetUser: [{ type: ObjectId, ref: 'User' }],
//  event: [{ type: ObjectId, ref: 'Event' }],
//  date: { type: Date, default: Date.now },
  targetUser: String,
  event: String,
  accept: Boolean
});

const Invite = mongoose.model('Invite', inviteSchema);

module.exports = Invite;
