const express = require('express')
const { getAllShopInfo, updateShop } = require('../controllers')
const router = express.Router()

router.route('/profile').get(getAllShopInfo).patch(updateShop)

module.exports = router
