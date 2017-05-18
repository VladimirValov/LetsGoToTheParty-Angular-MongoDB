
const mongoose = require('mongoose');

const peopleSchema = mongoose.Schema({
  name: String,
  willCome: Boolean,
  drink: String
});

const People = mongoose.model('People', peopleSchema);
