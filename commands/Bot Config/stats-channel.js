const { MessageEmbed, Permissions } = require("discord.js");
const schema = require('../../models/member-count');
const { EMOTEMBED: defaults } = require("../../config.js");

module.exports.run = async (client, message, args) => {
  schema.findOne({ guildID: message.guild.id }, async (err, data) => {
    if(data) data.delete();

    const channel = await message.guild.channels.create(
      `🌕┃Membres : ${message.guild.memberCount}`,
      {
        type: "GUILD_VOICE",
        permissionOverwrite: [
          {
            id: message.guild.id,
            deny: ["CONNECT"],
          },
        ],
      }
    );
    let voiceChannels = message.guild.channels.cache.filter(c => c.type === 'GUILD_VOICE');
    let count = 0;
    voiceChannels.forEach(channel => {
      count = count + channel.members.size;
    })
    const channelvoice = await message.guild.channels.create(
      `🌖┃En Vocal : ${count}`,
      {
        type: "GUILD_VOICE",
        permissionOverwrites: [
          {
            id: message.guild.id,
            deny: [Permissions.FLAGS.VIEW_CHANNEL],
          },
        ],
      }
    );

    channelvoice.permissionOverwrites.create(channel.guild.roles.everyone, { VIEW_CHANNEL: false });

    new schema({
      guildID: message.guild.id,
      channel: channel.id,
      channelvoice: channelvoice.id,
      member: message.guild.memberCount,
      membervoice: count
    }).save();
  });
  const statschannel = new MessageEmbed()
    .setColor(defaults.dcolor)
    .setDescription(`<:stats:907654890426355733> Salon stats setup`)
  message.channel.send({ embeds: [statschannel] })
};

module.exports.help = {
  name: "stats-channel",
  aliases: [''],
  category: 'serveurconfig',
  description: "Crée une commande personnalisable sur le bot.",
  cooldown: 5,
  usage: '<mot-clé>',
  args: false,
  perm: true
};