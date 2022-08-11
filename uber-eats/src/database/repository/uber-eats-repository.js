const { APIError, BadRequestError, STATUS_CODES } = require('../../utils/app-errors')

//Dealing with data base operations
class UberEatsRepository {

    async Create({ email, password, phone, salt }) {
        try {
            return {}
        } catch (err) {
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Create Customer')
        }
    }


    async Find({ email }) {
        try {
            // return await CustomerModel.findOne({ email });
        } catch (err) {
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Find Customer')
        }
    }

    async FindById({ id }) {

        try {
            // return await CustomerModel.findById(id);
        } catch (err) {
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Find Customer');
        }
    }

    async Wishlist(customerId) {
        try {
            // return await CustomerModel.findById(customerId).populate('wishlist');
        } catch (err) {
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Get Wishlist ')
        }
    }

    async AddWishlistItem(customerId, { _id, name, desc, price, available, banner }) {

        try {
            // return await CustomerModel.findByIdAndUpdate(customerId, { $push: { wishlist: { _id, name, desc, price, available, banner } } }, { new: true });

        } catch (err) {
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Add to WishList')
        }

    }

}

module.exports = UberEatsRepository;