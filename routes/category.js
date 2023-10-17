const express = require('express')
const { getAllCategory, createCategory } = require('../controllers')
const { verifyAdmin } = require('../middlewares/authenticateToken')
const router = express.Router()

router.get('/', getAllCategory)
router.post('/createCategory', verifyAdmin, createCategory)

module.exports = router
