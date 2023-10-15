const { StatusCodes } = require('http-status-codes')
const { Product, Shop } = require('../models')

const getAllProducts = async (req, res) => {
    const { categoryId, location, keyword, sort, startPrice, endPrice } =
        req.query
    const queryObject = {}
    let productIds = null
    if (location) {
        const shops = await Shop.find({ shopAddress: { $in: location } })
        productIds = shops.reduce((acc, shop) => {
            return [...acc, ...shop.products]
        }, [])
    }
    if (keyword) {
        queryObject.productName = { $regex: keyword, $options: 'i' }
    }
    if (productIds) {
        queryObject._id = { $in: productIds }
    }
    if (categoryId) {
        queryObject.productCategory = { $in: categoryId }
    }
    const result = Product.find(queryObject).populate([
        {
            path: 'productCategory',
            select: 'categoryName',
        },
        {
            path: 'productOptions',
            select: 'optionPrice',
        },
    ])

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit
    result.skip(skip).limit(limit)
    const products = await result.exec()
    let productsCustom = products.map(product => {
        const optionsPrices = product.productOptions.map(
            option => option.optionPrice,
        )
        const minPrice = Math.min(...optionsPrices)
        const maxPrice = Math.max(...optionsPrices)
        return {
            ...product._doc,
            minPrice,
            maxPrice,
        }
    })
    if (startPrice) {
        productsCustom = productsCustom.filter(
            product =>
                product.minPrice >= +startPrice ||
                product.maxPrice >= +startPrice,
        )
    }
    if (endPrice) {
        productsCustom = productsCustom.filter(
            product =>
                product.maxPrice <= +endPrice || product.minPrice <= +endPrice,
        )
    }

    if (sort === 'desc') {
        productsCustom.sort((a, b) => b.maxPrice - a.maxPrice)
    }
    if (sort === 'asc') {
        productsCustom.sort((a, b) => a.minPrice - b.minPrice)
    }

    const totalPage = Math.ceil(
        (await Product.countDocuments(queryObject)) / limit,
    )
    res.status(StatusCodes.OK).json({
        products: productsCustom,
        length: products.length,
        totalPage,
    })
}

const getProductById = async (req, res) => {}

module.exports = {
    getAllProducts,
    getProductById,
}
