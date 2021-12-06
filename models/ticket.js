const mongoose = require("mongoose");
const { GUILDSETTINGS: defaults } = require("../config.js");

const ticketSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  guildID: String,
  userID: String,
  ticketID: String
});

module.exports = mongoose.model("Ticket", ticketSchema);