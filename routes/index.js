const authRouter = require('./auth')
const shopRequestRouter = require('./shopRequest')
const adminRouter = require('./admin')
const addressRouter = require('./address')
const categoryRouter = require('./category')
const shopRouter = require('./shop')
const productRouter = require('./products')
const cartRouter = require('./cart')

module.exports = {
    authRouter,
    shopRequestRouter,
    adminRouter,
    addressRouter,
    categoryRouter,
    shopRouter,
    productRouter,
    cartRouter,
}
