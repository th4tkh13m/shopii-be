const { register, login } = require('./auth')
const { createAddress, getAddress } = require('./address')
const { getAllRequestByUserId, shopRegister } = require('./shopRequest')

module.exports = {
    register,
    login,
    createAddress,
    getAddress,
    getAllRequestByUserId,
    shopRegister
}
