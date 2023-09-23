const express = require('express')
const {
    register,
    login,
    checkEmailExisted,
    loginGoogle,
} = require('../controllers')
const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/check-email', checkEmailExisted)
router.post('/login-google', loginGoogle)

module.exports = router
