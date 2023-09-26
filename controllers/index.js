const { register, login } = require('./auth')
const { createAddress, getAddress, editAddress, deleteAddress } = require('./address')

module.exports = {
    register,
    login,
    createAddress,
    getAddress,
    editAddress,
    deleteAddress
}