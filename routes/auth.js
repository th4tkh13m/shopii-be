const express = require('express')
const {
    register,
    login,
    genCodeResetPassword,
    resetPassword,
    changePassword,
    checkEmailExisted,
    loginGoogle,
    checkSession,
    logout,
} = require('../controllers')
const router = express.Router()
const { verifyUser } = require('../middlewares/authenticateToken')

router.post('/register', register)
router.post('/login', login)
router.post('/change-password', changePassword)
router.post('/check-email', checkEmailExisted)
router.post('/login-google', loginGoogle)
router.post('/check-session', verifyUser, checkSession)
router.post('/logout', logout)
router.post('/reset-password', genCodeResetPassword)
router.put('/reset-password', resetPassword)

module.exports = router
