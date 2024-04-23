
const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
    item_name: String,
    item_desc: String,
    item_price: Number,
    item_link: String
});

const Item = mongoose.model("Item", ItemSchema);

module.exports = Item;