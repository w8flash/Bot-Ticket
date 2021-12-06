const mongoose = require("mongoose");
const { GUILDSETTINGS: defaults } = require("../config.js");

const guildSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  guildID: String,
  ticket: String,
});

module.exports = mongoose.model("Guild", guildSchema);