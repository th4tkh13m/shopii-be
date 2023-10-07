const express = require('express')
const {
    getRequestByStatus,
    handleShopRequest,
} = require('../controllers/index')
const router = express.Router()

router.get('/', getRequestByStatus)
router.post('/handleRequest', handleShopRequest)

module.exports = router
