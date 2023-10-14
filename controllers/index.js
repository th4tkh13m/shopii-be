const {
    register,
    login,
    genCodeResetPassword,
    resetPassword,
    changePassword,
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
const { getAllCategory, createCategory } = require('./category')
const { getRequestByStatus, handleShopRequest } = require('./admin')

module.exports = {
    register,
    login,
    genCodeResetPassword,
    resetPassword,
    changePassword,
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
    getAllCategory,
    createCategory,
}
