const db = require('../../models/guild');

module.exports = async (client, guild) => {
  db.findOne({ guildID: guild.id }, async(err, data) => {
    if(err) throw err;
    if(!data) {
      await client.createGuild({guildID: guild.id, prefix: "!", ticket: false, modrole: ""});
      await client.createLogs({guildID: guild.id, logs: false, logschannel: ""});
    } else {
      return;
    }
  });
};