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
            label: 'Modération',
            value: 'moderation',
            description: 'Liste des commandes de modération',
            emoji: '<a:mod:881186858552418334>',
          },
          {
            label: 'Modération Settings',
            value: 'modsettings',
            description: 'Liste des commandes de paramétrage de modération',
            emoji: '<:settings:881184514947289188> ',
          },
          {
            label: 'Logs',
            value: 'logs',
            description: 'Liste des commandes de logs',
            emoji: '<a:logs:898489655362715688> ',
          },
          {
            label: 'Server Config',
            value: 'srvconfig',
            description: 'Liste des commandes de configuration du serveur',
            emoji: '<:srvconfig:898489788968108032>',
          },
          {
            label: 'Server Gestion',
            value: 'servergestion',
            description: 'Liste des commandes de gestion du serveur',
            emoji: '<a:srvgestion:898489655719231518> ',
          },
          {
            label: 'Antiraid',
            value: 'antiraid',
            description: 'Liste des commandes de la sécurité Antiraid',
            emoji: '<a:warning:892466586802335835> ',
          },
          {
            label: 'Bot Control',
            value: 'botcontrol',
            description: 'Liste des commandes pour controler le bot',
            emoji: '<a:bot:880794764579078154> ',
          },
          {
            label: 'Utilitaire',
            value: 'utilitaire',
            description: 'Liste des commandes utilitaire',
            emoji: '<a:utilitaire:898489655891206154>',
          },
        ])
    );
      
  const embeds = new MessageEmbed()
    .setColor(defaults.dcolor)
    .setTitle(`Help Commandes Modules [\`${categoryList.length}\`]`)
    .addFields(
      { name: '<a:mod:881186858552418334> Modération', value: `\`${client.commands.filter(cat => cat.help.category === "moderation").map(cmd => cmd.help.name).length}\` commandes`, inline: true},
      { name: '<:settings:881184514947289188> Modération Settings', value: `\`${client.commands.filter(cat => cat.help.category === "modsettings").map(cmd => cmd.help.name).length}\` commandes`, inline: true},
      { name: '<a:logs:898489655362715688> Logs', value: `\`${client.commands.filter(cat => cat.help.category === "logs").map(cmd => cmd.help.name).length}\` commandes`, inline: true},
      { name: '<:srvconfig:898489788968108032> Serveur Config', value: `\`${client.commands.filter(cat => cat.help.category === "serveurconfig").map(cmd => cmd.help.name).length}\` commandes`, inline: true},
      { name: '<a:srvgestion:898489655719231518> Serveur Gestion', value: `\`${client.commands.filter(cat => cat.help.category === "servergestion").map(cmd => cmd.help.name).length}\` commandes`, inline: true},
      { name: '<a:warning:892466586802335835> Antiraid', value: `\`${client.commands.filter(cat => cat.help.category === "antiraid").map(cmd => cmd.help.name).length}\` commandes`, inline: true},
      { name: '<a:bot:880794764579078154> Bot Control', value: `\`${client.commands.filter(cat => cat.help.category === "botcontrol").map(cmd => cmd.help.name).length}\` commandes`, inline: true},
      { name: '<a:utilitaire:898489655891206154> Utilitaire', value: `\`${client.commands.filter(cat => cat.help.category === "information").map(cmd => cmd.help.name).length}\` commandes`, inline: true},
    )

  const msg = await message.channel.send({ embeds:[embeds], components: [row]});

  const filter = (interaction) => interaction.isSelectMenu() && interaction.user.id === message.author.id;
  const collector = message.channel.createMessageComponentCollector({ 
    filter
  });

  collector.on('collect', async(collected) => {
    const value = collected.values;
    //console.log(value);
    /*switch(value) {
      case "first":
        console.log("first option")
      break;
      case "second":
        console.log("second option")
      break;
      case "third":
        console.log("third option")
      break;
    }*/
    const moderation = new MessageEmbed()
      .setColor(defaults.dcolor)
      .setTitle("Modération")
      .setDescription(`Les paramètres peuvent être des noms, des mentions, ou des IDs
      Si ce ne sont pas des mentions ils doivent être séparés par \`,,\``)
      client.commands.filter(cat => cat.help.category === "moderation").map(cmd => moderation.addField(
        `\`${settings.prefix}${cmd.help.name} ${cmd.help.usage}\``,
        `${cmd.help.description}`
      ))
    if(value == "moderation") msg.edit({ embeds:[moderation], components: [row]});
    const modsettings = new MessageEmbed()
      .setColor(defaults.dcolor)
      .setTitle("Modération Settings")
      .setDescription(`Les paramètres peuvent être des noms, des mentions, ou des IDs
      Si ce ne sont pas des mentions ils doivent être séparés par \`,,\``)
      client.commands.filter(cat => cat.help.category === "modsettings").map(cmd => modsettings.addField(
        `\`${settings.prefix}${cmd.help.name} ${cmd.help.usage}\``,
        `${cmd.help.description}`
      ))
    if(value == "modsettings") msg.edit({ embeds:[modsettings], components: [row]});
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
    const srvconfig = new MessageEmbed()
      .setColor(defaults.dcolor)
      .setTitle("Server Config")
      .setDescription(`Les paramètres peuvent être des noms, des mentions, ou des IDs
      Si ce ne sont pas des mentions ils doivent être séparés par \`,,\``)
      client.commands.filter(cat => cat.help.category === "serveurconfig").map(cmd => srvconfig.addField(
        `\`${settings.prefix}${cmd.help.name} ${cmd.help.usage}\``,
        `${cmd.help.description}`
      ))
    if(value == "srvconfig") msg.edit({ embeds:[srvconfig], components: [row]});
    const srvgestion = new MessageEmbed()
      .setColor(defaults.dcolor)
      .setTitle("Server Gestion")
      .setDescription(`Les paramètres peuvent être des noms, des mentions, ou des IDs
      Si ce ne sont pas des mentions ils doivent être séparés par \`,,\``)
      client.commands.filter(cat => cat.help.category === "servergestion").map(cmd => srvgestion.addField(
        `\`${settings.prefix}${cmd.help.name} ${cmd.help.usage}\``,
        `${cmd.help.description}`
      ))
    if(value == "servergestion") msg.edit({ embeds:[srvgestion], components: [row]});
    const antiraid = new MessageEmbed()
      .setColor(defaults.dcolor)
      .setTitle("Antiraid")
      .setDescription(`Les paramètres peuvent être des noms, des mentions, ou des IDs
      Si ce ne sont pas des mentions ils doivent être séparés par \`,,\``)
      client.commands.filter(cat => cat.help.category === "antiraid").map(cmd => antiraid.addField(
        `\`${settings.prefix}${cmd.help.name} ${cmd.help.usage}\``,
        `${cmd.help.description}`
      ))
    if(value == "antiraid") msg.edit({ embeds:[antiraid], components: [row]});
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
    const utilitaire = new MessageEmbed()
      .setColor(defaults.dcolor)
      .setTitle("Utilitaire")
      .setDescription(`Les paramètres peuvent être des noms, des mentions, ou des IDs
      Si ce ne sont pas des mentions ils doivent être séparés par \`,,\``)
      client.commands.filter(cat => cat.help.category === "information").map(cmd => utilitaire.addField(
        `\`${settings.prefix}${cmd.help.name} ${cmd.help.usage}\``,
        `${cmd.help.description}`
      ))
    if(value == "utilitaire") msg.edit({ embeds:[utilitaire], components: [row]});
  });
};

module.exports.help = {
  name: "help",
  aliases: [''],
  category: 'information',
  description: "Renvoie pong!",
  cooldown: 5,
  usage: '',
  args: false
};
