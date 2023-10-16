const Product = require('../models/Product')
const { StatusCodes } = require('http-status-codes')
const ProductOption = require('../models/ProductOption')
const { Shop } = require('../models')
const TEST_IMAGES = [
    'https://www.apple.com/newsroom/images/2023/09/apple-unveils-iphone-15-pro-and-iphone-15-pro-max/tile/Apple-iPhone-15-Pro-lineup-hero-230912.jpg.news_app_ed.jpg',
    'https://minhtuanmobile.com/uploads/blog/tai-sao-iphone-15-va-iphone-15-plus-mau-hong-se-thanh-hot-trend-230915021036.jpg',
]

const TEST_UPDATED_IMAGES = [
    'https://cdn.tgdd.vn/Files/2023/01/07/1501293/cauhinh_1280x853-800-resize.jpg',
]
const getAllProducts = async (req, res) => {
    const shop = await Shop.findOne({ userId: req.user.userId })
        .populate({
            path: 'products',
            populate: [
                {
                    path: 'productCategory',
                },
                {
                    path: 'productOptions',
                },
            ],
        })
        .exec()
    const products = shop.products
    res.status(StatusCodes.OK).json(products)
}

const getProductById = async (req, res) => {
    const { id } = req.params
    const product = await Product.findById(id)
        .populate('productCategory')
        .populate('productOptions')
        .exec()
    if (!product) {
        return res
            .status(StatusCodes.NOT_FOUND)
            .json({ message: 'Product not found' })
    }
    res.status(StatusCodes.OK).json(product)
}

const createProduct = async (req, res) => {
    const filesImage = req.files
    const productsOptionCreated = await ProductOption.insertMany(
        JSON.parse(req.body.productOptions),
    )
    const productIds = productsOptionCreated.map(product => product._id)
    // Create image in S3 from array [File] filesImage. After create image create variables [String]
    // and replace variables TEST_IMAGES
    const product = await Product.create({
        ...req.body,
        productOptions: productIds,
        productImages: TEST_IMAGES,
    })
    await Shop.findOneAndUpdate(
        { userId: req.user.userId },
        { $push: { products: product._id } },
    )
    res.status(StatusCodes.CREATED).json(product)
}

const updateProduct = async (req, res) => {
    const { id: productId } = req.params
    const { productName, productCategory, productDescription } = req.body
    const productOptions = JSON.parse(req.body.productOptions)
    const productOptionsDeleted = JSON.parse(req.body.productOptionsDeleted)
    const productOptionsNew = productOptions.filter(option => !option._id)
    const productOptionsCreated = await ProductOption.insertMany(
        productOptionsNew,
    )
    await ProductOption.deleteMany({ _id: { $in: productOptionsDeleted } })
    const productOptionsIds = [
        productOptions.map(option => option._id),
        productOptionsCreated.map(option => option._id),
    ].flatMap(option => option)
    console.log(productOptionsIds)

    const imagesAdded = req.files
    const imagesDeleted = JSON.parse(req.body.imagesDeleted)
    const productImagesAfterDelete = JSON.parse(req.body.productImages).filter(
        image => !imagesDeleted.includes(image),
    )
    if (imagesAdded) {
    }
    // Delete image from S3 with array type [String] imagesDeleted
    // Add image to S3 from array [File] imagesAdded. After create image create variables [String]
    //store link and replace variables TEST_UPDATED_IMAGES

    const productImages = [...productImagesAfterDelete, ...TEST_UPDATED_IMAGES]
    const productUpdated = await Product.findByIdAndUpdate(
        { _id: productId },
        {
            productName,
            productCategory,
            productDescription,
            productOptions: productOptionsIds,
            productImages,
        },
        {
            new: true,
            runValidators: true,
        },
    )
    res.status(StatusCodes.OK).json(productUpdated)
}

const deleteProduct = async (req, res) => {
    const { id } = req.params
    await Product.findByIdAndRemove(id)
    res.status(StatusCodes.OK).send()
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
}
