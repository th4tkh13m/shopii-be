const mongoose = require('mongoose');

const ShopSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "Customer"
    },
    shopName: {
        type: String,
        required: true,
    },
    shopAddress: {
        type: String,
        required: true,
    },
    shopDescription: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: false,
    },
    products: [{
        type: mongoose.Types.ObjectId,
        ref: "Product"
    }],
}, { timestamps: true })

module.exports = mongoose.model("Shop", ShopSchema);