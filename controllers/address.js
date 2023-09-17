const { Address } = require('../models/Address')

const createAddress = async (req, res) => {
  const { userId, receiverAddress, receiverName, receiverPhone, province, ward, district } = req.body;

  const existingAddress = await Address.findOne({ receiverAddress, receiverName, receiverPhone, province, ward, district });

  if (existingAddress) {
    return res.status(400).json({ error: "Address already exists" });
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
    return res.status(500).json({ error: "There was an issue saving the address." });
  }

  res.json(savedAddress);
};

const getAddress = async (req, res) => {
  const { userId } = req.params;
  const addresses = await Address.find({ userId });

  if (!addresses) {
    return res.status(404).json({ error: "No addresses found for this user." });
  }

  res.json(addresses);
};

module.exports = {
  createAddress,
  getAddress
}