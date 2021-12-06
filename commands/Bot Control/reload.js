const { MessageEmbed } = require("discord.js");
const { EMOTEMBED: defaults } = require("../../config.js");

module.exports.run = async (client, message) => {
  const embedreload = new MessageEmbed()
    .setColor(defaults.dcolor)
    .setDescription(`<a:alert:880794764872663100> Redémarrage en cours ...`)
  const msg = await message.channel.send({ embeds: [embedreload] });

  const embedsucces = new MessageEmbed()
    .setColor(defaults.vcolor)
    .setDescription(`${defaults.succes} RDCSupport en ligne`)
  setTimeout(() => {
  msg.edit({ embeds: [embedsucces] });
    setTimeout(() => {
      process.exit();
    }, 1000);
  }, 5000);
};

module.exports.help = {
  name: "reload",
  aliases: ['rl'],
  category: 'botcontrol',
  description: "Permet de redémarrer le bot.",
  cooldown: 60,
  usage: '',
  args: false,
  owner: true,
};
