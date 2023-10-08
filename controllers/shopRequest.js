const { StatusCodes } = require('http-status-codes')
const { ShopRequest } = require('../models/index')
const { createCustomError } = require('../errors/CustomError')

const shopRegister = async (req, res) => {
    const { userId, name, address, description } = req.body
    const existingPendingRequest = await ShopRequest.findOne({
        userId,
        status: 'Pending',
    })

    if (existingPendingRequest) {
        throw createCustomError(
            'Yêu cầu tạo cửa hàng của bạn đang được xử lý. Vui lòng chờ phản hồi',
            StatusCodes.BAD_REQUEST,
        )
    }

    const shopRequest = await ShopRequest.create({
        userId,
        name,
        address,
        description,
    })
    res.status(StatusCodes.CREATED).json({
        ...shopRequest.toObject(),
    })
}

const getAllRequestByUserId = async (req, res) => {
    const shopRequests = await ShopRequest.find({ userId: req.params.userId })
    if (shopRequests.length === 0) {
        throw createCustomError(
            'No shop requests found for this customer',
            StatusCodes.NOT_FOUND,
        )
    }
    res.status(StatusCodes.OK).json(shopRequests)
}

module.exports = {
    shopRegister,
    getAllRequestByUserId,
}
