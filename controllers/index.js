const { register, login } = require('./auth')
const { createAddress, getAddress } = require('./address')

module.exports = {
    register,
    login,
    createAddress,
    getAddress,
}
