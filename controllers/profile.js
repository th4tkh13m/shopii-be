const Customer = require('../models/Customer');

// Update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, mail, phone, sex } = req.body;

    // Update the user profile
    const updatedUser = await Customer.findByIdAndUpdate(
      id,
      { name, mail, phone, sex },
      { new: true }
    );

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
