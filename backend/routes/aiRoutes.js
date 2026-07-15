const express = require('express');
const router = express.Router();
const { analyzeTask } = require('../controllers/aiController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/analyze', authMiddleware, analyzeTask);

module.exports = router;
