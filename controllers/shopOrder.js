const { StatusCodes } = require('http-status-codes')
const { Order, Shop, ProductOption } = require('../models')
const paypal = require('paypal-rest-sdk')

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

paypal.configure({
    mode: 'sandbox',
    client_id: process.env.PAYPAL_CLIENT_ID,
    client_secret: process.env.PAYPAL_CLIENT_SECRET,
})

const updateOrderStatus = async (req, res) => {
    const userId = req.user.userId
    const shop = await Shop.findOne({ userId })
    const { orderId, status } = req.body

    const order = await Order.findOneAndUpdate(
        { _id: orderId, shopId: shop._id, status: 'Pending' },
        { status },
        { new: true, runValidator: true },
    )

    if (!order) {
        return res
            .status(StatusCodes.NOT_FOUND)
            .json({ error: 'Order not found or already processed.' })
    }

    if (status === 'Rejected' && order.paymentMethod === 'paypal') {
        const refundDetails = {
            amount: {
                total: order.refundAmount,
                currency: 'USD',
            },
        }
        paypal.sale.refund(order.paymentId, refundDetails, (error, refund) => {
            if (error) {
                console.error('Error refunding payment:', error.response)
            } else {
                console.log('Refund successful:', refund)
            }
        })
    }

    if (status === 'Accepted') {
        for (const product of order.products) {
            await ProductOption.findOneAndUpdate(
                { _id: product.optionProductId },
                { $inc: { optionQuantity: -product.quantity } },
                { new: true, runValidator: true },
            )
        }
    }

    res.status(StatusCodes.CREATED).json(order)
}

module.exports = {
    getAllOrdersShop,
    updateOrderStatus,
}
