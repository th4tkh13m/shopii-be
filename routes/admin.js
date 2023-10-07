const express = require('express')
const { getRequestByStatus, handleShopRequest } = require('../controllers')
const router = express.Router()

router.get('/', getRequestByStatus)
router.post('/handleRequest', handleShopRequest)

module.exports = router
