const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userProfileSchema = new Schema({
  userID: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  bio: { type: String },
  profilePicture: { type: String }, // URL or path to image file
  interestID: { type: [mongoose.Schema.Types.ObjectId], ref: 'UserInterest', default: [] }
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);
module.exports = UserProfile;