const { MessageEmbed } = require("discord.js");
const { EMOTEMBED: defaults } = require("../../config.js");

module.exports.run = (client, message, args) => {
  const embedserverinfo = new MessageEmbed()
  .setTitle(`<a:bot:880794764579078154> Informations Bot`)
  .setColor(defaults.dcolor)
  .setTimestamp()
  .addFields(
    { name: 'Mémoire', value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, inline: true},
    { name: 'Uptime', value: `${Math.floor(client.uptime / 1000 / 60).toString()} minutes`, inline: true},
    { name: '\u200b', value: `\u200b`, inline: true},
    { name: 'Serveurs', value: `${client.guilds.cache.size.toString()}`, inline: true},
    { name: 'Salons', value: `${client.channels.cache.size.toString()}`, inline: true},
    { name: 'Utilisateurs', value: `${client.guilds.cache.map(g => g.memberCount).reduce((a, b) => a + b)}`, inline: true},
    { name: 'Version', value: `1.0`, inline: true},
    { name: 'Source', value: `[Flash](https://flashh.fr/)`, inline: true},
    { name: 'Support', value: `[Server invite](https://discord.gg/rdc)`, inline: true},

  )
  .setFooter("requête de " + message.author.username, message.author.displayAvatarURL({ dynamic: true }))

  message.channel.send({ embeds: [embedserverinfo] });  
};

module.exports.help = {
  name: "bot-info",
  aliases: [''],
  category: 'information',
  description: "Permet d'afficher les informations du DaBot.",
  cooldown: 5,
  usage: '',
  args: false
};
