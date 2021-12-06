const { MessageEmbed } = require("discord.js");
const { EMOTEMBED: defaults } = require("../../config.js");

module.exports.run = async (client, message, args) => {

  const embedping = new MessageEmbed()
    .setTitle(`<a:ping:880803046437842975> Ping ...`)
    .setColor(defaults.dcolor);

  const msg = await message.channel.send({ embeds: [embedping] });

  const embedpong = new MessageEmbed()
    .setTitle("<:pong:880803046295232573> Pong !")
    .setColor(defaults.dcolor)
    .addField("Informations:",
    `
    Latence du bot: ${msg.createdTimestamp - message.createdTimestamp} ms
    Latence de l'API: ${Math.round(client.ws.ping)} ms
    `)
    .setFooter("requête de " + message.author.username, message.author.displayAvatarURL({ dynamic: true }))

  setTimeout(() => {
    msg.edit({ embeds: [embedpong] });
  }, 5000);
  
  // const msg = await message.channel.send("Ping!");
  // msg.edit(
  //   `Pong!
  //   Latence du bot: ${msg.createdTimestamp - message.createdTimestamp} ms
  //   Latence de l'API: ${Math.round(client.ws.ping)} ms
  // `)
};

module.exports.help = {
  name: "ping",
  aliases: [''],
  category: 'utilitaire',
  description: "Renvoie pong!",
  cooldown: 5,
  usage: '',
  args: false
};
