const mongoose = require('mongoose');

const inviteSchema = mongoose.Schema({
  targetUser_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  userName: String,
  isReady: {
    type:Boolean,
    default: false
  },
  drinks: [ String ]
});


const eventSchema = mongoose.Schema({
  author_id: String,
  title: {
    type: String,
    required: true
  },
  place: {
    type: String,
    required: true
  },
  drinks: Array,
  invites: [ inviteSchema ]
});


const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
