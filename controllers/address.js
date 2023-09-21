const { Address } = require('../models//index');
const { StatusCodes } = require('http-status-codes');

const createAddress = async (req, res) => {
  const { userId, receiverAddress, receiverName, receiverPhone, province, ward, district } = req.body;

  const existingAddress = await Address.findOne({ receiverAddress, receiverName, receiverPhone, province, ward, district });

  if (existingAddress) {
    throw createCustomError("Địa chỉ đã tồn tại", StatusCodes.BAD_REQUEST);
  }

  const addresses = await Address.find({ userId });

  const address = new Address({
    userId,
    receiverAddress,
    receiverName,
    receiverPhone,
    province,
    ward,
    district,
    isDefault: !addresses.length, // If no addresses, set isDefault to true
  });

  const savedAddress = await address.save();

  if (!savedAddress) {
    throw createCustomError("Có sự cố khi lưu địa chỉ.", StatusCodes.INTERNAL_SERVER_ERROR);
  }

  res.status(StatusCodes.CREATED).json(savedAddress);
};

const getAddress = async (req, res) => {
  const { userId } = req.params;
  const addresses = await Address.find({ userId });

  if (!addresses || addresses.length === 0) {
    throw createCustomError("Không tìm thấy địa chỉ cho người dùng này.", StatusCodes.NOT_FOUND);
  }

  res.status(StatusCodes.OK).json(addresses);
};

module.exports = {
  createAddress,
  getAddress,
};
