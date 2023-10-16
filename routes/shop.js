const express = require('express')
const { getAllShopInfo, updateShop } = require('../controllers')
const { verifyShop, verifyUser } = require('../middlewares/authenticateToken')
const router = express.Router()

router.get('/profile', verifyUser, getAllShopInfo)
router.patch('/profile', verifyShop, updateShop)

module.exports = router
