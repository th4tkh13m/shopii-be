const { StatusCodes } = require('http-status-codes')
const { Cart } = require('../models')
const { createCustomError } = require('../errors/CustomError')

const viewCartByUserId = async (req, res) => {
    const userId = req.user.userId
    const cart = await Cart.find({ userId })
        .populate({
            path: 'cart.products.product',
            select: 'id productName productCategory productImages',
            populate: {
                path: 'productCategory',
                select: 'id categoryName',
            },
        })
        .populate({
            path: 'cart.products.productOption',
            select: 'id optionName optionPrice',
        })
        .populate('cart.shopId', 'id')
        .exec()

    res.status(StatusCodes.OK).json(cart)
}

const addToCart = async (req, res) => {
    const userId = req.user.userId
    const { shopId, productId, productOptionId, quantity } = req.body
    const userCart = await Cart.findOne({ userId })
    const newProduct = {
        product: productId,
        productOption: productOptionId,
        quantity: quantity || 1,
    }

    if (userCart) {
        const existingShop = userCart.cart.find(item =>
            item.shopId.equals(shopId),
        )
        if (existingShop) {
            const existingProductIndex = existingShop.products.findIndex(
                product =>
                    product.product?.equals(productId) &&
                    product.productOption?.equals(productOptionId),
            )
            if (existingProductIndex !== -1) {
                const existingProduct =
                    existingShop.products[existingProductIndex]

                if (quantity !== undefined) {
                    existingProduct.quantity += quantity
                } else {
                    existingProduct.quantity += 1
                }
            } else {
                existingShop.products.push(newProduct)
            }
        } else {
            userCart.cart.push({
                shopId,
                products: [newProduct],
            })
        }

        await userCart.save()
        res.status(StatusCodes.OK).json(userCart)
    } else {
        const newCart = await Cart.create({
            userId,
            cart: [
                {
                    shopId,
                    products: [newProduct],
                },
            ],
        })
        res.status(StatusCodes.OK).json(newCart)
    }
}

const updateCartProduct = async (req, res) => {
    const userId = req.user.userId
    const { shopId, productId, productOptionId, quantity, newProductOptionId } =
        req.body
    const userCart = await Cart.findOne({ userId })

    const existingShop = userCart.cart.find(item => item.shopId.equals(shopId))

    if (existingShop) {
        const existingProductIndex = existingShop.products.findIndex(
            item =>
                item.product?.equals(productId) &&
                item.productOption?.equals(productOptionId),
        )
        if (existingProductIndex !== -1) {
            if (quantity !== undefined) {
                existingShop.products[existingProductIndex].quantity = quantity
            }

            if (newProductOptionId) {
                existingShop.products[existingProductIndex].productOption =
                    newProductOptionId
            }

            await userCart.save()
            res.status(StatusCodes.OK).json(userCart)
        } else {
            throw createCustomError(
                'Không tìm thấy sản phẩm',
                StatusCodes.NOT_FOUND,
            )
        }
    }
    throw createCustomError(
        'Không tìm thấy sản phẩm trong giỏ hàng',
        StatusCodes.NOT_FOUND,
    )
}

const deleteCartProduct = async (req, res) => {
    const userId = req.user.userId
    const { shopId, productId, productOptionId } = req.body
    const userCart = await Cart.findOne({ userId })

    const existingShop = userCart.cart.find(item => item.shopId.equals(shopId))

    if (existingShop) {
        const existingProductIndex = existingShop.products.findIndex(
            product =>
                product.product.equals(productId) &&
                product.productOption.equals(productOptionId),
        )
        if (existingProductIndex !== -1) {
            existingShop.products.splice(existingProductIndex, 1)
            await userCart.save()
            res.status(StatusCodes.OK).json(userCart)
        } else {
            throw createCustomError(
                'Không tìm thấy sản phẩm',
                StatusCodes.NOT_FOUND,
            )
        }
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
