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
const { getRequestByStatus, handleShopRequest } = require('./admin')
const {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
} = require('./shopProduct')
const {
    createAddress,
    getAddress,
    editAddress,
    deleteAddress,
} = require('./address')
const { getAllCategory, createCategory } = require('./category')
const { getAllShopInfo, updateShop } = require('./shop')
const {
    getAllProducts: getAllProductsUser,
    getProductById: getProductByIdUser,
    getShops,
    getShopById,
} = require('./products')

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
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    checkSession,
    createAddress,
    getAddress,
    editAddress,
    deleteAddress,
    logout,
    getAllCategory,
    createCategory,
    getAllShopInfo,
    updateShop,
    getAllProductsUser,
    getProductByIdUser,
    getShops,
    getShopById,
}
