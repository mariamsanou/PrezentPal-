const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  itemName: { type: String, required: true },
  interestID: { type: Schema.Types.ObjectId, ref: 'UserInterest', required: true }, // assuming interests are tracked in another collection
  itemDescription: { type: String, required: true }
});

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;