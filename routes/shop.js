const express = require('express')
const { getAllShopInfo, updateShop } = require('../controllers')
const router = express.Router()
const {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getAllShopInfo,
    updateShop,
} = require('../controllers')

const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

router.route('/profile').get(getAllShopInfo).patch(updateShop)
router.route('/profile').get(getAllShopInfo).patch(updateShop)
router
    .route('/product')
    .get(getAllProducts)
    .post(upload.array('files', 5), createProduct)
router
    .route('/product/:id')
    .get(getProductById)
    .patch(upload.array('imagesAdded', 5), updateProduct)
    .delete(deleteProduct)

module.exports = router
