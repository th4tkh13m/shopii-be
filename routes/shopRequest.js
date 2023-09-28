const express = require('express')
const router = express.Router()
const { getAllRequestByUserId, shopRegister } = require('../controllers')

router.get('/:userId', getAllRequestByUserId)
router.post('/register', shopRegister)

module.exports = router
