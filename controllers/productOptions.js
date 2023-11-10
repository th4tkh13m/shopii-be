const { StatusCodes } = require('http-status-codes')
const { ProductOption } = require('../models')

const deleteAllProductOptions = async (req, res) => {
    await ProductOption.deleteMany()
    res.status(StatusCodes.OK).json({ message: 'Deleted all products options' })
}
const createProductOption = async (req, res) => {
    const { optionName, optionPrice, optionQuantity } = req.body

    const createOption = await ProductOption.create({
        optionName,
        optionPrice,
        optionQuantity,
    })

    res.status(StatusCodes.OK).json(createOption)
}
module.exports = {
    deleteAllProductOptions,
    createProductOption,
}
