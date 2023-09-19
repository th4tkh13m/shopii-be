const express = require('express')
const { createAddress, getAddress } = require('../controllers/address')
const router = express.Router()

router.route('/').post(createAddress)
router.route('/:userId').get(getAddress)

module.exports = router
