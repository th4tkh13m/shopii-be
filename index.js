require('express-async-errors')
require('dotenv').config()
const express = require('express')
const connectDB = require('./utils/connectDB')
const cors = require('cors')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')

// import middlewares
const errorHandler = require('./middlewares/errorHandler')
const notFound = require('./middlewares/notFound')
const {
    authRouter,
    shopRequestRouter,
    adminRouter,
    shopRoute,
    addressRouter,
    categoryRouter,
    shopRouter,
    cartRouter,
} = require('./routes')
const {
    verifyAdmin,
    verifyUser,
    verifyShop,
} = require('./middlewares/authenticateToken')

const app = express()
const PORT = process.env.PORT || 5001

// middlewares
app.use(morgan('dev'))
app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(express.json())
app.use(cookieParser())

// routes
app.use('/auth', authRouter)
app.use('/shop', verifyShop, shopRoute)
app.use('/shop-request', verifyUser, shopRequestRouter)
app.use('/address', verifyUser, addressRouter)
app.use('/admin', verifyAdmin, adminRouter)
app.use('/category', categoryRouter)
app.use('/shop', verifyShop, shopRouter)
app.use('/cart', verifyUser, cartRouter)

// error handler
app.use(notFound)
app.use(errorHandler)

const start = async () => {
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`)
    })
    await connectDB()
}

start()
