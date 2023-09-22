const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    receiverAddress: {
        type: String,
        required: true,
    },
    receiverName: {
        type: String,
        required: true,
    },
    receiverPhone: {
        type: String,
        required: true,
    },
    province: {
        type: String,
        required: true,
    },
    ward: {
        type: String,
        required: true,
    },
    district: {
        type: String,
        required: true,
    },
    isDefault: {
        type: Boolean,
        default: false,
    },
})

module.exports = mongoose.model('Address', addressSchema)
