const jwt = require('jsonwebtoken')
const { StatusCodes } = require('http-status-codes')
const { createCustomError } = require('../errors/CustomError')

const verifyUser = (req, res, next) => {
    const token = getToken(req)
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded)
        req.user = decoded
        next()
    } catch (error) {
        handleError()
    }
}

const verifyShop = (req, res, next) => {
    const token = getToken(req)
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (!decoded.roles.includes('shop')) {
            handleError()
        }
        req.user = decoded
        next()
    } catch (error) {
        handleError()
    }
}

const verifyAdmin = (req, res, next) => {
    const token = getToken(req)
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (!decoded.roles.includes('admin')) {
            handleError()
        }
        req.user = decoded
        next()
    } catch (error) {
        handleError()
    }
}

const getToken = req => {
    if (!req.cookies.token) {
        handleError()
    }
    return req.cookies.token
}

const handleError = () => {
    throw createCustomError(
        'Bạn không có quyền truy cập',
        StatusCodes.UNAUTHORIZED,
    )
}

module.exports = {
    verifyUser,
    verifyShop,
    verifyAdmin,
}
