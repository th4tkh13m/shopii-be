const Product = require('../models/Product')
const { StatusCodes } = require('http-status-codes')

const TEST_IMAGES = [
    'https://www.apple.com/newsroom/images/2023/09/apple-unveils-iphone-15-pro-and-iphone-15-pro-max/tile/Apple-iPhone-15-Pro-lineup-hero-230912.jpg.news_app_ed.jpg',
    'https://minhtuanmobile.com/uploads/blog/tai-sao-iphone-15-va-iphone-15-plus-mau-hong-se-thanh-hot-trend-230915021036.jpg',
]
const getAllProducts = async (req, res) => {
    const products = await Product.find({})
        .populate('Category')
        .populate('ProductOption')
        .exec()
    res.status(StatusCodes.OK).json(products)
}

const getProductById = async (req, res) => {
    const { id } = req.params
    const product = await Product.findById(id)
        .populate('Category')
        .populate('ProductOption')
        .exec()
    if (!product) {
        return res
            .status(StatusCodes.NOT_FOUND)
            .json({ message: 'Product not found' })
    }
    res.status(StatusCodes.OK).json(product)
}

const createProduct = async (req, res) => {
    const product = await Product.create({
        ...req.body,
        productImages: TEST_IMAGES,
    })
    res.status(StatusCodes.CREATED).json(product)
}

const updateProduct = async (req, res) => {}

const deleteProduct = async (req, res) => {}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
}
