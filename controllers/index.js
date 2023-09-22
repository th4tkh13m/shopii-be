const { createAddress, getAddress } = require('./address')
const { register, login, checkEmailExisted, loginGoogle } = require('./auth')
const { getAllRequestByUserId, shopRegister } = require('./shopRequest')
const { getRequestByStatus, handleShopRequest } = require('./admin')

module.exports = {
    register,
    login,
    createAddress,
    getAddress,
    checkEmailExisted,
    loginGoogle,
    getAllRequestByUserId,
    shopRegister,
    getRequestByStatus,
    handleShopRequest,
}
