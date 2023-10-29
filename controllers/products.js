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
        console.log(startPrice)
        productsCustom = productsCustom.filter(
            product => product.minPrice >= +startPrice,
        )
        console.log(productsCustom)
    }
    if (endPrice) {
        productsCustom = productsCustom.filter(
            product => product.maxPrice <= +endPrice,
        )
    }

    if (sort === 'desc') {
        productsCustom.sort((a, b) => b.maxPrice - a.maxPrice)
    }
    if (sort === 'asc') {
        productsCustom.sort((a, b) => a.minPrice - b.minPrice)
    }
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit
    const totalPage = Math.ceil(productsCustom.length / limit)
    productsCustom = productsCustom.slice(skip, skip + limit)

    res.status(StatusCodes.OK).json({
        products: productsCustom,
        length: products.length,
        totalPage,
    })
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

const getShops = async (req, res) => {
    const { location, keyword } = req.query
    console.log(1)
    const queryObject = {}
    if (keyword) {
        queryObject.shopName = { $regex: keyword, $options: 'i' }
    }
    if (location) {
        queryObject.shopAddress = { $in: location }
    }
    const result = Shop.find(queryObject)
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit
    result.skip(skip).limit(limit)
    const shops = await result.exec()
    const totalPage = Math.ceil(
        (await Shop.countDocuments(queryObject)) / limit,
    )
    res.status(StatusCodes.OK).json({
        shops,
        length: shops.length,
        totalPage,
    })
}

const getShopById = async (req, res) => {
    const { id } = req.params
    const shop = await Shop.findById(id).populate({
        path: 'products',
        populate: [
            {
                path: 'productCategory',
                select: 'categoryName',
            },
            {
                path: 'productOptions',
                select: 'optionPrice',
            },
        ],
    })
    res.status(StatusCodes.OK).json({
        shop,
    })
}

module.exports = {
    getAllProducts,
    getProductById,
    getShops,
    getShopById,
}
