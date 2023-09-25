const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    productPrice: {
        type: Number,
        required: true,
        min: 0
    },
    productQuantity: {
        type: Number,
        default: 1,
        min: 0
    },
    productCategory: {
        type: mongoose.Types.ObjectId,
        ref: "Category"
    },
    productDescription: {
        type: String,
    },
    productImages: [String],
}, { timestamps: true })

module.exports = mongoose.model("Product", ProductSchema);