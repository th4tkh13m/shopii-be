const authRouter = require('./auth')
const shopRequestRouter = require('./shopRequest')
const productRouter = require('./product')
const adminRouter = require('./admin')
const addressRouter = require('./address')
const categoryRouter = require('./category')

module.exports = {
    authRouter,
    shopRequestRouter,
    adminRouter,
    productRouter,
    addressRouter,
    categoryRouter,
}
