const { register, login, checkEmailExisted, loginGoogle } = require('./auth')
const { getAllRequestByUserId, shopRegister } = require('./shopRequest')
const {
    createAddress,
    getAddress,
    editAddress,
    deleteAddress,
} = require('./address')
const { getRequestByStatus, handleShopRequest } = require('./admin')

module.exports = {
    register,
    login,
    createAddress,
    getAddress,
    checkEmailExisted,
    getAllRequestByUserId,
    shopRegister,
    editAddress,
    loginGoogle,
    handleShopRequest,
    getRequestByStatus,
}
