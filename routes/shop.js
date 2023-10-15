const express = require('express')
const { getAllShopInfo, updateShop } = require('../controllers')
const router = express.Router()

router.get('/profile', getAllShopInfo)
router.patch('/profile', updateShop)

module.exports = router
