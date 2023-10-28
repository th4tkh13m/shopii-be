const express = require('express')
const {
    viewCartByUserId,
    addToCart,
    updateCartProduct,
} = require('../controllers')
const router = express.Router()

router.route('/').get(viewCartByUserId).post(addToCart).patch(updateCartProduct)

module.exports = router
