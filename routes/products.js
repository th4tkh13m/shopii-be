const express = require('express')
const router = express.Router()
const { getAllProductsUser, getProductByIdUser } = require('../controllers/')

router.get('/', getAllProductsUser)
router.get('/:id', getProductByIdUser)

module.exports = router
