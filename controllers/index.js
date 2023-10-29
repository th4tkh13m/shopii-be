const {
    register,
    login,
    genCodeResetPassword,
    resetPassword,
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

module.exports = {
    register,
    login,
    genCodeResetPassword,
    resetPassword,
    checkEmailExisted,
    loginGoogle,
    getAllRequestByUserId,
    shopRegister,
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
}
