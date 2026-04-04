const mongoose = require('mongoose');

const adminConfigSchema = new mongoose.Schema({
  rainThreshold: { type: Number, default: 50 },
  aqiThreshold: { type: Number, default: 300 },
  orderThreshold: { type: Number, default: 5 }
});

module.exports = mongoose.model('AdminConfig', adminConfigSchema);
