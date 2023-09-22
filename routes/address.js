const express = require('express')
const {
    createAddress,
    getAddress,
    deleteAddress,
    editAddress,
} = require('../controllers/address')
const router = express.Router()

router.route('/').post(createAddress)
router.route('/:userId').get(getAddress)
router.route('/:userId/:addressId').patch(editAddress).delete(deleteAddress).get(getAddress)

module.exports = router
