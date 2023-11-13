const express = require('express')
const router = express.Router()
const { getAllOrdersUser, createOrder } = require('../controllers/')

router.route('/').get(getAllOrdersUser).post(createOrder)

module.exports = router
