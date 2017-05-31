const mongoose = require('mongoose');

const userDrinkSchema = mongoose.Schema({
    drink_id: String,
    name: String
});

const inviteSchema = mongoose.Schema({
  targetUser_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  userName: String,
  isReady: {
    type:Boolean
  },
  drinks: [userDrinkSchema],
  answered: {
    type:Boolean
  }
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
  drinks: [userDrinkSchema],
  invites: [ inviteSchema ]
});


const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
