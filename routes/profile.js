const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile');

// Update user profile
router.put('/:id', profileController.updateUserProfile);

module.exports = router;
