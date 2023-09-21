const { Address } = require('../models//index');
const { StatusCodes } = require('http-status-codes');

const createAddress = async (req, res) => {
  const { userId, receiverAddress, receiverName, receiverPhone, province, ward, district } = req.body;

  const existingAddress = await Address.findOne({ receiverAddress, receiverName, receiverPhone, province, ward, district });

  if (existingAddress) {
    throw { statusCode: StatusCodes.BAD_REQUEST, message: "Địa chỉ đã tồn tại" };
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
    throw { statusCode: StatusCodes.INTERNAL_SERVER_ERROR, message: "Có sự cố khi lưu địa chỉ." };
  }

  res.status(StatusCodes.CREATED).json(savedAddress);
};

const getAddress = async (req, res) => {
  const { userId } = req.params;
  const addresses = await Address.find({ userId });

  if (!addresses || addresses.length === 0) {
    throw { statusCode: StatusCodes.NOT_FOUND, message: "Có sự cố khi lưu địa chỉ." };
  }

  res.status(StatusCodes.OK).json(addresses);
};

module.exports = {
  createAddress,
  getAddress,
};
