const authRouter = require('./auth')
const shopRequestRouter = require('./shopRequest')
const adminRouter = require('./admin')
const addressRouter = require('./address')
const categoryRouter = require('./category')
const shopRouter = require('./shop')

module.exports = {
    authRouter,
    shopRequestRouter,
    adminRouter,
    addressRouter,
    categoryRouter,
    shopRouter,
}
