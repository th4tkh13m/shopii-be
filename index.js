require('express-async-errors')
require('dotenv').config()
const express = require('express')
const connectDB = require('./utils/connectDB')
const cors = require('cors')
const morgan = require('morgan')

// import middlewares
const errorHandler = require('./middlewares/errorHandler')
const notFound = require('./middlewares/notFound')
const {
    authRouter,
    addressRouter,
    shopRequestRouter,
    adminRouter,
} = require('./routes')

const app = express()
const PORT = process.env.PORT || 5001

// middlewares
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

// routes
app.use('/auth', authRouter)
app.use('/address', addressRouter)
app.use('/shop-request', shopRequestRouter)
app.use('/admin', adminRouter)

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
