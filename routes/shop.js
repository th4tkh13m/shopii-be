const express = require('express')
const router = express.Router()
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
} = require('../controllers')

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
