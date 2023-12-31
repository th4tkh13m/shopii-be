const Product = require('../models/Product')
const { StatusCodes } = require('http-status-codes')
const ProductOption = require('../models/ProductOption')
const { Shop } = require('../models')
const {
    putImages,
    getImages,
    deleteImages,
    deleteAllImages,
} = require('../utils/awsServices')

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
    const productOptionIds = productsOptionCreated.map(
        productOption => productOption._id,
    )

    const product = await Product.create({
        ...req.body,
        productOptions: productOptionIds,
    })

    await putImages('products', product._id, filesImage)
    const imageUrls = await getImages('products', product._id)

    product.productImages = imageUrls
    await product.save()

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
    const productOptionsUpdated = productOptions.filter(option => !!option._id)
    const productOptionsCreated = await ProductOption.insertMany(
        productOptionsNew,
    )
    await ProductOption.deleteMany({ _id: { $in: productOptionsDeleted } })
    productOptionsUpdated.forEach(async option => {
        await ProductOption.findByIdAndUpdate(
            option._id,
            {
                ...option,
            },
            {
                new: true,
                runValidators: true,
            },
        )
    })
    const productOptionsIds = [
        productOptions.map(option => option._id),
        productOptionsCreated.map(option => option._id),
    ].flatMap(option => option)

    const imagesAdded = req.files
    const imagesDeleted = JSON.parse(req.body.imagesDeleted)
    const productImagesAfterDelete = JSON.parse(req.body.productImages).filter(
        image => !imagesDeleted.includes(image),
    )
    if (!!imagesAdded.length) {
        await putImages('products', productId, imagesAdded)
    }
    // Delete image from S3 with array type [String] imagesDeleted
    // Add image to S3 from array [File] imagesAdded. After create image create variables [String]
    //store link and replace variables TEST_UPDATED_IMAGES
    if (!!imagesDeleted.length) {
        console.log('IMAGE DELETED')
        console.log(imagesDeleted)
        await deleteImages(imagesDeleted)
    }

    const productImages = await getImages('products', productId)
    console.log(productOptionsUpdated)

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
    await deleteAllImages('products', id)
    res.status(StatusCodes.OK).send()
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
}
