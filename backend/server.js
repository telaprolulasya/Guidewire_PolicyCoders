require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Import Routes
const workerRoutes = require('./routes/workerRoutes');
const payoutRoutes = require('./routes/payoutRoutes');
const adminRoutes = require('./routes/adminRoutes');
const aiRoutes = require('./routes/aiRoutes');

// Import Models for Seeding Data
const Plan = require('./models/Plan');
const AdminConfig = require('./models/AdminConfig');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Setup initial hackathon data
const seedData = async () => {
  try {
    const plansCount = await Plan.countDocuments();
    if (plansCount === 0) {
      await Plan.insertMany([
        { name: 'Basic', price: 20, payoutLimit: 500 },
        { name: 'Standard', price: 30, payoutLimit: 1000 },
        { name: 'Premium', price: 50, payoutLimit: 2000 }
      ]);
      console.log('Seeded initial plans.');
    }

    const configCount = await AdminConfig.countDocuments();
    if (configCount === 0) {
      await AdminConfig.create({
        rainThreshold: 50,
        aqiThreshold: 300,
        orderThreshold: 5
      });
      console.log('Seeded initial admin config.');
    }
  } catch (err) {
    console.error('Error seeding data:', err);
  }
};
seedData();

// Register Routes
app.use('/api', workerRoutes);        // Worker API e.g. /api/worker, /api/plans
app.use('/api', payoutRoutes);        // Payout API e.g. /api/payout
app.use('/api/admin', adminRoutes);   // Admin API e.g. /api/admin/overview
app.use('/api', aiRoutes);           // AI-driven Features API

const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
