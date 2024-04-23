
const mongoose = require("mongoose");

const UserPairSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    pairFirstName: String,
    pairLastName: String

});

const UserPair = mongoose.model("UserPair", UserPairSchema);

module.exports = UserPair;