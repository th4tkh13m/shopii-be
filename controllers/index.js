const { createAddress, getAddress } = require('./address')
const { register, login, checkEmailExisted, loginGoogle } = require('./auth')
const { getAllRequestByUserId, shopRegister } = require('./shopRequest')
const {
    createAddress,
    getAddress,
    editAddress,
    deleteAddress,
} = require('./address')

module.exports = {
    register,
    login,
    createAddress,
    getAddress,
    checkEmailExisted,
    getAllRequestByUserId,
    shopRegister,
    editAddress,
}
