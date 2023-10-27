const authRouter = require('./auth')
const shopRequestRouter = require('./shopRequest')
const shopRoute = require('./shop')
const adminRouter = require('./admin')
const addressRouter = require('./address')
const categoryRouter = require('./category')
const shopRouter = require('./shop')
const cartRouter = require('./cart')

module.exports = {
    authRouter,
    shopRequestRouter,
    adminRouter,
    shopRoute,
    addressRouter,
    categoryRouter,
    shopRouter,
    cartRouter,
}
