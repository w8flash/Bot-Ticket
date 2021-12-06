const { MessageEmbed, Permissions } = require("discord.js");
const { EMOTEMBED: defaults } = require("../../config.js");

module.exports.run = async (client, message, args) => {
 
};

module.exports.help = {
  name: "ticket-setup",
  aliases: ['ts'],
  category: 'botconfig',
  description: "Setup du système de ticket.",
  cooldown: 5,
  usage: '',
  args: false,
  perm: true
};