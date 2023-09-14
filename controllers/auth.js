const { Customer } = require('../models//index')
const { createCustomError } = require('../errors/CustomError')
const { StatusCodes } = require('http-status-codes')
const { generateName, generateCode } = require('../utils/utils')

const register = async (req, res) => {
    const { phone, password, rePassword } = req.body
    if (password !== rePassword) {
        throw createCustomError(
            'Password and rePassword do not match',
            StatusCodes.BAD_REQUEST,
        )
    }
    const customer = await Customer.create({
        phone,
        password,
        name: generateName(),
        securityCode: generateCode(),
    })
    res.status(StatusCodes.CREATED).json({
        ...customer.toObject(),
        password: undefined,
    })
}

const login = async (req, res) => {
    const { info, password } = req.body
    let email = null
    let phone = null
    if (info.includes('@')) {
        email = info
    } else {
        phone = info
    }
    const customer = await Customer.findOne({ email, phone })
    if (!customer) {
        throw createCustomError(`User ${info} not found`, StatusCodes.NOT_FOUND)
    }
    const isPasswordCorrect = await customer.comparePassword(password)
    if (!isPasswordCorrect) {
        throw createCustomError('Invalid credentials', StatusCodes.UNAUTHORIZED)
    }
    res.status(StatusCodes.OK).json({
        ...customer.toObject(),
        password: undefined,
    })
}

const resetPassword = async (req, res) => {
    const { info, code } = req.body
    let email = null
    let phone = null
    if (info.includes('@')) {
        email = info
    } else {
        phone = info
    }
    const customer = await Customer.findOne({ email, phone })
    if (!customer) {
        throw createCustomError(`User ${info} not found`, StatusCodes.NOT_FOUND)
    }
}

module.exports = {
    register,
    login,
    resetPassword,
}
