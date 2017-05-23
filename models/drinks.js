const mongoose = require('mongoose');

const drinkSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  alcohol: Boolean,
  price: Number
});

const Drink = mongoose.model('Drink', drinkSchema);

module.exports = Drink;
