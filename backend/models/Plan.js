const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Basic / Standard / Premium
  price: { type: Number, required: true },
  payoutLimit: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Plan', planSchema);
