const {
    register,
    login,
    checkEmailExisted,
    loginGoogle,
    checkSession,
    logout,
} = require('./auth')
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
    checkEmailExisted,
    getAllRequestByUserId,
    shopRegister,
    editAddress,
    loginGoogle,
    handleShopRequest,
    getRequestByStatus,
    getRequestByStatus,
    handleShopRequest,
    checkSession,
    createAddress,
    getAddress,
    editAddress,
    deleteAddress,
    logout,
}
