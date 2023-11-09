const { StatusCodes } = require('http-status-codes')
const { Order, Cart } = require('../models')

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
    const { shopId, addressId, products, paymentMethod } = req.body
    const order = await Order.create({
        userId,
        shopId,
        addressId,
        products,
        paymentMethod,
    })

    res.status(StatusCodes.CREATED).json(order)
}

module.exports = {
    getAllOrdersUser,
    createOrder,
}
