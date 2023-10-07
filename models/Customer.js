const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const CustomerSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    phone: {
        type: String,
    },
    mail: {
        type: String,
    },
    dob: {
        type: String,
    },
    sex: {
        type: Number,
    },
    password: {
        type: String,
    },
    securityCode: {
        type: String,
    },
    hasShop: {
        type: Boolean,
        default: false,
    },
})

CustomerSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

CustomerSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

module.exports = mongoose.model('Customer', CustomerSchema)
