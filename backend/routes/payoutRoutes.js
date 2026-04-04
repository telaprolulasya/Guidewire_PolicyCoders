const express = require('express');
const router = express.Router();
const payoutController = require('../controllers/payoutController');

router.post('/payout', payoutController.calculatePayout);
router.get('/payouts', payoutController.getPayouts);

module.exports = router;
