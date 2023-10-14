const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema(
    {
        productName: {
            type: String,
            required: true,
        },
        productCategory: {
            type: mongoose.Types.ObjectId,
            ref: 'Category',
        },
        productDescription: {
            type: String,
        },
        productOptions: {
            type: [mongoose.Types.ObjectId],
            ref: 'ProductOption',
            required: true,
        },
        productImages: [String],
    },
    { timestamps: true },
)

module.exports = mongoose.model('Product', ProductSchema)
