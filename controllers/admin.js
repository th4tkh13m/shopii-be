const { StatusCodes } = require('http-status-codes')
const { ShopRequest, Shop, Customer } = require('../models/index')
const { createCustomError } = require('../errors/CustomError')

const getRequestByStatus = async (req, res) => {
    const status = req.query.status
    let request = null
    if (status === 'All') {
        request = await ShopRequest.find()
    } else {
        request = await ShopRequest.find({ status })
    }
    if (request.length === 0) {
        throw createCustomError('Không có yêu cầu nào.', StatusCodes.NOT_FOUND)
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
        await ShopRequest.findOneAndUpdate(
            { userId, status: 'Pending' },
            { status },
        )
    }

    if (status === 'Accepted') {
        const { name, address, description } = request
        const shop = await Shop.create({
            shopName: name,
            shopAddress: address,
            shopDescription: description,
            userId,
        })
        const updateCustomer = await Customer.findByIdAndUpdate(
            { _id: userId },
            { hasShop: true },
        )
        return res.status(StatusCodes.OK).json({
            msg: 'Đã chấp nhận.',
            shop,
            updateCustomer,
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
