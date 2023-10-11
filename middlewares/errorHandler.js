const { StatusCodes } = require('http-status-codes')
const { CustomError } = require('../errors/CustomError')

const errorHandler = (err, req, res, next) => {
    const customError = {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        msg: 'Something went wrong, please try again later',
    }

    if (err instanceof CustomError) {
        customError.msg = err.message
        customError.statusCode = err.statusCode
    }

    res.status(customError.statusCode).json({ msg: customError.msg })
}

module.exports = errorHandler
