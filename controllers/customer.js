const { StatusCodes } = require('http-status-codes')
const { Customer } = require('../models')

const updateUserInfo = async (req, res) => {
    const userId = req.user.userId
    const { name, phone, mail, dob, sex } = req.body
    console.log(userId)

    const customerInfo = await Customer.findOneAndUpdate(
        { _id: userId },
        { name, phone, mail, dob, sex },
        { new: true, runValidator: true },
    )
    console.log(customerInfo)
    res.status(StatusCodes.CREATED).json(customerInfo)
}

module.exports = {
    updateUserInfo,
}
