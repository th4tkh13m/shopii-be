const express = require('express')
const {
    getRequestByStatus,
    handleShopRequest,
} = require('../controllers/index')
const router = express.Router()

router.get('/:status', getRequestByStatus)
router.post('/handleRequest', handleShopRequest)

module.exports = router
