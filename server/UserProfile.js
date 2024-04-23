const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userProfileSchema = new Schema({
  userID: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  bio: { type: String },
  profilePicture: { type: String }, // URL or path to image file
  wishlistID: { type: Schema.Types.ObjectId, ref: 'UserWishlist' },
  interestID: { type: Schema.Types.ObjectId, ref: 'UserInterest' },
  eventID: { type: Schema.Types.ObjectId, ref: 'Event' },
  budgetID: { type: Schema.Types.ObjectId, ref: 'Budget' },
  deadlineID: { type: Schema.Types.ObjectId, ref: 'Deadline' }
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);
module.exports = UserProfile;