const { StatusCodes } = require('http-status-codes')
const { Order, Shop } = require('../models')

const getAllOrdersShop = async (req, res) => {
    const userId = req.user.userId
    const shop = await Shop.findOne({ userId })

    const status = req.query.status
    var orders = null
    if (status === 'all') {
        orders = await Order.find({ shopId: shop._id }).populate([
            {
                path: 'products.productId',
                select: 'productName productImages',
            },
            {
                path: 'products.optionProductId',
                select: 'optionName optionPrice optionQuantity',
            },
            {
                path: 'addressId',
                select: 'receiverName receiverPhone province district ward receiverAddress',
            },
        ])
    } else {
        // Captialize first letter
        const statusOrder = status.charAt(0).toUpperCase() + status.slice(1)
        orders = await Order.find({
            shopId: shop._id,
            status: statusOrder,
        }).populate([
            {
                path: 'products.productId',
                select: 'productName productImages',
            },
            {
                path: 'products.optionProductId',
                select: 'optionName optionPrice optionQuantity',
            },
            {
                path: 'addressId',
                select: 'receiverName receiverPhone province district ward receiverAddress',
            },
        ])
    }

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
