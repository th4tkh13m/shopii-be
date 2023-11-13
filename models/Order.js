const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            ref: 'Customer',
        },
        shopId: {
            type: mongoose.Types.ObjectId,
            ref: 'Shop',
        },
        addressId: {
            type: mongoose.Types.ObjectId,
            ref: 'Address',
            required: true,
        },
        products: [
            {
                productId: {
                    type: mongoose.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                },
                optionProductId: {
                    type: mongoose.Types.ObjectId,
                    ref: 'ProductOption',
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
            },
        ],
        totalPrice: {
            type: Number,
        },
        paymentMethod: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ['Pending', 'Accepted', 'Rejected'],
            default: 'Pending',
        },
        deliveryMethod: {
            type: String,
        },
        deliveryPrice: {
            type: Number,
        },
        totalProductPrice: {
            type: Number,
        },
        paymentId: {
            type: String,
        },
        refundAmount: {
            type: Number,
        }
    },
    { timestamps: true },
)

OrderSchema.pre('save', async function (next) {
    // If the products are not populated, you need to populate them to get the optionPrice
    await this.populate({
        path: 'products',
        populate: {
            path: 'optionProductId',
            model: 'ProductOption', // Make sure this is the correct model name for your ProductOption
        },
    })

    const totalProductPrice = this.products.reduce((acc, cur) => {
        // Ensure that optionProductId is populated with the required optionPrice
        if (cur.optionProductId && cur.optionProductId.optionPrice) {
            return acc + cur.quantity * cur.optionProductId.optionPrice
        }
        return acc
    }, 0)

    this.totalProductPrice = totalProductPrice
    this.totalPrice = totalProductPrice + this.deliveryPrice
    next()
})

module.exports = mongoose.model('Order', OrderSchema)
