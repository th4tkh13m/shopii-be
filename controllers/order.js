const { StatusCodes } = require('http-status-codes')
const { Order, Cart, Product } = require('../models')
const { createCustomError } = require('../errors/CustomError')

const getAllOrdersUser = async (req, res) => {
    const userId = req.user.userId
    const orders = await Order.find({ userId }).populate([
        {
            path: 'products.productId',
            select: 'productName',
        },
        {
            path: 'products.optionProductId',
            select: 'optionName',
        },
        {
            path: 'addressId',
            select: 'addressName',
        },
    ])
    res.status(StatusCodes.OK).json(orders)
}
const createOrder = async (req, res) => {
    const userId = req.user.userId
    const { addressId, products, paymentMethod } = req.body

    var ordersMap = {}

    for (let i = 0; i < products.length; i++) {
        var productId = products[i].productId
        var product = await Product.findById(productId)
        console.log(productId)
        if (product.shopId in ordersMap) {
            ordersMap[shopId].push(products[i])
        } else {
            ordersMap[product.shopId] = [products[i]]
        }
    }

    // create orders based on shops to an array orders
    var orders = []
    for (let shopId in ordersMap) {
        const order = await Order.create({
            userId,
            shopId,
            addressId,
            products: ordersMap[shopId],
            paymentMethod,
        })
        orders.push(order)
    }

    // Remove products in cart
    const cart = await Cart.findOne({ userId })

    // loop through products
    // then delete product in cart
    for (let i = 0; i < products.length; i++) {
        var productId = products[i].productId
        var productOptionId = products[i].optionProductId
        const existingProductIndex = cart.products.findIndex(
            item =>
                item.product.equals(productId) &&
                item.productOption.equals(productOptionId),
        )

        console.log(existingProductIndex)

        if (existingProductIndex !== -1) {
            cart.products.splice(existingProductIndex, 1)
            await cart.save()
        } else {
            throw createCustomError(
                'Không tìm thấy sản phẩm',
                StatusCodes.NOT_FOUND,
            )
        }
    }

    res.status(StatusCodes.CREATED).json(orders)
}

module.exports = {
    getAllOrdersUser,
    createOrder,
}
