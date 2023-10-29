const express = require('express')
const {
    viewCartByUserId,
    addToCart,
    updateCartProduct,
    deleteCartProduct,
    deleteAllProductFromCart,
} = require('../controllers')
const router = express.Router()

router
    .route('/')
    .get(viewCartByUserId)
    .post(addToCart)
    .patch(updateCartProduct)
    .delete(deleteCartProduct)
router.route('/deleteAll').delete(deleteAllProductFromCart)

module.exports = router
