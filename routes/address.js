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
<<<<<<< HEAD
router
    .route('/:userId/:addressId')
    .patch(editAddress)
    .delete(deleteAddress)
    
module.exports = router
=======
router.route('/:userId/:addressId').patch(editAddress).delete(deleteAddress).get(getAddress)

module.exports = router
>>>>>>> parent of a91e7f5 (fix[SP-010]: fix code and prettier)
