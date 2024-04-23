
const mongoose = require("mongoose");

const WishlistSchema = new mongoose.Schema({
    //user: String,
    items: [WishlistItemSchema]
});

const Wishlist = mongoose.model('Wishlist', WishlistSchema);

module.exports = Wishlist;