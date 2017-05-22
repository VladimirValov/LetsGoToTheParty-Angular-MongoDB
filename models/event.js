const mongoose = require('mongoose');



const eventSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  place: {
    type: String,
    required: true
  },
  drinks: Array,
  userList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
