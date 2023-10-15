const mongoose = require('mongoose')

const ProductOptionSchema = new mongoose.Schema({
    optionName: {
        type: String,
        required: true,
    },
    optionPrice: {
        type: Number,
        required: true,
    },
    optionQuantity: {
        type: Number,
        default: 1,
        min: 0,
    },
})

module.exports = mongoose.model('ProductOption', ProductOptionSchema)
