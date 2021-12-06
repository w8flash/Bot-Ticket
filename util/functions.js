const mongoose = require("mongoose");
const { Guild, Logs, Ticker } = require("../models/index");

module.exports = async client => {
  //---------------------
  //Serveur
  //---------------------
  client.createGuild = async guild => {
    const merged = Object.assign({ _id: mongoose.Types.ObjectId() }, guild);
    const createGuild = new Guild(merged);
    createGuild.save().then(g => console.log(`Nouveau serveur -> ${guild.guildID}`));
  };
  
  client.getGuild = async guild => {
    const data = await Guild.findOne({ guildID: guild.id });
    if (data) return data;
  };

  client.updateGuild = async (guild, settings) => {
    let data = await client.getGuild(guild);
    if (typeof data !== "object") data = {};
    for (const key in settings) {
      if (data[key] !== settings[key]) data[key] = settings[key];
    }
    return data.updateOne(settings);
  };
  //---------------------
  //Logs
  //---------------------
  client.createLogs = async guild => {
    const merged = Object.assign({ _id: mongoose.Types.ObjectId() }, guild);
    const createLogs = new Logs(merged);
    createLogs.save().then(g => console.log(`Setup Logs -> ${guild.guildID}`));
  };

  client.getLogs = async guild => {
    const data = await Logs.findOne({ guildID: guild.id });
    if (data) return data;
  };

  client.updateLogs = async (guild, settings) => {
    let data = await client.getLogs(guild);
    if (typeof data !== "object") data = {};
    for (const key in settings) {
      if (data[key] !== settings[key]) data[key] = settings[key];
    }
    return data.updateOne(settings);
  };
  //---------------------
  //Ticket
  //---------------------
  client.createTicket = async guild => {
    const merged = Object.assign({ _id: mongoose.Types.ObjectId() }, guild);
    const createTicket = new Ticket(merged);
    createTicket.save().then(g => console.log(`Setup Ticket -> ${guild.guildID}`));
  };

  client.getTicket = async guild => {
    const data = await Ticket.findOne({ guildID: guild.id });
    if (data) return data;
  };

  client.updateTicket = async (guild, settings) => {
    let data = await client.getTicket(guild);
    if (typeof data !== "object") data = {};
    for (const key in settings) {
      if (data[key] !== settings[key]) data[key] = settings[key];
    }
    return data.updateOne(settings);
  };
  //---------------------
};
