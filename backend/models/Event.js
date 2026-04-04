const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  rain: { type: Number, required: true },
  aqi: { type: Number, required: true },
  orders: { type: Number, required: true },
  status: { type: String, enum: ['normal', 'disrupted'], default: 'normal' },
  location: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Event', eventSchema);
