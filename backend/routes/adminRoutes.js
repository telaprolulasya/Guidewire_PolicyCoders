const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/overview', adminController.getOverview);
router.post('/update-config', adminController.updateConfig);
router.post('/trigger-event', adminController.createEvent);
router.get('/events', adminController.getEvents);
router.get('/workers', adminController.getWorkers);
router.get('/payouts', adminController.getPayouts);
router.get('/fraud', adminController.getFraud);

module.exports = router;
