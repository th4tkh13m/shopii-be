const { StatusCodes } = require('http-status-codes')
const { createCustomError } = require('../errors/CustomError')
const { Shop } = require('../models')

const getAllShopInfo = async (req, res) => {
    const userId = req.user.userId
    const shopInfo = await Shop.findOne({ userId })
    res.status(StatusCodes.OK).json(shopInfo)
}
const updateShop = async (req, res) => {
    const userId = req.user.userId
    const updateFields = req.body

    const shopInfo = await Shop.findOneAndUpdate(
        { userId },
        { ...updateFields },
        { new: true, runValidator: true },
    )
    res.status(StatusCodes.CREATED).json(shopInfo)
}

module.exports = {
    getAllShopInfo,
    updateShop,
}
