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
    deleteAllProducts,
} = require('./shopProduct')
const {
    createAddress,
    getAddress,
    editAddress,
    deleteAddress,
} = require('./address')
const { getAllCategory, createCategory } = require('./category')
const {
    getAllProducts: getAllProductsUser,
    getProductById: getProductByIdUser,
    getShops,
    getShopById,
} = require('./products')
const { getAllShopInfo, updateShop } = require('./shop')
const {
    addToCart,
    updateCartProduct,
    viewCartByUserId,
    deleteCartProduct,
    deleteAllProductFromCart,
} = require('./cart')
const { getAllOrdersUser, createOrder } = require('./order')
const { getAllOrdersShop, updateOrderStatus } = require('./shopOrder')
const { updateUserInfo } = require('./customer')
const {
    deleteAllProductOptions,
    createProductOption,
} = require('./productOptions')

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
    deleteAllProducts,
    createProductOption,
    deleteAllProductOptions,
    checkSession,
    createAddress,
    getAddress,
    editAddress,
    deleteAddress,
    logout,
    getAllCategory,
    createCategory,
    getAllProductsUser,
    getProductByIdUser,
    getShops,
    getShopById,
    getAllShopInfo,
    updateShop,
    addToCart,
    updateCartProduct,
    viewCartByUserId,
    deleteCartProduct,
    deleteAllProductFromCart,
    getAllOrdersUser,
    createOrder,
    getAllOrdersShop,
    updateOrderStatus,
    updateUserInfo,
}
