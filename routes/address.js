const express = require('express')
const { createAddress, getAddress } = require('../controllers/address')
const router = express.Router()

router.post('/createAddress', createAddress)
router.get('/getAddress/:userID', getAddress)

module.exports = router
