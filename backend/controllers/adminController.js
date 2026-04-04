const Worker = require('../models/Worker');
const Payout = require('../models/Payout');
const AdminConfig = require('../models/AdminConfig');
const Event = require('../models/Event');

exports.getOverview = async (req, res) => {
  try {
    const totalWorkers = await Worker.countDocuments();
    
    const payouts = await Payout.find();
    const totalPayoutAmount = payouts.reduce((acc, curr) => acc + curr.payoutAmount, 0);
    const totalPayouts = payouts.length;

    res.json({ success: true, totalWorkers, totalPayouts, totalPayoutAmount });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.updateConfig = async (req, res) => {
  try {
    const { rainThreshold, aqiThreshold, orderThreshold } = req.body;
    let config = await AdminConfig.findOne();
    if (!config) config = new AdminConfig();
    
    if (rainThreshold) config.rainThreshold = rainThreshold;
    if (aqiThreshold) config.aqiThreshold = aqiThreshold;
    if (orderThreshold) config.orderThreshold = orderThreshold;
    
    await config.save();
    res.json({ success: true, config });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.createEvent = async (req, res) => {
  try {
    const { rain, aqi, orders, location } = req.body;
    const config = await AdminConfig.findOne() || new AdminConfig();
    
    const isDisrupted = rain > config.rainThreshold || aqi > config.aqiThreshold || orders < config.orderThreshold;
    const status = isDisrupted ? 'disrupted' : 'normal';

    const event = await Event.create({ rain, aqi, orders, status, location });

    // Trigger payouts for workers in that location if disrupted
    if (status === 'disrupted') {
      const workers = await Worker.find({ location });
      for (const worker of workers) {
        // Calculate a simple payout amount based on thresholds
        const payoutAmount = 200; // Mock fixed amount for simulation
        
        await Payout.create({
          workerId: worker._id,
          payoutAmount,
          reason: `Auto-trigger: ${rain > config.rainThreshold ? 'Rain' : (aqi > config.aqiThreshold ? 'AQI' : 'Low Activity')}`,
          status: 'Paid'
        });
      }
    }

    res.status(201).json({ success: true, event, triggeredPayouts: status === 'disrupted' });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json({ success: true, events });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.getWorkers = async (req, res) => {
  try {
    const workers = await Worker.find().sort({ createdAt: -1 });
    res.json({ success: true, workers });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.getPayouts = async (req, res) => {
  try {
    const payouts = await Payout.find().sort({ createdAt: -1 });
    res.json({ success: true, payouts });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.getFraud = async (req, res) => {
  res.json({ success: true, fraud: [] });
};
