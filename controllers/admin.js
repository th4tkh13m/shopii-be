const { StatusCodes } = require('http-status-codes')
const { ShopRequest, Shop } = require('../models/index')
const { createCustomError } = require('../errors/CustomError')

const getRequestByStatus = async (req, res) => {
    const request = await ShopRequest.find({ status: req.params.status })
    if (request.length == 0) {
        const customError = createCustomError(
            'Không có yêu cầu nào.',
            StatusCodes.NOT_FOUND,
        )
        throw customError
    }
    res.status(StatusCodes.OK).json(request)
}
const handleShopRequest = async (req, res) => {
    const { userId, status } = req.body
    const request = await ShopRequest.findOne({
        userId,
        status: 'Pending',
    })
    if (!request) {
        throw createCustomError('Không có yêu cầu nào.', StatusCodes.NOT_FOUND)
    }
    if (['Accepted', 'Rejected'].includes(status)) {
        await ShopRequest.findOneAndUpdate({ userId }, { status })
    }

    if (status == 'Accepted') {
        const { name, address, description } = request
        const shop = await Shop.create({
            shopName: name,
            shopAddress: address,
            shopDescription: description,
            userId,
        })
        return res.status(StatusCodes.OK).json({
            msg: 'Đã chấp nhận.',
            shop,
        })
    }
    res.status(StatusCodes.OK).json({
        msg: 'Đã từ chối',
    })
}
module.exports = {
    getRequestByStatus,
    handleShopRequest,
}
