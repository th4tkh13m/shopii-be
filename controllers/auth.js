const { Customer } = require('../models//index')
const { createCustomError } = require('../errors/CustomError')
const { StatusCodes } = require('http-status-codes')
const { generateName, generateCode } = require('../utils/utils')

const register = async (req, res) => {
    const { phone, password, rePassword } = req.body
    const customerFound = await Customer.findOne({ phone })
    if (customerFound) {
        throw createCustomError(`Tài khoản đã tồn tại`, StatusCodes.BAD_REQUEST)
    }
    if (password !== rePassword) {
        throw createCustomError(
            'Mật khẩu và nhập lại mật khẩu không khớp',
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
    let mail = null
    let phone = null
    if (info.includes('@')) {
        mail = info
    } else {
        phone = info
    }
    const customer = await Customer.findOne({ mail, phone })
    if (!customer) {
        throw createCustomError(
            `Không tìm thấy tài khoản`,
            StatusCodes.NOT_FOUND,
        )
    }
    const isPasswordCorrect = await customer.comparePassword(password)
    if (!isPasswordCorrect) {
        throw createCustomError(
            'Tài khoản hoặc mật khẩu không đúng',
            StatusCodes.UNAUTHORIZED,
        )
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

const checkEmailExisted = async (req, res) => {
    const { email } = req.body
    const customer = await Customer.findOne({ mail: email })
    if (!customer) {
        throw createCustomError(
            `Email ${email} not found`,
            StatusCodes.NOT_FOUND,
        )
    }
    res.status(StatusCodes.OK).json({
        ...customer.toObject(),
        password: undefined,
    })
}

const loginGoogle = async (req, res) => {
    const { name, email, password, rePassword } = req.body
    if (password !== rePassword) {
        throw createCustomError(
            'Mật khẩu và nhập lại mật khẩu không khớp',
            StatusCodes.BAD_REQUEST,
        )
    }
    const customer = await Customer.create({
        mail: email,
        password,
        name,
        securityCode: generateCode(),
    })
    res.status(StatusCodes.CREATED).json({
        ...customer.toObject(),
        password: undefined,
    })
}

module.exports = {
    register,
    login,
    resetPassword,
    checkEmailExisted,
    loginGoogle,
}
