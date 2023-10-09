const {
    register,
    login,
    checkEmailExisted,
    loginGoogle,
    checkSession,
} = require('./auth')
const { getAllRequestByUserId, shopRegister } = require('./shopRequest')
const { getRequestByStatus, handleShopRequest } = require('./admin')

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
}
