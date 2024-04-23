const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  email:  String,
  eventName:  String,
  startDate:  Date,
  endDate: Date,
  budget:  Number,
  bio: String,
  friendsEmails: [String]
  
});

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
