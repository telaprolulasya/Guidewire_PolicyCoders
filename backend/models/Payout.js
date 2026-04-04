const mongoose = require('mongoose');

const payoutSchema = new mongoose.Schema({
  workerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Worker', required: true },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  loss: { type: Number, required: true },
  payoutAmount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'processed'], default: 'pending' },
  fraudFlag: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payout', payoutSchema);
