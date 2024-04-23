
const mongoose = require("mongoose");

const UserPairSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    pairFirstName: String,
    pairLastName: String

});

const UserPair = mongoose.model("UserPair", UserPairSchema);

module.exports = UserPair;