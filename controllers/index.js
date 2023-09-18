const { createAddress, getAddress } = require('./address')
const { register, login, checkEmailExisted, loginGoogle } = require('./auth')

module.exports = {
    register,
    login,
    createAddress,
    getAddress,
    checkEmailExisted,
    loginGoogle,
}
