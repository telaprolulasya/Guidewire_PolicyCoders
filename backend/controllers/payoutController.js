const Payout = require('../models/Payout');
const Worker = require('../models/Worker');
const Event = require('../models/Event');
const AdminConfig = require('../models/AdminConfig');

exports.calculatePayout = async (req, res) => {
  try {
    const { workerId, eventId } = req.body;

    const worker = await Worker.findById(workerId).populate('selectedPlan');
    if (!worker) return res.status(404).json({ success: false, message: 'Worker not found' });
    if (!worker.selectedPlan) return res.status(400).json({ success: false, message: 'Worker has no active plan' });

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ success: false, message: 'Event not found' });

    // Simple Risk/Fraud simulation
    if (worker.location.toLowerCase() !== event.location.toLowerCase()) {
      return res.status(403).json({ success: false, message: 'Location mismatch (fraud prevention)' });
    }

    // Prevent duplicate payouts
    const existingPayout = await Payout.findOne({ workerId, eventId });
    if (existingPayout) {
      return res.status(400).json({ success: false, message: 'Payout already processed for this event' });
    }

    const config = await AdminConfig.findOne() || new AdminConfig();

    const isDisrupted = event.rain > config.rainThreshold || event.aqi > config.aqiThreshold || event.orders < config.orderThreshold;

    if (!isDisrupted) {
      return res.json({ success: true, message: 'No disruption detected. No payout.' });
    }

    const loss = worker.avgIncome - worker.currentIncome;
    if (loss <= 0) {
      return res.json({ success: true, message: 'No income loss detected. No payout.' });
    }

    const payoutAmount = Math.min(loss, worker.selectedPlan.payoutLimit);

    const payout = await Payout.create({
      workerId,
      eventId,
      loss,
      payoutAmount,
      status: 'processed'
    });

    res.status(201).json({ success: true, payout, message: `₹${payoutAmount} credited automatically due to disruption.` });

  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.getPayouts = async (req, res) => {
  try {
    const payouts = await Payout.find().populate('workerId eventId').sort({ createdAt: -1 });
    res.json({ success: true, payouts });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
