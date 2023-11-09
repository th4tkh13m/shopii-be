const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'Customer',
    },
    cart: [
        {
            shopId: {
                type: mongoose.Types.ObjectId,
                ref: 'Shop',
            },
            products: [
                {
                    product: {
                        type: mongoose.Types.ObjectId,
                        ref: 'Product',
                    },
                    productOption: {
                        type: mongoose.Types.ObjectId,
                        ref: 'ProductOption',
                    },
                    quantity: {
                        type: Number,
                    },
                },
            ],
        },
    ],
})

module.exports = mongoose.model('Cart', CartSchema)
