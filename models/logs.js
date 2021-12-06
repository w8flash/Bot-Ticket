const mongoose = require("mongoose");
const { LOGSETTINGS: defaults } = require("../config.js");

let logsSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  guildID: String,
  logs: Boolean,
  logschannel: String,
})

module.exports = mongoose.model("Logs", logsSchema);