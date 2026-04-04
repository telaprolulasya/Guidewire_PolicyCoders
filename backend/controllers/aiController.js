const Worker = require('../models/Worker');
const Plan = require('../models/Plan');
const Payout = require('../models/Payout');

// 1. AI RISK SCORING
// Calculates Risk Score (0–10) based on inputs
exports.getRiskScore = async (req, res) => {
  try {
    const { rainfall, aqi, orders, locationRisk = 2 } = req.query;
    
    // Simple weighted scoring logic
    let score = 0;
    if (parseFloat(rainfall) > 50) score += 3;
    if (parseFloat(aqi) > 300) score += 3;
    if (parseInt(orders) < 5) score += 4;
    
    // Add base location risk (simulated static value)
    score = Math.min(10, score + parseInt(locationRisk));

    let level = 'Low';
    if (score >= 4 && score <= 7) level = 'Medium';
    else if (score >= 8) level = 'High';

    res.status(200).json({
      riskScore: score,
      riskLevel: level,
      factors: {
        rainfall: parseFloat(rainfall),
        aqi: parseFloat(aqi),
        orders: parseInt(orders)
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 2. DYNAMIC PREMIUM PRICING
// Adjusts weekly premium based on risk score
exports.getDynamicPremium = async (req, res) => {
  try {
    const { riskScore } = req.query;
    const score = parseInt(riskScore);
    
    let recommendedPrice = 20;
    let recommendedPlan = 'Basic';

    if (score >= 8) {
      recommendedPrice = 40;
      recommendedPlan = 'Premium';
    } else if (score >= 4) {
      recommendedPrice = 30;
      recommendedPlan = 'Standard';
    } else {
      recommendedPrice = 20;
      recommendedPlan = 'Basic';
    }

    res.status(200).json({
      recommendedPlan,
      recommendedPrice,
      currency: '₹'
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 3. SMART PAYOUT CALCULATION
// Instead of fixed payout, calculates based on loss and severity
exports.calculateSmartPayout = async (req, res) => {
  try {
    const { workerId, currentIncome, disruptionSeverity } = req.body;
    
    const worker = await Worker.findById(workerId).populate('selectedPlan');
    if (!worker) return res.status(404).json({ message: 'Worker not found' });

    const avgIncome = worker.avgIncome || 500; // Default if not found
    const planLimit = worker.selectedPlan ? worker.selectedPlan.payoutLimit : 500;
    
    const loss = Math.max(0, avgIncome - currentIncome);
    
    let multiplier = 0.6; // Low
    if (disruptionSeverity === 'High') multiplier = 1.0;
    else if (disruptionSeverity === 'Medium') multiplier = 0.8;

    const payoutAmount = Math.min(loss * multiplier, planLimit);

    // Store the payout in DB
    const payout = await Payout.create({
      workerId,
      payoutAmount,
      reason: `Smart Calculation: ${disruptionSeverity} severity disruption`,
      status: 'Paid'
    });
    
    res.status(200).json({
      success: true,
      payout,
      calculation: {
        loss,
        multiplier,
        planLimit
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 4. FRAUD DETECTION (SIMULATED AI)
exports.detectFraud = async (req, res) => {
  try {
    const { locationMismatch, duplicatePayout, activityDrop } = req.query;
    
    let fraudScore = 0;
    if (locationMismatch === 'true') fraudScore += 40;
    if (duplicatePayout === 'true') fraudScore += 50;
    if (activityDrop === 'false') fraudScore += 30; // Payout triggered but no drop in activity

    fraudScore = Math.min(100, fraudScore);
    const status = fraudScore > 50 ? 'Suspicious' : 'Safe';

    res.status(200).json({
      fraudScore,
      status,
      warnings: fraudScore > 50 ? ['Potential fraud detected'] : []
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 5. PERSONALIZED PLAN RECOMMENDATION
exports.getRecommendation = async (req, res) => {
  try {
    const { riskScore, pastDisruptions, earningsPattern } = req.query;
    const score = parseInt(riskScore);
    
    let recommendation = 'Basic (good for stable areas)';
    if (score >= 8 || parseInt(pastDisruptions) > 3) {
      recommendation = 'Premium (best for high-risk areas)';
    } else if (score >= 4 || earningsPattern === 'volatile') {
      recommendation = 'Standard (balanced protection)';
    }

    res.status(200).json({
      recommendedPlan: recommendation.split(' ')[0],
      reason: recommendation
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 6. DISRUPTION CONFIDENCE SCORE
exports.getConfidenceScore = async (req, res) => {
  try {
    const { weatherSeverity, aqiSeverity, activityDropPercent } = req.query;
    
    // Combine signals
    let confidence = 0;
    confidence += parseInt(weatherSeverity) * 0.4;
    confidence += parseInt(aqiSeverity) * 0.3;
    confidence += parseInt(activityDropPercent) * 0.3;

    confidence = Math.min(100, confidence);
    const triggerPayout = confidence > 70;

    res.status(200).json({
      confidenceScore: confidence,
      triggerPayout,
      message: triggerPayout ? "High confidence: Disruption verified" : "Low confidence: Further verification needed"
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
