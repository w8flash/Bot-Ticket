const db = require('../../models/guild');

module.exports = async (client, guild) => {
  db.findOne({ guildID: guild.id }, async(err, data) => {
    if(err) throw err;
    if(!data) {
      const newLogs = {
        guildID: guild.id,
        guildName: guild.name
      };
      const newSecurite = {
        guildID: guild.id,
      };

      const newWelcome = {
        guildID: guild.id,
      };
      await client.createGuild({guildID: guild.id});
      await client.createLogs(newLogs);
      await client.createSecurite(newSecurite);
      await client.createWelcome(newWelcome);
    } else {
      return;
    }
  });
};