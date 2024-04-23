const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userWishlistSchema = new Schema({
  profileID: { type: Schema.Types.ObjectId, ref: 'UserProfile', required: true },
  itemID: { type: Schema.Types.ObjectId, ref: 'Item', required: true }
});

const UserWishlist = mongoose.model('UserWishlist', userWishlistSchema);
module.exports = UserWishlist;