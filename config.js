const { Client } = require('discord.js');

module.exports = {

  GUILDSETTINGS: {
    prefix: "!",
    modrole: ""
  },

  LOGSETTINGS: {
    logs: false,
    logschannel: "",
  },

  EMOTEMBED: {
    dcolor: '#ad5bff',
    vcolor: '#5fca23',
    rcolor: '#b12320',
    wcolor: '#f15d4a',
    lcolor: '#4554F4',
    succes: '<:succes:880794764612624394>',
    erreur: '<:erreur:880794764620988467>',
    warning: '<a:interdit:880794764746817566>',
    log: '<a:alert:880794764872663100>'
  }
}

// eval client.emit("guildCreate", message.guild);
