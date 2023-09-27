const { Address } = require('../models//index')
const { StatusCodes } = require('http-status-codes')
const { createCustomError } = require('../errors/CustomError')

const createAddress = async (req, res) => {
    const {
        userId,
        receiverAddress,
        receiverName,
        receiverPhone,
        province,
        ward,
        district,
    } = req.body

    // Check if the address already exists for the user
    const existingAddress = await Address.findOne({
        userId,
        receiverAddress,
        receiverName,
        receiverPhone,
        province,
        ward,
        district,
    })

    if (existingAddress) {
        throw createCustomError('Địa chỉ đã tồn tại', StatusCodes.BAD_REQUEST)
    }

    const addresses = await Address.find({ userId })

    // Set isDefault to true if it's the first address, otherwise false
    const isDefault = addresses.length === 0 ? true : false

    const address = new Address({
        userId,
        receiverAddress,
        receiverName,
        receiverPhone,
        province,
        ward,
        district,
        isDefault,
    })

    const savedAddress = await address.save()

    if (!savedAddress) {
        throw createCustomError(
            'Có sự cố khi lưu địa chỉ.',
            StatusCodes.INTERNAL_SERVER_ERROR,
        )
    }

    res.status(StatusCodes.CREATED).json(savedAddress)
}

const getAddress = async (req, res) => {
    const { userId } = req.params

    // Check if userId is provided, if so, retrieve addresses by userId
    if (userId) {
        const addresses = await Address.find({ userId })

        res.status(StatusCodes.OK).json(addresses)
    } else {
        // If userId is not provided, return an empty array
        res.status(StatusCodes.OK).json([])
    }
}

const editAddress = async (req, res) => {
    const { userId, addressId } = req.params
    const updatedFields = req.body

    // Check if the address exists for the specified user
    const existingAddress = await Address.findOne({ _id: addressId, userId })

    if (!existingAddress) {
        throw createCustomError(
            'Không tìm thấy địa chỉ cho người dùng này.',
            StatusCodes.NOT_FOUND,
        )
    }

    if (
        updatedFields.isDefault &&
        updatedFields.isDefault !== existingAddress.isDefault
    ) {
        // Disable the previous default address for the user
        await Address.updateMany({ userId }, { $set: { isDefault: false } })
    }

    // Update the address
    const updatedAddress = await Address.findByIdAndUpdate(
        { _id: addressId, userId },
        { ...updatedFields },
        { new: true, runValidators: true },
    )

    if (!updatedAddress) {
        throw createCustomError(
            'Có sự cố khi cập nhật địa chỉ.',
            StatusCodes.INTERNAL_SERVER_ERROR,
        )
    }

    res.status(StatusCodes.OK).json({
        message: 'Địa chỉ đã được cập nhật thành công.',
        success: true,
    })
}

const deleteAddress = async (req, res) => {
    const { userId, addressId } = req.params

    // Check if the address exists
    const existingAddress = await Address.findOne({ _id: addressId, userId })

    if (!existingAddress) {
        throw createCustomError(
            'Không tìm thấy địa chỉ cho người dùng này.',
            StatusCodes.NOT_FOUND,
        )
    }

    const isDefault = existingAddress.isDefault

    // Delete the address
    await Address.findByIdAndDelete({ _id: addressId, userId })

    // If the deleted address was the default, select another address as the new default
    if (isDefault) {
        const addresses = await Address.find({ userId })
        if (addresses.length > 0) {
            // Select the first address as the new default
            const newDefaultAddress = addresses[0]
            newDefaultAddress.isDefault = true
            await newDefaultAddress.save()
        }
    }

    res.status(StatusCodes.OK).json({
        message: 'Địa chỉ đã được xóa thành công.',
        success: true,
    })
}

module.exports = {
    createAddress,
    getAddress,
    deleteAddress,
    editAddress,
}
