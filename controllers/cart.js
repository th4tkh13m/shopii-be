const { StatusCodes } = require('http-status-codes')
const { Cart } = require('../models')
const { createCustomError } = require('../errors/CustomError')

const viewCartByUserId = async (req, res) => {
    const userId = req.user.userId
    const cart = await Cart.find({ userId })
        .populate({
            path: 'products.product',
            select: 'id shopId productName productCategory productImages',
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
    const cart = await Cart.findOne({ userId })
    const newProduct = {
        product: productId,
        productOption: productOptionId,
        quantity: quantity || 1,
    }

    if (cart) {
        const existingProductIndex = cart.products.findIndex(
            item =>
                item.product.equals(productId) &&
                item.productOption.equals(productOptionId),
        )

        if (existingProductIndex !== -1) {
            if (quantity !== undefined) {
                cart.products[existingProductIndex].quantity += quantity
            } else {
                cart.products[existingProductIndex].quantity += 1
            }
        } else {
            cart.products.push(newProduct)
        }

        await cart.save()
        res.status(StatusCodes.OK).json(cart)
    } else {
        const newCart = await Cart.create({
            userId,
            products: [newProduct],
        })
        res.status(StatusCodes.OK).json(newCart)
    }
}

const updateCartProduct = async (req, res) => {
    const userId = req.user.userId
    const { productId, productOptionId, quantity, newProductOptionId } =
        req.body
    const cart = await Cart.findOne({ userId })

    const existingProductIndex = cart.products.findIndex(
        item =>
            item.product.equals(productId) &&
            item.productOption.equals(productOptionId),
    )
    if (existingProductIndex !== -1) {
        if (quantity !== undefined) {
            cart.products[existingProductIndex].quantity = quantity
        }

        if (newProductOptionId) {
            cart.products[existingProductIndex].productOption =
                newProductOptionId
        }

        await cart.save()
        res.status(StatusCodes.OK).json(cart)
    } else {
        throw createCustomError(
            'Không tìm thấy sản phẩm',
            StatusCodes.NOT_FOUND,
        )
    }
}

const deleteCartProduct = async (req, res) => {
    const userId = req.user.userId
    const { productId, productOptionId } = req.body
    const cart = await Cart.findOne({ userId })

    const existingProductIndex = cart.products.findIndex(
        item =>
            item.product.equals(productId) &&
            item.productOption.equals(productOptionId),
    )

    if (existingProductIndex !== -1) {
        cart.products.splice(existingProductIndex, 1)
        await cart.save()
        res.status(StatusCodes.OK).json(cart)
    } else {
        throw createCustomError(
            'Không tìm thấy sản phẩm',
            StatusCodes.NOT_FOUND,
        )
    }
}

const deleteAllProductFromCart = async (req, res) => {
    const userId = req.user.userId

    await Cart.deleteOne({ userId })
    res.status(StatusCodes.OK).json({ message: 'Xóa sản phẩm thành công.' })
}

module.exports = {
    viewCartByUserId,
    addToCart,
    updateCartProduct,
    deleteCartProduct,
    deleteAllProductFromCart,
}
