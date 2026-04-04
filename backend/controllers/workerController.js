const Worker = require('../models/Worker');
const Plan = require('../models/Plan');
const Event = require('../models/Event');
const AdminConfig = require('../models/AdminConfig');

exports.createWorker = async (req, res) => {
  try {
    const { name, location, platform, avgIncome, currentIncome } = req.body;
    const worker = await Worker.create({ name, location, platform, avgIncome, currentIncome });
    res.status(201).json({ success: true, worker });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.getWorker = async (req, res) => {
  try {
    const worker = await Worker.findById(req.params.id).populate('selectedPlan');
    if (!worker) return res.status(404).json({ success: false, error: 'Worker not found' });
    res.json({ success: true, worker });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.getPlans = async (req, res) => {
  try {
    const plans = await Plan.find();
    res.json({ success: true, plans });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.subscribePlan = async (req, res) => {
  try {
    const { workerId, planId } = req.body;
    const worker = await Worker.findByIdAndUpdate(workerId, { selectedPlan: planId }, { new: true });
    if (!worker) return res.status(404).json({ success: false, error: 'Worker not found' });
    res.json({ success: true, worker });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.getStatus = async (req, res) => {
  try {
    const { location } = req.query; // optional filtering by location
    let filter = {};
    if (location) filter.location = location;
    
    // Get the most recent event
    const event = await Event.findOne(filter).sort({ createdAt: -1 });
    res.json({ success: true, event });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
