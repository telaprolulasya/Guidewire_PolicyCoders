const express = require('express');
const router = express.Router();
const workerController = require('../controllers/workerController');

router.post('/worker', workerController.createWorker);
router.get('/worker/:id', workerController.getWorker);
router.get('/plans', workerController.getPlans);
router.post('/subscribe', workerController.subscribePlan);
router.get('/status', workerController.getStatus);

module.exports = router;
