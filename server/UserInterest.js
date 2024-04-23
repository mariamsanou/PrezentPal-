const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userInterestSchema = new Schema({
  userID: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  interestName: { type: String, required: true }
});

const UserInterest = mongoose.model('UserInterest', userInterestSchema);
module.exports = UserInterest;