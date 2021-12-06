const mongoose = require("mongoose");
const { LOGSETTINGS: defaults } = require("../config.js");

let logsSchema = new mongoose.Schema({
  guildID: String,
  ticketlog: Boolean,
  logchannel: String,
})

module.exports = mongoose.model("Logs", logsSchema);