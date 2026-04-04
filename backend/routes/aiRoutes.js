const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');

// 7. API ENDPOINTS (Node.js)
router.get('/ai/risk', aiController.getRiskScore);
router.get('/ai/premium', aiController.getDynamicPremium);
router.post('/ai/payout', aiController.calculateSmartPayout);
router.get('/ai/fraud', aiController.detectFraud);
router.get('/ai/recommendation', aiController.getRecommendation);
router.get('/ai/confidence', aiController.getConfidenceScore);

module.exports = router;
