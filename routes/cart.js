const express = require('express')
const { viewCartByUserId, addToCart } = require('../controllers/cart')
const router = express.Router()

router.route('/').get(viewCartByUserId).post(addToCart)

module.exports = router
