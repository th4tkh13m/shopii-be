const { register, login } = require('./auth')
const { getAllRequestByUserId, shopRegister } = require('./shopRequest')

module.exports = {
    register,
    login,
    getAllRequestByUserId,
    shopRegister,
}
