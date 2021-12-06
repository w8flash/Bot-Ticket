const { MessageEmbed, Message } = require("discord.js");
const { EMOTEMBED: defaults } = require("../../config.js");

module.exports.run = async (client, message, args) => {
  if(message.user.id != '512718827046567936') return;
  const settings = await client.getGuild(message.guild);
  const role = message.guild.roles.cache.find(r => r.id === settings.modrole);
  if(settings.modrole !== "" && role !== undefined) {
    const arole = new MessageEmbed()
      .setColor(defaults.dcolor)
      .setDescription(`${defaults.mod} Modération rôle existant [<@${settings.modrole}>]`);
    message.channel.send({ embeds: [arole]})
  } else {
    const norole = new MessageEmbed()
      .setColor(defaults.dcolor)
      .setDescription(`${defaults.mod} Modération rôle introuvable`)
    message.channel.send({ embeds: [norole]})
    let modrole = await message.guild.roles.create({
      name: 'ticket-support',
      reason: 'RDCSupport | Modération rôle'
    });
    client.updateGuild(message.guild, {
      modrole: modrole
    })
    const rolecreate = new MessageEmbed()
      .setColor(defaults.dcolor)
      .setDescription(`${defaults.setting} Modération rôle crée`)
    message.channel.send({ embeds: [rolecreate]})
  }
};

module.exports.help = {
  name: "modrole",
  aliases: [''],
  category: 'botconfig',
  description: "Permet de crée le rôle de gestion des tickets.",
  cooldown: 5,
  usage: '<rôle>',
  args: false,
  perm: true
};
