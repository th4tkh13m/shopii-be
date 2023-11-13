const express = require('express')
const { updateUserInfo } = require('../controllers')
const router = express.Router()

router.route('/').put(updateUserInfo)

module.exports = router
