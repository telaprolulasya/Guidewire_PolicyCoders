require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Worker = require('./models/Worker');
const Plan = require('./models/Plan');

const seedWorker = async () => {
  await connectDB();
  
  const workerCount = await Worker.countDocuments();
  if (workerCount === 0) {
    const defaultPlan = await Plan.findOne(); // Grab any plan
    await Worker.create({
      _id: new mongoose.Types.ObjectId('65fa00000000000000001234'), // Fixed ID for mock testing
      name: 'Ravi Kumar',
      location: 'Bangalore',
      platform: 'Delivery Partner',
      selectedPlan: defaultPlan._id,
      avgIncome: 800,
      currentIncome: 800
    });
    console.log('Dummy Worker Created (ID: 65fa00000000000000001234)');
  } else {
    console.log('Workers already exist in DB.');
  }
  process.exit();
};

seedWorker();
