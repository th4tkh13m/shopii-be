const { StatusCodes } = require('http-status-codes')
const { createCustomError } = require('../errors/CustomError')
const { Category } = require('../models')

const getAllCategory = async (req, res) => {
    const categories = await Category.find({})
    res.status(StatusCodes.OK).json(categories)
}
const createCategory = async (req, res) => {
    const { categoryName, imgLink } = req.body
    const existingCategory = await Category.findOne({ categoryName })
    if (existingCategory) {
        throw createCustomError(
            'Loại mặt hàng này đã tồn tại',
            StatusCodes.BAD_REQUEST,
        )
    }

    const createCategory = await Category.create({
        categoryName,
        imgLink,
    })
    res.status(StatusCodes.OK).json(createCategory)
}

module.exports = {
    getAllCategory,
    createCategory,
}
