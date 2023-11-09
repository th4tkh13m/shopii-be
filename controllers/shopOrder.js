const { StatusCodes } = require('http-status-codes')
const { Order, Shop } = require('../models')

const getAllOrdersShop = async (req, res) => {
    const userId = req.user.userId
    const shop = await Shop.findOne({ userId })

    const orders = await Order.findOne({ shopId: shop._id }).populate([
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
const updateOrderStatus = async (req, res) => {
    const userId = req.user.userId
    const shop = await Shop.findOne({ userId })
    const { orderId, status } = req.body

    const order = await Order.findOneAndUpdate(
        { _id: orderId, shopId: shop._id },
        { status },
        { new: true, runValidator: true },
    )
    res.status(StatusCodes.CREATED).json(order)
}

module.exports = {
    getAllOrdersShop,
    updateOrderStatus,
}
