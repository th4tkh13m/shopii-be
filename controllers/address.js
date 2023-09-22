const { Address } = require('../models//index')
const { StatusCodes } = require('http-status-codes')
const { createCustomError} = require('../errors//CustomError')

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

  const existingAddress = await Address.findOne({
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

  const address = new Address({
    userId,
    receiverAddress,
    receiverName,
    receiverPhone,
    province,
    ward,
    district,
    isDefault: !addresses.length, // If no addresses, set isDefault to true
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
  const { userId, addressId } = req.params;

  // Check if userId is provided, if so, retrieve addresses by userId
  if (userId) {
    const addresses = await Address.find({ userId });

    if (!addresses || addresses.length === 0) {
      return createCustomError("Không tìm thấy địa chỉ cho người dùng này.", StatusCodes.NOT_FOUND);
    }

    return res.status(StatusCodes.OK).json(addresses);
  }

  // Check if addressId is provided, if so, retrieve an address by addressId
  if (addressId) {
    const address = await Address.findOne({ _id: addressId, userId });

    if (!address) {
      return createCustomError("Không tìm thấy địa chỉ này.", StatusCodes.NOT_FOUND);
    }

    return res.status(StatusCodes.OK).json(address);
  }

  // If neither userId nor addressId is provided, return an error
  return createCustomError("Vui lòng cung cấp thông tin hợp lệ.", StatusCodes.BAD_REQUEST);
};


const editAddress = async (req, res, next) => {
  const { userId, addressId } = req.params
  const updatedFields = req.body

  // Check if the address exists for the specified user
  const existingAddress = await Address.findOne({ _id: addressId, userId })

  if (!existingAddress) {
    return createCustomError(
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

const deleteAddress = async (req, res, next) => {
  const { userId, addressId } = req.params

  // Check if the address exists
  const existingAddress = await Address.findOne({ _id: addressId, userId })

  if (!existingAddress) {
    return createCustomError(
      'Không tìm thấy địa chỉ cho người dùng này.',
      StatusCodes.NOT_FOUND,
    )
  }

  // Delete the address
  await Address.findByIdAndDelete({ _id: addressId, userId })

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
