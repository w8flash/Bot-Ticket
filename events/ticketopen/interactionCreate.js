const { Message, MessageEmbed, MessageActionRow, MessageButton, ButtonInteraction } = require("discord.js");
const { EMOTEMBED: defaults } = require("../../config.js");
const ms = require('ms');
const moment = require('moment')
const schema = require('../../models/ticket');

module.exports = async (client, interaction) => {
  if(!interaction.isButton()) return;
  if(interaction.customId != "ticketopen") return;
  interaction.deferUpdate()
  .catch(console.error);
  const user = interaction.user;
  const guild = interaction.guild
  const settings = await client.getLogs(interaction.guild);
  let logsChannel = guild.channels.cache.find(c => c.id === settings.logschannel);
  schema.findOne({ guildID: guild.id, userID: user.id}, async(err, data) => {
      if(err) throw err;
      if(data) {
        let already = new MessageEmbed()
          .setColor(defaults.rcolor)
          .setDescription(`${defaults.erreur} Vous possèdez déjà un ticket ouvert.`);
        user.send({embeds:[already]})
      } else {
        //Send Message to user
        let open = new MessageEmbed()
          .setColor(defaults.vcolor)
          .setDescription(`${defaults.succes} Vous venez d'ouvrir un ticket`);
        user.send({embeds:[open]})
        //Create ticket ID
        let split = '';
        let usr = user.id.split(split);
        for (var i = 0; i < usr.length; i++) usr[i] = usr[i].trim();

        //Search catégorie
        let categorie = guild.channels.cache.find(c => c.name == "tickets" && c.type == "GUILD_CATEGORY");
        if(!categorie) categorie = await guild.channels.create("tickets", {type: "GUILD_CATEGORY", position: 1}).catch(e => {return functions.errorEmbed(message, message.channel, "Une erreur a été rencontrée.")});

        //Create ticket channel
        let permsToHave = ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'ADD_REACTIONS']
        guild.channels.create(
        `ticket-${usr[0]}${usr[1]}${usr[2]}${usr[3]}`,
        {
          type: "GUILD_TEXT",
          permissionOverwrite: [
            {
              deny: 'VIEW_CHANNEL',
              id: guild.id
            },
            {
              allow: permsToHave,
              id: user.id
            },
            /*{
              allow: permsToHave,
              id: role.id
            },*/
          ],
          parent: categorie.id,
          reason: `Cet utilisateur a besoin d'aide.`,
          topic: `**ID:** ${user.id} -- **Tag:** ${user.tag} | s!close`
          }).then(channel => {
            let createdEmbed = new MessageEmbed()
              .setAuthor(`📝 | Ticket Ouvert`)
              .setTimestamp()
              .setColor(defaults.dcolor)
              .setFooter(`Système de Ticket`, client.user.displayAvatarURL())
              .setDescription(`Un utilisateur à ouvert un ticket et attend qu'on s'occupe de sa demande.`)
              .addField(`Informations`, `**Utilisateur :** \`${user.tag}\`\n**ID :** \`${user.id}\`\n**Ticket :** ${channel}\n**Date :** \`${moment(new Date()).format('MM-DD-YYYY | HH:MM:SS')}\``);

            if(logsChannel) logsChannel.send({embeds: [createdEmbed]});

            const row = new MessageActionRow()
              .addComponents(
                new MessageButton()
                  .setCustomId('ticketclose')
                  .setLabel('Fermer le ticket')
                  .setStyle('PRIMARY'),
              );
            let success = new MessageEmbed()
              .setTitle(`Ticket numéro: ${usr[0]}${usr[1]}${usr[2]}${usr[3]}`)
              .setColor(defaults.dcolor)
              .setTimestamp()
              .setDescription(`Veuillez expliquer la raison de votre demande. Un membre de l'équipe prendra en charge votre ticket sous peu.`)
              .setFooter(`RDC Community Support`, client.user.displayAvatarURL())

            channel.send({embeds: [success], components: [row]});
            client.createTicket({guildID: guild.id, userID: user.id, ticketID: `${usr[0]}${usr[1]}${usr[2]}${usr[3]}` });
          })
          interaction.isButton();
        }
  });


  
  //ticket-${usr[0]}${usr[1]}${usr[2]}${usr[3]}
  //find already create ticket
  //if(!message.guild.channels.cache.find(c => c.name === `ticket-${usr[0]}${usr[1]}${usr[2]}${usr[3]}`)){
  //find if user have role
  //let role = message.guild.roles.cache.find(r => r.name === "Ticket Support");


  
  // ========================= //
  // FERMETURE DU TICKET //
  // ========================= //

 /* if(message.embeds.length === 1 && message.embeds[0].title === '🎟️ | Ticket Terminé' && message.embeds[0].description === `Réagissez avec \\🗑️ pour fermer le ticket ou ne réagissez pas si vous avez d'autres demandes.`){
    if(reaction.emoji.name === "🗑️"){
      if(user.id === db.get(`ticket.${message.channel.name}.user`)){

        let deletedEmbed = new MessageEmbed()
        .setAuthor(`🗑️ | Ticket Fermé`)
        .setColor(color.rdc)
        .setDescription(`L'auteur a confirmé la fermeture du ticket.`)
        .setTimestamp()
        .setFooter(`Système de Ticket`, bot.user.displayAvatarURL())
        .addField(`Informations`, `**Utilisateur :** \`${user.tag}\`\n**ID :** \`${user.id}\`\n**Ticket :** \`${message.channel.name}\`\n**Date :** \`${dateFormat(new Date(), "dd/mm/yyyy - HH:MM:ss")}\``);

        message.channel.send('Le ticket s\'auto détruiras dans 5 secondes...');
        setTimeout(() => {
          message.channel.delete().then(async ch => {
            bot.ticketTranscript.findOne({ channel: ch.id }, async(err, data) => {
              if(err) throw err;
              if(data){
                db.delete(`ticket.${message.channel.name}`);
                if(logsChannel) logsChannel.send(deletedEmbed);
                const cha = ch.id;
                fs.writeFileSync(`../RdcSupport/tickets/${ch.id}.txt`, data.Content.join("\n\n"));
                //transcriptChannel.send(`Le ticket de ${message.guild.members.cache.get(ch.name).user.username} a été fermé.`);
                await logsChannel.send(new MessageAttachment(fs.createReadStream(`../RdcSupport/tickets/${ch.id}.txt`)));
                bot.ticketTranscript.findOneAndDelete({ channel: cha});
              }
            })
          })
        }, 5000)
        //message.channel.delete();
      }
    }
  }*/

};
