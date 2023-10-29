const express = require('express')
const router = express.Router()
const {
    getAllProductsUser,
    getProductByIdUser,
    getShops,
    getShopById,
} = require('../controllers/')

router
    .get('/', getAllProductsUser)
    .get('/shops', getShops)
    .get('/:id', getProductByIdUser)
    .get('/shops/:id', getShopById)

module.exports = router
