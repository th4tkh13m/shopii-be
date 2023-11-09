const authRouter = require('./auth')
const shopRequestRouter = require('./shopRequest')
const adminRouter = require('./admin')
const addressRouter = require('./address')
const categoryRouter = require('./category')
const productRouter = require('./products')
const shopRouter = require('./shop')
const cartRouter = require('./cart')
const orderRouter = require('./order')
const customerRouter = require('./customer')

module.exports = {
    authRouter,
    shopRequestRouter,
    adminRouter,
    addressRouter,
    categoryRouter,
    productRouter,
    shopRouter,
    cartRouter,
    orderRouter,
    customerRouter,
}
