const { MessageEmbed, Collector } = require("discord.js");
const { readdirSync } = require("fs");
const categoryList = readdirSync("./commands");
const { EMOTEMBED: defaults } = require("../../config.js");
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
//categoryList = dossier
//category = fichier

module.exports.run = async (client, message, args) => {
  //console.log(client.commands.filter(cat => cat.help.category === "moderation").map(cmd => cmd.help.name).length);
  //console.log(categoryList);
  //const test = client.commands.filter(cat => cat.help.category === category.toLowerCase()).map(cmd => cmd.help.name);
  //console.log(test)
  const settings = await client.getGuild(message.guild);
  const row = new MessageActionRow().addComponents(
      new MessageSelectMenu()
        .setCustomId('help-command')
        .setPlaceholder('Choisissez un module')
        .addOptions([
          {
            label: 'Utilitaire',
            value: 'utilitaire',
            description: 'Liste des commandes utilitaire',
            emoji: '<a:utilitaire:898489655891206154>',
          },
          {
            label: 'Bot Config',
            value: 'botconfig',
            description: 'Liste des commandes de configuration du bot',
            emoji: '<:srvconfig:898489788968108032>',
          },
          {
            label: 'Bot Control',
            value: 'botcontrol',
            description: 'Liste des commandes pour controler le bot',
            emoji: '<a:bot:880794764579078154> ',
          },
          {
            label: 'Logs',
            value: 'logs',
            description: 'Liste des commandes de logs',
            emoji: '<a:logs:898489655362715688> ',
          },
        ])
    );
      
  const embeds = new MessageEmbed()
    .setColor(defaults.dcolor)
    .setTitle(`Help Commandes Modules [\`${categoryList.length}\`]`)
    .addFields(
      { name: '<a:utilitaire:898489655891206154> Utilitaire', value: `\`${client.commands.filter(cat => cat.help.category === "utilitaire").map(cmd => cmd.help.name).length}\` commandes`, inline: true},
      { name: '<:srvconfig:898489788968108032> Bot Config', value: `\`${client.commands.filter(cat => cat.help.category === "botconfig").map(cmd => cmd.help.name).length}\` commandes`, inline: true},
      { name: '<a:bot:880794764579078154> Bot Control', value: `\`${client.commands.filter(cat => cat.help.category === "botcontrol").map(cmd => cmd.help.name).length}\` commandes`, inline: true},
      { name: '<a:logs:898489655362715688> Logs', value: `\`${client.commands.filter(cat => cat.help.category === "logs").map(cmd => cmd.help.name).length}\` commandes`, inline: true}
    )

  const msg = await message.channel.send({ embeds:[embeds], components: [row]});

  const filter = (interaction) => interaction.isSelectMenu() && interaction.user.id === message.author.id;
  const collector = message.channel.createMessageComponentCollector({ 
    filter
  });

  collector.on('collect', async(collected) => {
    const value = collected.values;
    const utilitaire = new MessageEmbed()
      .setColor(defaults.dcolor)
      .setTitle("Utilitaire")
      .setDescription(`Les paramètres peuvent être des noms, des mentions, ou des IDs
      Si ce ne sont pas des mentions ils doivent être séparés par \`,,\``)
      client.commands.filter(cat => cat.help.category === "utilitaire").map(cmd => utilitaire.addField(
        `\`${settings.prefix}${cmd.help.name} ${cmd.help.usage}\``,
        `${cmd.help.description}`
      ))
    if(value == "utilitaire") msg.edit({ embeds:[utilitaire], components: [row]});
    const botconfig = new MessageEmbed()
      .setColor(defaults.dcolor)
      .setTitle("Bot Config")
      .setDescription(`Les paramètres peuvent être des noms, des mentions, ou des IDs
      Si ce ne sont pas des mentions ils doivent être séparés par \`,,\``)
      client.commands.filter(cat => cat.help.category === "botconfig").map(cmd => botconfig.addField(
        `\`${settings.prefix}${cmd.help.name} ${cmd.help.usage}\``,
        `${cmd.help.description}`
      ))
    if(value == "botconfig") msg.edit({ embeds:[botconfig], components: [row]}); 
    const botcontrol = new MessageEmbed()
      .setColor(defaults.dcolor)
      .setTitle("Bot Control")
      .setDescription(`Les paramètres peuvent être des noms, des mentions, ou des IDs
      Si ce ne sont pas des mentions ils doivent être séparés par \`,,\``)
      client.commands.filter(cat => cat.help.category === "botcontrol").map(cmd => botcontrol.addField(
        `\`${settings.prefix}${cmd.help.name} ${cmd.help.usage}\``,
        `${cmd.help.description}`
      ))
    if(value == "botcontrol") msg.edit({ embeds:[botcontrol], components: [row]});
    const logs = new MessageEmbed()
      .setColor(defaults.dcolor)
      .setTitle("Logs")
      .setDescription(`Les paramètres peuvent être des noms, des mentions, ou des IDs
      Si ce ne sont pas des mentions ils doivent être séparés par \`,,\``)
      client.commands.filter(cat => cat.help.category === "logs").map(cmd => logs.addField(
        `\`${settings.prefix}${cmd.help.name} ${cmd.help.usage}\``,
        `${cmd.help.description}`
      ))
    if(value == "logs") msg.edit({ embeds:[logs], components: [row]});
  });
};

module.exports.help = {
  name: "help",
  aliases: [''],
  category: 'utilitaire',
  description: "Renvoie pong!",
  cooldown: 5,
  usage: '',
  args: false
};
