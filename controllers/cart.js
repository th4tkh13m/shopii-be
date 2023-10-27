const { StatusCodes } = require('http-status-codes')
const { Cart } = require('../models')

const viewCartByUserId = async (req, res) => {
    const userId = req.user.userId
    const cart = await Cart.find({ userId })
        .populate({
            path: 'products.product',
            select: 'id productName productCategory productImages',
            populate: {
                path: 'productCategory',
                select: 'id name',
            },
        })
        .populate({
            path: 'products.productOption',
            select: 'id optionPrice',
        })
        .exec()

    res.status(StatusCodes.OK).json(cart)
}
const addToCart = async (req, res) => {
    const userId = req.user.userId
    const { productId, productOptionId, quantity } = req.body
    const existingCartItem = await Cart.findOne({
        userId,
        'products.product': productId,
        'products.productOption': productOptionId,
    })

    if (existingCartItem) {
        if (quantity !== undefined) {
            existingCartItem.products[0].quantity += quantity
        } else {
            existingCartItem.products[0].quantity += 1
        }

        await existingCartItem.save()
        res.status(StatusCodes.OK).json(existingCartItem)
    } else {
        const cart = await Cart.create({
            userId,
            products: [
                {
                    product: productId,
                    productOption: productOptionId,
                    quantity: quantity || 1,
                },
            ],
        })
        res.status(StatusCodes.OK).json(cart)
    }
}
module.exports = {
    viewCartByUserId,
    addToCart,
}
