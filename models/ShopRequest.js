const mongoose = require('mongoose');

const ShopRequestSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'Customers'
    },
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected"],
        default: "Pending",
    },
}, { timestamps: true });

module.exports = mongoose.model('ShopRequest', ShopRequestSchema);