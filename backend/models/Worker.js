const mongoose = require('mongoose');

const workerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: { type: String, required: true }, // e.g. Bangalore, Delhi, Mumbai
  platform: { type: String }, // e.g. Uber, Swiggy
  selectedPlan: { type: mongoose.Schema.Types.ObjectId, ref: 'Plan' },
  avgIncome: { type: Number, required: true },
  currentIncome: { type: Number, required: true },
  status: { type: String, default: 'Active' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Worker', workerSchema);
