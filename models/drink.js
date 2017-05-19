const mongoose = require('mongoose');

const drinkSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  }
});

const Drink = mongoose.model('Drink', eventSchema);

module.exports = Drink;
