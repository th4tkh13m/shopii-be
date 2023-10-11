const {
    register,
    login,
    checkEmailExisted,
    loginGoogle,
    checkSession,
    logout,
} = require('./auth')
const { getAllRequestByUserId, shopRegister } = require('./shopRequest')
const { getRequestByStatus, handleShopRequest } = require('./admin')
const {
    createAddress,
    getAddress,
    editAddress,
    deleteAddress,
} = require('./address')

module.exports = {
    register,
    login,
    checkEmailExisted,
    loginGoogle,
    getAllRequestByUserId,
    shopRegister,
    getRequestByStatus,
    handleShopRequest,
    checkSession,
    createAddress,
    getAddress,
    editAddress,
    deleteAddress,
    logout,
}
